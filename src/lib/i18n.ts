import { defaultLocale, type Locale } from './site';
export { localeFromPath, unlocalizedPath, localizedPath } from './site';
import sourceHome from '../i18n/zh-cn/home.json';
import sourceCommon from '../i18n/zh-cn/common.json';
import sourceCommerce from '../i18n/zh-cn/commerce.json';

const dictionaries = import.meta.glob('../i18n/*/*.json', { eager: true, import: 'default' });

export const languageTags: Record<Locale, string> = {
  'zh-cn': 'zh-CN', 'zh-hk': 'zh-HK', 'en-us': 'en-US', 'ja-jp': 'ja-JP', 'ko-kr': 'ko-KR',
};


export function getMessages(locale: Locale) {
  function read<T>(name: string, source: T): T {
    if (locale === defaultLocale) return source;
    const translated = dictionaries[`../i18n/${locale}/${name}.json`];
    // 构建时显式检查语言完整性，确保每个发布入口对应真实译文。
    if (!translated) throw new Error(`缺少 ${locale}/${name}.json，请运行营销文案翻译。`);
    return translated as T;
  }
  return { home: read('home', sourceHome), common: read('common', sourceCommon), commerce: read('commerce', sourceCommerce) };
}

export function displayBrandName(locale: Locale, siteName: string): string {
  return locale === 'zh-cn' ? siteName : locale === 'zh-hk' ? '寧屏' : 'NullPrivate';
}