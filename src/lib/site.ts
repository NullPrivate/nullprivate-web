export const defaultLocale = 'zh-cn';

export const locales = ['zh-cn', 'zh-hk', 'en-us', 'ko-kr', 'ja-jp'] as const;

export type Locale = (typeof locales)[number];

export function localeFromPath(path: string): Locale {
  const segment = path.split('/')[1];
  return locales.find((locale) => locale !== defaultLocale && locale === segment) ?? defaultLocale;
}

export function unlocalizedPath(path: string): string {
  const locale = localeFromPath(path);
  return locale === defaultLocale ? path : path.slice(locale.length + 1) || '/';
}

/** 路径工具独立于词典，供静态页面与客户端岛共同使用。 */
export function localizedPath(path: string, locale: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = unlocalizedPath(path);
  return locale === defaultLocale || !locales.includes(locale as Locale) ? base : `/${locale}${base}`;
}

export const localeLabels: Record<Locale, string> = {
  'zh-cn': '简体中文',
  'zh-hk': '繁體中文',
  'en-us': 'English',
  'ko-kr': '한국어',
  'ja-jp': '日本語',
};

/** 旧路径兼容：Hugo /pages/* → Astro 短路径 */
export const legacyPageRedirects: Record<string, string> = {
  '/pages/pricing': '/pricing',
  '/pages/pricing/': '/pricing/',
  '/pages/my-service': '/my-service',
  '/pages/my-service/': '/my-service/',
};
