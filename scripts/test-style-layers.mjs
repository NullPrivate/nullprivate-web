import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

for (const brand of ['nullprivate', 'adguardprivate']) {
  test(`${brand}：五语营销页与文档在加载样式前共享层叠顺序`, async () => {
    for (const locale of ['', 'en-us/', 'zh-hk/', 'ja-jp/', 'ko-kr/']) {
      for (const route of ['', 'pricing/', 'my-service/', 'blog/', 'docs/']) {
        const file = `dist/${brand}/${locale}${route}index.html`;
        const html = await readFile(new URL(file, root), 'utf8');
        const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1];
        assert.ok(head, file);
        const styleEntries = [...head.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>|<link\b[^>]*rel="stylesheet"[^>]*>/g)];
        const first = styleEntries[0]?.[0];
        assert.ok(first?.includes('data-style-layer-order'), `${file} 首个样式入口声明层顺序`);
        assert.match(first, /@layer\s+theme\s*,\s*base\s*,\s*starlight\s*,\s*components\s*,\s*utilities\s*;/);
        assert.match(first, /@layer\s+starlight\.base\s*,\s*starlight\.reset\s*,\s*starlight\.core\s*,\s*starlight\.content\s*,\s*starlight\.components\s*,\s*starlight\.utils\s*;/);
        assert.ok(styleEntries.some(({ 0: entry }) => entry.startsWith('<link')), `${file} 加载实际构建样式`);

        if (route === 'pricing/' || route === 'my-service/') {
          const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
          const maxWidth = route === 'pricing/' ? 'max-w-6xl' : 'max-w-3xl';
          assert.match(main, new RegExp(`class="[^"]*\\bmx-auto\\b[^"]*\\b${maxWidth}\\b`));
        }
      }
    }
  });
}