import type { APIRoute } from 'astro';
import { getBrand } from '../lib/brand';

// 静态构建时按品牌生成，sitemap 路径与 Starlight 的实际产物保持一致。
export const GET: APIRoute = () => {
  const { siteUrl } = getBrand();
  const sitemap = new URL('/sitemap-index.xml', siteUrl).href;
  return new Response([
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /private/',
    'Disallow: /*.json$',
    'Disallow: /*?*',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
