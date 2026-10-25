import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { parse } from 'yaml';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const pkg = readJson(path.join(root, 'package.json'));

// 临时仓库只使用自建配置和最小环境，外部工具均由本地记录器替代。
function fixture(t) {
  const base = mkdtempSync(path.join(tmpdir(), 'nullprivate-build-contract-'));
  t.after(() => rmSync(base, { recursive: true, force: true }));
  const repo = path.join(base, 'site with spaces');
  const outside = path.join(base, 'caller');
  const bin = path.join(base, 'bin');
  const record = path.join(base, 'record.jsonl');
  for (const dir of [repo, outside, bin, path.join(repo, 'scripts'), path.join(repo, 'config')]) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(path.join(repo, 'package.json'), '{"type":"module"}');
  copyFileSync(path.join(root, 'scripts/run-rclone.js'), path.join(repo, 'scripts/run-rclone.js'));
  const config = path.join(repo, 'config', 'local rclone.conf');
  writeFileSync(config, '[example]\ntype = local\n', { mode: 0o600 });
  const recorder = `#!${process.execPath}
const fs = require('node:fs');
const path = require('node:path');
fs.appendFileSync(process.env.MOCK_RECORD, JSON.stringify({
  tool: path.basename(process.argv[1]), args: process.argv.slice(2),
  cwd: process.cwd(), brand: process.env.BRAND,
  configEnv: process.env.RCLONE_CONFIG,
}) + '\\n');
`;
  const mock = (file) => {
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, recorder, { mode: 0o755 });
  };
  for (const tool of ['astro', 'rclone', 'npm', 'wrangler']) mock(path.join(bin, tool));
  const env = {
    PATH: bin + path.delimiter + path.dirname(process.execPath),
    HOME: outside,
    MOCK_RECORD: record,
  };
  const run = (command, args, cwd, extraEnv = {}) => {
    writeFileSync(record, '');
    const result = spawnSync(command, args, {
      cwd, env: { ...env, ...extraEnv }, encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr, '');
    return readFileSync(record, 'utf8').trim().split('\n').map((line) => JSON.parse(line));
  };
  return {
    repo, bin, config, mock,
    script: (name, extraEnv) => run('/bin/sh', ['-c', pkg.scripts[name]], repo, extraEnv),
    cli: (args, extraEnv) => run(process.execPath, [path.join(repo, 'scripts/run-rclone.js'), ...args], outside, extraEnv)[0],
  };
}

for (const [platform, brand] of [['Cloudflare Pages', 'nullprivate'], ['ESA Pages', 'adguardprivate']]) {
  test(`${platform}：品牌构建入口内置 BRAND，输出 dist/${brand}`, (t) => {
    const f = fixture(t);
    assert.equal(pkg.scripts[`build:${brand}`], `BRAND=${brand} astro build`);
    assert.deepEqual(f.script(`build:${brand}`), [
      { tool: 'astro', args: ['build'], cwd: f.repo, brand },
    ]);
    // 输出目录使用实际 Astro 配置中的品牌标识；完整产物由双品牌构建验证。
    const config = readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
    assert.match(config, /const brand = getBrand\(process\.env\.BRAND\)/);
    assert.match(config, /outDir:\s*`dist\/\$\{brand\.id\}`/);
  });
}

test('npm 与 lockfile：Node 24、双品牌顺序构建及统一测试入口保持一致', () => {
  const lock = readJson(path.join(root, 'package-lock.json'));
  assert.equal(pkg.engines.node, '>=24.0.0 <25');
  assert.equal(pkg.scripts['build:all'], 'npm run build:nullprivate && npm run build:adguardprivate');
  assert.equal(pkg.scripts.test, 'node --test scripts/test-*.mjs');
  assert.equal(pkg.scripts['test:deployment'], 'node --test scripts/test-deployment.mjs');
  assert.equal(pkg.scripts.typecheck, 'astro check');
  for (const key of ['name', 'version', 'dependencies', 'devDependencies', 'engines']) {
    assert.deepEqual(lock.packages[''][key], pkg[key]);
  }
  assert.equal(lock.packages['node_modules/yaml'].version, pkg.devDependencies.yaml);
});

test('CI：main push、PR 和手动触发均以只读权限执行完整验证', () => {
  const workflow = parse(readFileSync(path.join(root, '.github/workflows/deploy.yml'), 'utf8'));
  assert.deepEqual(workflow, {
    name: '官网构建验证',
    on: { pull_request: null, push: { branches: ['main'] }, workflow_dispatch: null },
    permissions: { contents: 'read' },
    concurrency: { group: 'website-validation-${{ github.ref }}', 'cancel-in-progress': true },
    jobs: {
      validate: {
        name: '双品牌构建、测试与类型检查',
        'runs-on': 'ubuntu-24.04',
        steps: [
          { uses: 'actions/checkout@v4' },
          { uses: 'actions/setup-node@v4', with: { 'node-version': '24', cache: 'npm' } },
          ...['npm ci', 'npm run build:all', 'npm test', 'npm run typecheck'].map((run) => ({ run })),
        ],
      },
    },
  });
});

for (const [name, brand, config] of [
  ['upload:r2:preview', 'nullprivate', 'wrangler.jsonc'],
  ['upload:r2:preview:adguardprivate', 'adguardprivate', 'wrangler.preview.adguardprivate.jsonc'],
]) {
  test(`历史 Worker 预览：${brand} 保持构建与预览配置入口`, (t) => {
    const f = fixture(t);
    assert.deepEqual(f.script(name), [
      { tool: 'npm', args: ['run', `build:${brand}`], cwd: f.repo },
      { tool: 'wrangler', args: ['deploy', '--config', config], cwd: f.repo },
    ]);
    assert.equal(readJson(path.join(root, config)).assets.directory, `./dist/${brand}`);
  });
}

test('历史 OSS 预览：PATH 工具、sync、默认目标和含空格的独立配置与目标', (t) => {
  const f = fixture(t);
  for (const custom of [false, true]) {
    const target = custom ? 'example:preview/site with spaces' : 'aliyun_oss_hangzhou:www-adguardprivate-com-astro-preview';
    const env = custom ? { OSS_PREVIEW_TARGET: target, RCLONE_CONFIG: f.config } : {};
    assert.deepEqual(f.script('upload:aliyun:preview', env), [
      {
        tool: 'npm', args: ['run', 'build:adguardprivate'], cwd: f.repo,
        ...(custom ? { configEnv: f.config } : {}),
      },
      {
        tool: 'rclone', cwd: f.repo,
        ...(custom ? { configEnv: f.config } : {}),
        args: [
          'sync', 'dist/adguardprivate/', target, '--config',
          custom ? f.config : path.join(f.repo, 'rclone.conf'),
          '--checksum', '--fast-list', '--transfers', '8', '--checkers', '16',
          '-v', '-P', '--stats', '2s', '--stats-file-name-length', '0',
        ],
      },
    ]);
  }
});

for (const bundled of [false, true]) {
  test(`rclone 独立入口：${bundled ? '本仓库 tools' : 'PATH'} 工具跨目录解析 CLI/env 配置路径`, (t) => {
    const f = fixture(t);
    if (bundled) {
      f.mock(path.join(f.repo, 'tools/rclone'));
      writeFileSync(path.join(f.repo, 'tools/package.json'), '{"type":"commonjs"}');
      chmodSync(path.join(f.repo, 'tools/rclone'), 0o644);
      rmSync(path.join(f.bin, 'rclone'));
    }
    for (const configArgs of [[], ['--config', 'config/local rclone.conf'], ['--config=config/local rclone.conf'], ['--config', f.config]]) {
      const result = f.cli(['copy', 'dist/adguardprivate', 'example:preview', ...configArgs], {
        RCLONE_CONFIG: 'config/local rclone.conf',
      });
      const resolved = configArgs.length === 1 ? [`--config=${f.config}`]
        : configArgs.length === 2 ? ['--config', f.config] : [];
      assert.deepEqual(result, {
        tool: 'rclone', cwd: f.repo, configEnv: f.config,
        args: ['copy', 'dist/adguardprivate', 'example:preview', ...resolved],
      });
    }
  });
}
