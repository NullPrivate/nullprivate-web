#!/usr/bin/env node
/**
 * 从 ../www.nullprivate.com/content 迁移 docs/blog 到 Astro + Starlight。
 *
 * 用法:
 *   node scripts/migrate-content.mjs --lang zh-cn
 *   node scripts/migrate-content.mjs --lang all
 *   node scripts/migrate-content.mjs --lang zh-cn --dry-run
 *   node scripts/migrate-content.mjs --assets-only
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync, cpSync } from 'node:fs';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const hugoRoot = join(root, '..', 'www.nullprivate.com');
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const langArgIndex = process.argv.indexOf('--lang');
const langArg = langArgIndex >= 0 ? process.argv[langArgIndex + 1] : 'zh-cn';
const locales = ['zh-cn', 'zh-hk', 'en-us', 'ko-kr', 'ja-jp'];
const selected = args.has('--assets-only') ? [] : langArg === 'all' ? locales : [langArg];

function ensureDir(path) {
  if (!dryRun) mkdirSync(path, { recursive: true });
}

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function parseFrontMatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end < 0) return { data: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*/, '');
  const data = {};
  for (const line of fm.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, body };
}

function rewriteBody(body) {
  return body
    .replaceAll('{{% /blocks/feature %}}', '')
    .replaceAll('{{% /blocks/section %}}', '')
    .replaceAll('{{% /blocks/cover %}}', '')
    .replaceAll('{{% /blocks/lead %}}', '')
    .replace(/\{\{[%<][\s\S]*?[%>]\}\}/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}

function toStarlightDoc({ data, body, relPath }) {
  const title = data.title || relPath;
  const description = data.description || '';
  const order = data.weight ? Number(data.weight) || undefined : undefined;
  const lines = ['---', `title: ${JSON.stringify(title)}`];
  if (description) lines.push(`description: ${JSON.stringify(description)}`);
  if (order !== undefined && !Number.isNaN(order)) {
    lines.push('sidebar:');
    lines.push(`  order: ${order}`);
  }
  lines.push('---', '', rewriteBody(body));
  return lines.join('\n');
}

function toBlogMarkdown({ data, body }) {
  const title = data.title || 'Untitled';
  const description = data.description || '';
  const date = data.date || '';
  const slug = data.slug || '';
  const lines = ['---', `title: ${JSON.stringify(title)}`];
  if (description) lines.push(`description: ${JSON.stringify(description)}`);
  if (date) lines.push(`pubDate: ${JSON.stringify(date)}`);
  if (slug) lines.push(`slug: ${JSON.stringify(slug)}`);
  if (data.categories) lines.push(`categories: ${data.categories}`);
  if (data.tags) lines.push(`tags: ${data.tags}`);
  lines.push('---', '', rewriteBody(body));
  return lines.join('\n');
}

function mapDocsPath(relPosix, locale) {
  // content/<locale>/docs/foo/bar.md -> docs[/locale]/docs/foo/bar.md
  // _index.md -> index.md
  let rel = relPosix.replace(/^docs\//, '');
  if (rel.endsWith('/_index.md')) rel = rel.replace(/\/_index\.md$/, '/index.md');
  if (rel === '_index.md') rel = 'index.md';
  if (rel.endsWith('.md') === false && rel.endsWith('.mdx') === false) return null;
  const localePrefix = locale === 'zh-cn' ? '' : `${locale}/`;
  return join('src/content/docs', localePrefix, 'docs', rel);
}

function mapBlogPath(relPosix, locale) {
  // keep file names; later route layer handles date permalink
  let rel = relPosix.replace(/^blog\//, '');
  if (rel.endsWith('/index.md')) {
    // page bundle -> slug.mdx temporarily using folder name
    const folder = rel.split('/')[0];
    rel = `${folder}.md`;
  } else if (rel.endsWith('.md')) {
    rel = rel; // keep markdown
  } else {
    return null;
  }
  return join('src/content/blog', locale, rel);
}

let wrote = 0;
let skipped = 0;

for (const locale of selected) {
  if (!locales.includes(locale)) {
    console.error(`未知语言: ${locale}`);
    process.exit(1);
  }
  const contentRoot = join(hugoRoot, 'content', locale);
  if (!existsSync(contentRoot)) {
    console.warn(`[skip] 缺少内容目录: ${contentRoot}`);
    continue;
  }

  // docs
  const docsRoot = join(contentRoot, 'docs');
  for (const file of walk(docsRoot)) {
    const ext = extname(file).toLowerCase();
    if (!['.md', '.mdx'].includes(ext)) {
      // copy supporting assets into public later if needed
      skipped += 1;
      continue;
    }
    const rel = relative(contentRoot, file).split(sep).join('/');
    const destRel = mapDocsPath(rel, locale);
    if (!destRel) {
      skipped += 1;
      continue;
    }
    const raw = readFileSync(file, 'utf8');
    const parsed = parseFrontMatter(raw);
    const out = toStarlightDoc({ ...parsed, relPath: rel });
    const dest = join(root, destRel);
    console.log(`${dryRun ? 'DRY ' : ''}DOCS  ${rel} -> ${destRel}`);
    if (!dryRun) {
      ensureDir(dirname(dest));
      writeFileSync(dest, out);
    }
    wrote += 1;
  }

  // blog
  const blogRoot = join(contentRoot, 'blog');
  for (const file of walk(blogRoot)) {
    const ext = extname(file).toLowerCase();
    if (!['.md', '.mdx'].includes(ext)) {
      skipped += 1;
      continue;
    }
    // skip section index
    if (file.endsWith(`${sep}_index.md`) || file.endsWith('/_index.md')) {
      skipped += 1;
      continue;
    }
    const rel = relative(contentRoot, file).split(sep).join('/');
    const destRel = mapBlogPath(rel, locale);
    if (!destRel) {
      skipped += 1;
      continue;
    }
    const raw = readFileSync(file, 'utf8');
    const parsed = parseFrontMatter(raw);
    const out = toBlogMarkdown(parsed);
    const dest = join(root, destRel);
    console.log(`${dryRun ? 'DRY ' : ''}BLOG  ${rel} -> ${destRel}`);
    if (!dryRun) {
      ensureDir(dirname(dest));
      writeFileSync(dest, out);
    }
    wrote += 1;
  }
}

// 保留正文媒体的公开路径，图片与视频由同一资源同步流程维护。
const assetMappings = [
  ['assets/images', 'public/images'],
  ['static/videos', 'public/videos'],
];
for (const [source, destination] of assetMappings) {
  const sourceDir = join(hugoRoot, source);
  const destinationDir = join(root, destination);
  if (existsSync(sourceDir)) {
    console.log(`${dryRun ? 'DRY ' : ''}ASSETS ${relative(root, sourceDir)} -> ${destination}`);
    if (!dryRun) {
      ensureDir(destinationDir);
      cpSync(sourceDir, destinationDir, { recursive: true });
    }
  } else {
    console.warn(`[skip] 缺少资源目录: ${relative(root, sourceDir)}`);
  }
}

console.log(`完成: wrote=${wrote}, skipped=${skipped}, dryRun=${dryRun}`);
