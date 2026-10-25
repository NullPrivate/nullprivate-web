import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const source = await read('public/favicon.svg');

for (const brand of ['nullprivate', 'adguardprivate']) {
  const output = `dist/${brand}/`;

  test(`${brand}：品牌 SVG 在构建后保持完整并可供复用`, async () => {
    assert.equal(await read(`${output}favicon.svg`), source);
    assert.match(source, /viewBox="0 0 64 64"/);
    assert.match(source, /stroke-width="8"/);
  });

  test(`${brand}：营销页面共用图标并保留首页链接名称`, async () => {
    for (const route of ['', 'pricing/', 'my-service/', 'blog/']) {
      const html = await read(`${output}${route}index.html`);
      assert.match(html, /<link\b[^>]*rel="icon"[^>]*href="\/favicon.svg"/);
      assert.match(html, /<a\b[^>]*aria-label="宁屏首页"[^>]*>\s*<img\b[^>]*src="\/favicon.svg"[^>]*width="32"[^>]*height="32"[^>]*alt=""[^>]*aria-hidden="true"/);
    }
  });

  test(`${brand}：文档站同时展示图标和品牌文字`, async () => {
    const html = await read(`${output}docs/index.html`);
    assert.match(html, /<link\b[^>]*href="\/favicon.svg"[^>]*type="image\/svg\+xml"/);
    const siteTitle = html.match(/<a\b[^>]*class="[^"]*site-title[^>]*>[\s\S]*?<\/a>/)?.[0];
    assert.ok(siteTitle, '展示文档站首页链接');
    // HTML 压缩后，空属性可序列化为 alt 或 alt=""。
    assert.match(siteTitle, /<img\b[^>]*\salt(?:="")?(?=\s|>)/);
    assert.match(siteTitle, /宁屏/);
    const src = siteTitle.match(/<img\b[^>]*src="([^"]+)"/)?.[1];
    assert.ok(src, '文档站图标拥有构建后的资源路径');
    assert.equal(await read(`${output}${src.replace(/^\//, '')}`), source);
  });

}