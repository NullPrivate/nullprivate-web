import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOL_NAME = 'rclone';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveBinaryPath(repoRoot = path.resolve(__dirname, '..'), platform = process.platform) {
  const name = platform === 'win32' ? `${TOOL_NAME}.exe` : TOOL_NAME;
  const bundled = path.resolve(repoRoot, 'tools', name);
  // 优先使用本仓库工具，否则由操作系统从 PATH 查找。
  return fs.existsSync(bundled) ? bundled : name;
}

function ensureExecutable(binaryPath, platform = process.platform) {
  if (platform === 'win32') return;
  const executableMode = 0o755;
  const currentMode = fs.statSync(binaryPath).mode & 0o777;
  if (currentMode !== executableMode) fs.chmodSync(binaryPath, executableMode);
}

function run(argv = process.argv.slice(2), options = {}) {
  const repoRoot = options.repoRoot ?? path.resolve(__dirname, '..');
  const platform = options.platform ?? process.platform;
  const env = { ...(options.env ?? process.env) };
  // 相对配置路径统一以仓库根目录为基准，兼容从其他目录调用。
  if (env.RCLONE_CONFIG) env.RCLONE_CONFIG = path.resolve(repoRoot, env.RCLONE_CONFIG);
  const args = argv.map((arg, index) => {
    if (argv[index - 1] === '--config') return path.resolve(repoRoot, arg);
    if (arg.startsWith('--config=')) return `--config=${path.resolve(repoRoot, arg.slice(9))}`;
    return arg;
  });
  const binaryPath = resolveBinaryPath(repoRoot, platform);
  if (path.isAbsolute(binaryPath)) ensureExecutable(binaryPath, platform);
  const result = spawnSync(binaryPath, args, {
    cwd: repoRoot,
    env,
    stdio: 'inherit',
  });
  if (result.error) throw new Error('无法启动 rclone，请在 PATH 或本仓库 tools 中安装工具。');
  if (typeof result.status === 'number') return result.status;
  return 1;
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  try {
    process.exitCode = run();
  } catch {
    console.error('rclone 未完成，请检查本地工具与配置。');
    process.exitCode = 1;
  }
}

export { ensureExecutable, resolveBinaryPath, run };
