export const defaultLocale = 'zh-cn';

export const locales = ['zh-cn', 'zh-hk', 'en-us', 'ko-kr', 'ja-jp'] as const;

export type Locale = (typeof locales)[number];

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
