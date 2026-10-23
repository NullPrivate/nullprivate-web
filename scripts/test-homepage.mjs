import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test } from 'node:test';

// 通过脚本位置定位项目，支持从任意工作目录运行。
const root = fileURLToPath(new URL('../', import.meta.url));
const brands = [
  { id: 'nullprivate', host: 'www.nullprivate.com' },
  { id: 'adguardprivate', host: 'www.adguardprivate.com' },
];

for (const brand of brands) {
  const output = path.join(root, 'dist', brand.id);
  const html = await readFile(path.join(output, 'index.html'), 'utf8');

  test(`${brand.id}：首页展示完整的产品决策路径`, () => {
    for (const id of ['hero-title', 'features-title', 'family-title', 'setup-title', 'faq-title', 'closing-title']) {
      assert.ok(html.includes(`id="${id}"`), `展示 ${id} 区块`);
      assert.ok(html.includes(`aria-labelledby="${id}"`), `${id} 提供可访问名称`);
    }
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, '使用唯一的主标题');
    assert.match(html, /原理示意/);
    assert.match(html, /实际效果取决于配置与规则/);
    assert.match(html, /防护有边界/);
    assert.match(html, /href="#main-content"/);
    assert.match(html, new RegExp(`https://${brand.host.replaceAll('.', '\\.')}/`));
  });

  test(`${brand.id}：常见问题包含原生展开控件与帮助入口`, () => {
    const questions = [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)].filter(([, content]) => content.includes('faq-answer'));
    assert.equal(questions.length, 5);
    for (const [, question] of questions) {
      assert.match(question, /<summary\b/);
      assert.match(question, /class="[^"]*\bfaq-answer\b[^"]*"/);
      assert.match(question, /href="\/docs\//);
    }
  });

  test(`${brand.id}：首页所有站内链接都指向已构建页面`, async () => {
    const links = new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((match) => match[1]));
    assert.ok(links.size >= 20, '覆盖套餐、设备、功能及支持页面');
    for (const link of links) {
      const destination = path.join(output, link.endsWith('/') ? `${link}index.html` : link);
      const info = await stat(destination);
      assert.ok(info.isFile(), `${link} 对应可访问的静态文件`);
    }
  });

  test(`${brand.id}：主要行动入口保留可识别的点击事件`, () => {
    for (const cta of ['hero_pricing', 'hero_docs', 'footer_pricing', 'footer_public']) {
      assert.match(html, new RegExp(`data-cta="${cta}"`));
    }
  });
}
