// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { getBrand } from './src/lib/brand.ts';

const brand = getBrand(process.env.BRAND);

// https://astro.build/config
export default defineConfig({
  site: brand.siteUrl,
  outDir: `dist/${brand.id}`,
  output: 'static',
  integrations: [
    starlight({
      title: brand.siteName,
      description: brand.description,
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
        'zh-hk': {
          label: '繁體中文',
          lang: 'zh-HK',
        },
        'en-us': {
          label: 'English',
          lang: 'en-US',
        },
        'ko-kr': {
          label: '한국어',
          lang: 'ko-KR',
        },
        'ja-jp': {
          label: '日本語',
          lang: 'ja-JP',
        },
      },
      social: [],
      sidebar: [
        {
          label: '开始使用',
          translations: {
            'zh-HK': '開始使用',
            'en-US': 'Getting Started',
            'ko-KR': '시작하기',
            'ja-JP': 'はじめに',
          },
          items: [{ label: '文档首页', slug: 'guides/overview' }],
        },
        {
          label: '参考',
          translations: {
            'zh-HK': '參考',
            'en-US': 'Reference',
            'ko-KR': '참고',
            'ja-JP': 'リファレンス',
          },
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
