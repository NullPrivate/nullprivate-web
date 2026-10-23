import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const endpoint = process.env.TRANSLATION_API_ENDPOINT;
const model = process.env.TRANSLATION_MODEL;
if (!endpoint || !model || !process.env.CLIPROXYAPI_API_KEY) {
  throw new Error('请设置 TRANSLATION_API_ENDPOINT、TRANSLATION_MODEL 和 CLIPROXYAPI_API_KEY 后执行翻译。');
}
const directory = path.join(root, '.translation-cache');
await mkdir(directory, { recursive: true });
const configPath = path.join(directory, 'marketing.config.json');
const config = {
  currentVendor: 'marketing',
  vendors: [{ name: 'marketing', apiEndpoint: endpoint, model, apiKeyEnvVarName: 'CLIPROXYAPI_API_KEY', rpm: 15, timeout: 300, maxTokensPerSegment: 16000, streamMode: true }],
  specifiedFolders: [{ sourceFolder: { path: 'src/i18n/zh-cn', lang: 'zh-cn' }, targetFolders: ['en-us', 'zh-hk', 'ja-jp', 'ko-kr'].map(lang => ({ path: `src/i18n/${lang}`, lang })) }],
  customPrompts: ['输出有效 JSON，保留全部对象键、数组顺序、占位符（如 {brandName}、{days}、{message}）、URL、href、slug、number 和 ID。只翻译面向用户的文案。宁屏品牌在繁体使用「寧屏」，其他目标语言使用「NullPrivate」。保留 DNS、DoH、DoT 等协议名。'],
};
await writeFile(configPath, JSON.stringify(config, null, 2));
try {
  for (const command of [['config', 'validate'], ['translate', 'project']]) {
    const args = ['--yes', 'project-translator-cli', ...command, '--workspace', root, '--config', configPath];
    if (command[0] === 'translate' && process.argv[2]) args.push('--lang', process.argv[2]);
    // CLI 某些版本在逐文件失败时仍返回 0，同时检查结构化汇总。
    const translating = command[0] === 'translate';
    if (translating) args.push('--json');
    const result = spawnSync('npx', args, { cwd: root, stdio: translating ? ['inherit', 'pipe', 'inherit'] : 'inherit', encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: process.env });
    if (result.status !== 0) throw new Error(`翻译流程退出：${result.status}`);
    if (translating) {
      const start = result.stdout.search(/\{\s*"processedFiles"\s*:/);
      if (start < 0) throw new Error('翻译工具未返回可识别的结构化汇总。');
      const summary = JSON.parse(result.stdout.slice(start).trim());
      console.log(JSON.stringify(summary, null, 2));
      if (summary.failedFiles > 0 || summary.fatalError || summary.cancelled) throw new Error('翻译未全部完成，请检查汇总并重试。');
    }
  }
} finally {
  await rm(configPath, { force: true });
}
