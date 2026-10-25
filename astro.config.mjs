// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { getBrand } from './src/lib/brand.ts';
import { docsSidebar } from './src/config/docs-sidebar.mjs';

const brand = getBrand(process.env.BRAND);

// https://astro.build/config
export default defineConfig({
  site: brand.siteUrl,
  outDir: `dist/${brand.id}`,
  output: 'static',
  devToolbar: { enabled: false },
  redirects: {
    // Astro 会自动兼容尾斜杠，勿同时声明两种形式。
    '/guides/overview': '/docs/',
    '/docs/guides/overview': '/docs/',
    '/reference/stack': '/docs/',
    '/docs/reference/stack': '/docs/',
  },
  integrations: [
    starlight({
      title: brand.siteName,
      logo: { src: './public/favicon.svg', alt: '', replacesTitle: false },
      favicon: '/favicon.svg',
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
      components: {
        MarkdownContent: './src/components/docs/MarkdownContent.astro',
      },
      // 手动分组，避免 autogenerate 暴露英文目录名。
      sidebar: docsSidebar,
      customCss: ['./src/styles/global.css'],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // 本地默认联调生产支付（stage 当前 404）
        '/api/v1': {
          target: 'https://adguard.adguardprivate.com',
          changeOrigin: true,
          secure: true,
        },
        // 显式 stage：/api/stage/v1/* -> https://adguard-stage.../api/v1/*
        '/api/stage/v1': {
          target: 'https://adguard-stage.adguardprivate.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/stage\/v1/, '/api/v1'),
        },
      },
    },
  },
});
