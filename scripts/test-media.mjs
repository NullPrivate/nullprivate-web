import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const locales = ['', 'zh-hk/', 'en-us/', 'ko-kr/', 'ja-jp/'];

for (const brand of ['nullprivate', 'adguardprivate']) {
  const output = join(root, 'dist', brand);
  test(`${brand}：五语 Android 教程引用已发布的 MP4 视频`, async () => {
    for (const locale of locales) {
      const html = await readFile(join(output, locale, 'docs/startup/config/android/index.html'), 'utf8');
      assert.match(html, /<video\b[^>]*controls/);
      const source = html.match(/<source\b[^>]*src="(\/videos\/[^\"]+\.mp4)"/);
      assert.ok(source, `${locale || 'zh-cn'}：视频地址`);
      const video = await readFile(join(output, source[1]));
      assert.ok(video.length > 0);
      assert.equal(video.toString('ascii', 4, 8), 'ftyp', '资源为 MP4 文件');
      assert.deepEqual(video, await readFile(join(root, 'public', source[1])), '发布文件与源资源一致');
    }
  });
  test(`${brand}：全部页面的本地视频引用均有对应资源`, async () => {
    let references = 0;
    const entries = await readdir(output, { recursive: true, withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
      const html = await readFile(join(entry.parentPath, entry.name), 'utf8');
      for (const match of html.matchAll(/\bsrc="(\/videos\/[^\"?#]+)(?:[?#][^\"]*)?"/g)) {
        assert.ok((await stat(join(output, decodeURIComponent(match[1])))).size > 0, match[1]);
        references++;
      }
    }
    assert.ok(references >= locales.length, '覆盖实际页面的视频引用');
  });
}
