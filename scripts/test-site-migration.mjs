import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(await readFile(join(root, 'docs/site-migration-assets.json'), 'utf8'));
const digest = (data) => createHash('sha256').update(data).digest('hex');

async function verifyAssets(directory) {
  for (const asset of manifest.assets) {
    const data = await readFile(join(directory, asset.path));
    assert.equal(data.length, asset.bytes, `${asset.path}：字节数`);
    assert.equal(digest(data), asset.sha256, `${asset.path}：内容完整`);
  }
}

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => entry.isDirectory()
    ? filesUnder(join(directory, entry.name)) : [join(directory, entry.name)]));
  return groups.flat();
}

test('源资源：公开资产清单覆盖文档引用的服务列表与视频', async () => {
  const paths = manifest.assets.map((asset) => asset.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const prefix of ['services/', 'videos/']) {
    assert.ok(paths.some((path) => path.startsWith(prefix)), prefix);
  }
  for (const path of paths) {
    assert.ok(path.split('/').every((part) => part && part !== '.' && part !== '..' && part !== '.git'));
  }
  await verifyAssets(join(root, 'public'));
  for (const path of paths.filter((path) => path.endsWith('.json'))) {
    assert.ok(JSON.parse(await readFile(join(root, 'public', path), 'utf8')));
  }
});

test('源资源：单独复制公开资产到临时目录仍可完整校验', async (t) => {
  const isolated = await mkdtemp(join(tmpdir(), 'site-migration-'));
  t.after(() => rm(isolated, { recursive: true, force: true }));
  for (const asset of manifest.assets) {
    const target = join(isolated, 'public', asset.path);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(join(root, 'public', asset.path), target);
  }
  assert.deepEqual(await readdir(isolated), ['public']);
  await verifyAssets(join(isolated, 'public'));
});

test('源资源：日常构建入口与页面使用本仓库内容，历史导入保留为显式工具', async () => {
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  for (const script of ['build', 'build:nullprivate', 'build:adguardprivate', 'build:all']) {
    assert.ok(pkg.scripts[script], script);
    assert.equal(/migrate:content|migrate-content|\.\.\//.test(pkg.scripts[script]), false, script);
  }
  for (const hook of ['prebuild', 'prebuild:all', 'prebuild:nullprivate', 'prebuild:adguardprivate', 'postinstall', 'prepare']) {
    assert.equal(/migrate:content|migrate-content|www\.nullprivate\.com/.test(pkg.scripts[hook] ?? ''), false, hook);
  }
  assert.match(pkg.scripts['migrate:content'], /migrate-content\.mjs/);
  const sourceFiles = [...await filesUnder(join(root, 'src')), join(root, 'astro.config.mjs')];
  for (const file of sourceFiles) {
    const source = await readFile(file, 'utf8');
    assert.equal(/(?:\.\.\/)+www\.nullprivate\.com/.test(source), false, file);
  }
});

for (const brand of ['nullprivate', 'adguardprivate']) {
  const output = join(root, 'dist', brand);
  const origin = `https://www.${brand}.com`;

  test(`${brand} 产物：全部迁移资源保持公开 URL 与字节内容`, async () => {
    await verifyAssets(output);
    for (const asset of manifest.assets) {
      assert.deepEqual(await readFile(join(output, asset.path)), await readFile(join(root, 'public', asset.path)));
    }
  });

  test(`${brand} 产物：robots 引用本品牌真实 sitemap，站点地图引用实际文件`, async () => {
    const robots = await readFile(join(output, 'robots.txt'), 'utf8');
    assert.match(robots, /^User-agent: \*$/m);
    assert.match(robots, /^Allow: \/$/m);
    const sitemaps = [...robots.matchAll(/^Sitemap: (.+)$/gm)].map((match) => match[1]);
    assert.deepEqual(sitemaps, [`${origin}/sitemap-index.xml`]);
    const index = await readFile(join(output, 'sitemap-index.xml'), 'utf8');
    const locations = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
    assert.ok(locations.length > 0);
    for (const location of locations) {
      assert.equal(location.origin, origin);
      const sitemap = await readFile(join(output, location.pathname), 'utf8');
      assert.match(sitemap, /<urlset\b/);
      assert.ok(sitemap.includes(`${origin}/docs/`));
    }
  });

  test(`${brand} 产物：旧购买与服务入口提供静态跳转，目标页面与文档可访问`, async () => {
    const redirects = await readFile(join(output, '_redirects'), 'utf8');
    for (const page of ['pricing', 'my-service']) {
      for (const suffix of ['', '/']) {
        assert.ok(redirects.split('\n').includes(`/pages/${page}${suffix} /${page}/ 301`));
      }
      const legacy = await readFile(join(output, 'pages', page, 'index.html'), 'utf8');
      assert.match(legacy, /http-equiv="refresh"/i);
      assert.ok(legacy.includes(`/${page}/`));
      assert.match(await readFile(join(output, page, 'index.html'), 'utf8'), /<html\b/);
    }
    for (const locale of ['', 'zh-hk', 'en-us', 'ko-kr', 'ja-jp']) {
      assert.match(await readFile(join(output, locale, 'docs', 'index.html'), 'utf8'), /<html\b/);
    }
  });
}
