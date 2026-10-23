import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOL_NAME = 'rclone';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveBinaryPath(repoRoot = path.resolve(__dirname, '..'), platform = process.platform) {
  const candidates = [
    path.resolve(repoRoot, 'tools', platform === 'win32' ? `${TOOL_NAME}.exe` : TOOL_NAME),
    path.resolve(repoRoot, '..', 'www.nullprivate.com', 'tools', platform === 'win32' ? `${TOOL_NAME}.exe` : TOOL_NAME),
  ];
  const binaryPath = candidates.find((item) => fs.existsSync(item));
  if (!binaryPath) {
    throw new Error(`Missing bundled ${TOOL_NAME} binary. Checked: ${candidates.join(', ')}`);
  }
  return binaryPath;
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
  const binaryPath = resolveBinaryPath(repoRoot, platform);
  ensureExecutable(binaryPath, platform);
  const result = spawnSync(binaryPath, argv, {
    cwd: repoRoot,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (typeof result.status === 'number') return result.status;
  return 1;
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  try {
    process.exitCode = run();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

export { ensureExecutable, resolveBinaryPath, run };
