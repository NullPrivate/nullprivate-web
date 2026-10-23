import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test } from 'node:test';
import { privacyGuideSlugs } from '../src/config/docs-sidebar.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const locales = ['zh-cn', 'zh-hk', 'en-us', 'ja-jp', 'ko-kr'];
const stripTags = (html) => html.replace(/<[^>]*>/g, '').trim();

for (const brand of ['nullprivate', 'adguardprivate']) {
  for (const locale of locales) {
    const prefix = locale === 'zh-cn' ? '' : `${locale}/`;
    const output = path.join(root, 'dist', brand);
    test(`${brand}/${locale}：专题展示本语言简介和五篇文章，顺序与侧栏一致`, async () => {
      const html = await readFile(path.join(output, prefix, 'docs/hide_me/index.html'), 'utf8');
      const intro = html.match(/<p\b[^>]*class="topic-intro[^\"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1];
      assert.ok(intro && stripTags(intro).length > 20, '专题简介可阅读');
      const cards = [...html.matchAll(/<a\b[^>]*class="topic-card[^\"]*"[^>]*href="([^\"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
      assert.equal(cards.length, privacyGuideSlugs.length);
      for (const [index, [, href, content]] of cards.entries()) {
        assert.equal(href, `/${prefix}${privacyGuideSlugs[index]}/`);
        const destination = path.join(output, href, 'index.html');
        assert.ok((await stat(destination)).isFile());
        const article = await readFile(destination, 'utf8');
        const title = stripTags(content.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? '');
        const articleTitle = stripTags(article.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
        assert.ok(title.length > 0);
        assert.equal(title, articleTitle, '卡片读取当前语言的文章标题');
        assert.ok(stripTags(content.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '').length > 0, '卡片包含文章简介');
        assert.ok(article.includes('class="sl-markdown-content"'), '保留原文档内容容器');
      }
    });
    test(`${brand}/${locale}：文章保留上一页下一页及完整标题`, async () => {
      const html = await readFile(path.join(output, prefix, 'docs/hide_me/protect-the-eld/index.html'), 'utf8');
      assert.ok(html.includes(`href="/${prefix}docs/hide_me/protect-the-teenager/" rel="prev"`));
      assert.ok(html.includes(`href="/${prefix}docs/hide_me/protect-yourself/" rel="next"`));
      assert.equal([...html.matchAll(/class="link-title\b/g)].length, 2);
    });
  }
}
