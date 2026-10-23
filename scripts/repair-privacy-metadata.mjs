import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
// 复用已有译文中的标题与简介，恢复迁移时留在正文里的元数据。
// 范围限定为本专题两篇文章；重复执行保持文件不变。
for (const locale of ['zh-hk', 'en-us', 'ja-jp', 'ko-kr']) {
  for (const slug of ['protect-the-teenager', 'protect-the-eld']) {
    const relative = `src/content/docs/${locale}/docs/hide_me/${slug}/index.md`;
    const file = path.join(root, relative);
    const raw = await readFile(file, 'utf8');
    const blocks = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\s*\r?\n---\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
    if (!blocks) continue;
    const field = (key) => {
      const value = blocks[2].match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim();
      if (!value) throw new Error(`${relative} 缺少译文 ${key}`);
      if (value.startsWith('"')) return JSON.parse(value);
      if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replaceAll("''", "'");
      return value;
    };
    const title = field('title');
    const description = field('description');
    // 保留已有其他 Starlight 字段，只替换标题并补齐简介。
    const metadata = blocks[1].replace(/^title:.*$/m, `title: ${JSON.stringify(title)}`).replace(/^description:.*\r?\n?/m, '');
    await writeFile(file, `---\n${metadata.trim()}\ndescription: ${JSON.stringify(description)}\n---\n\n${blocks[3]}`);
    console.log(`已恢复 ${relative}`);
  }
}
