import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
for (const brand of ['nullprivate', 'adguardprivate']) {
  const output = path.join(root, 'dist', brand);
  const page = (route) => readFile(path.join(output, route, 'index.html'), 'utf8');
  test(`${brand}：五语文档保留语义列表并加载正文列表样式`, async () => {
    for (const prefix of ['', 'en-us/', 'zh-hk/', 'ja-jp/', 'ko-kr/']) {
      const html = await page(`${prefix}docs`);
      const content = html.slice(html.indexOf('class="sl-markdown-content"'));
      assert.match(content, /<ul>\s*<li>/);
      const styles = [...html.matchAll(/<link\b[^>]*href="([^\"]+\.css)"[^>]*>/g)].map((match) => match[1]);
      const css = (await Promise.all(styles.map((href) => readFile(path.join(output, href), 'utf8')))).join('\n');
      for (const type of ['disc', 'decimal', 'circle', 'square']) assert.ok(css.includes(`list-style-type:${type}`), type);
      assert.ok(css.includes('.sl-markdown-content,.blog-body'), '文档与博客共用列表样式');
      assert.ok(css.includes('.not-content'), '组件区域有独立作用域');
    }
  });
  test(`${brand}：配置步骤保留多层有序列表`, async () => {
    const html = await page('docs/startup/config/windows');
    assert.match(html, /<ol>[\s\S]*?<li>[\s\S]*?<ol>/);
  });
  test(`${brand}：支持文档保留混合嵌套列表`, async () => {
    const html = await page('docs/faq/how-to-support');
    assert.match(html, /<ol>[\s\S]*?<li>[\s\S]*?<ul>/);
  });
  test(`${brand}：任务清单保留原生只读复选框`, async () => {
    const html = await page('docs/startup/dashboard');
    assert.match(html, /<li class="task-list-item"><input type="checkbox" disabled/);
  });
}
