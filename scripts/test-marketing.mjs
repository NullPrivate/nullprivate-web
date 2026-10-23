import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const locales = ['zh-cn', 'zh-hk', 'en-us', 'ja-jp', 'ko-kr'];
const tags = { 'zh-cn': 'zh-CN', 'zh-hk': 'zh-HK', 'en-us': 'en-US', 'ja-jp': 'ja-JP', 'ko-kr': 'ko-KR' };
const json = async (locale, name) => JSON.parse(await readFile(path.join(root, 'src/i18n', locale, `${name}.json`), 'utf8'));
const flatten = (value, prefix = '') => Object.fromEntries(Object.entries(value).flatMap(([key, entry]) => {
  const field = prefix ? `${prefix}.${key}` : key;
  return entry !== null && typeof entry === 'object' ? Object.entries(flatten(entry, field)) : [[field, entry]];
}));

for (const locale of locales) {
  test(`${locale}：词典保持完整结构、技术标识与插值参数`, async () => {
    for (const name of ['home', 'common', 'commerce']) {
      const source = flatten(await json('zh-cn', name));
      const translated = flatten(await json(locale, name));
      assert.deepEqual(Object.keys(translated).sort(), Object.keys(source).sort());
      for (const [key, value] of Object.entries(source)) {
        assert.equal(typeof translated[key], typeof value, key);
        if (typeof value !== 'string') { assert.equal(translated[key], value); continue; }
        assert.ok(translated[key].trim().length > 0, key);
        assert.deepEqual([...translated[key].matchAll(/\{\w+\}/g)].map(x => x[0]).sort(), [...value.matchAll(/\{\w+\}/g)].map(x => x[0]).sort(), key);
        if (/\.(href|slug|number)$/.test(key)) assert.equal(translated[key], value, key);
      }
    }
  });
}

for (const brand of ['nullprivate', 'adguardprivate']) {
  const output = path.join(root, 'dist', brand);
  for (const locale of locales) {
    const prefix = locale === 'zh-cn' ? '' : `/${locale}`;
    test(`${brand}/${locale}：四类营销页与五语切换目标完整`, async () => {
      const common = await json(locale, 'common');
      const home = await json(locale, 'home');
      for (const route of ['/', '/pricing/', '/my-service/', '/blog/']) {
        const html = await readFile(path.join(output, `${prefix}${route}index.html`), 'utf8');
        assert.match(html, new RegExp(`lang="${tags[locale]}"`));
        assert.ok(html.includes('id="theme-select"'));
        assert.ok(html.includes('starlight-theme'));
        assert.ok(html.includes(common.lists));
        assert.ok(html.includes('https://github.com/NullPrivate/NullPrivate'));
        const githubLink = html.match(/<a\b[^>]*class="github-link"[^>]*>[\s\S]*?<\/a>/)?.[0];
        assert.ok(githubLink?.includes('href="https://github.com/NullPrivate/NullPrivate"'), '页头第一行提供 GitHub 入口');
        assert.ok(githubLink?.includes(`aria-label="GitHub · ${common.source}"`), '图标入口提供当前语言的可访问名称');
        assert.ok(githubLink?.includes('<svg'), '入口使用 GitHub 矢量标志');
        assert.ok(html.indexOf('class="github-link"') < html.indexOf('class="site-nav"'), 'GitHub 入口位于导航菜单之前');
        assert.equal([...html.matchAll(/rel="alternate"/g)].length >= 5, true);
        assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
        if (route === '/') assert.ok(html.includes(home.hero.title));
        if (route === '/pricing/') {
          assert.ok(html.includes(`href="${prefix}/my-service/"`));
          assert.ok(html.includes(`href="${prefix}/docs/startup/config/"`));
        }
        for (const target of locales) {
          const href = `${target === 'zh-cn' ? '' : `/${target}`}${route}`;
          assert.ok(html.includes(`href="${href}"`), href);
          assert.ok((await stat(path.join(output, `${href}index.html`))).isFile());
        }
      }
    });
    test(`${brand}/${locale}：首页本地化入口对应实际构建文件`, async () => {
      const html = await readFile(path.join(output, `${prefix}/index.html`), 'utf8');
      for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
        assert.ok((await stat(path.join(output, href.endsWith('/') ? `${href}index.html` : href))).isFile(), href);
      }
    });
  }
}
