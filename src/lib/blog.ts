import { getCollection, type CollectionEntry } from 'astro:content';
import { languageTags, localizedPath, unlocalizedPath } from './i18n';
import { defaultLocale, locales, type Locale } from './site';

export type BlogEntry = CollectionEntry<'blog'>;

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function parseBlogDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function blogSlug(entry: BlogEntry): string {
  if (entry.data.slug) return entry.data.slug;
  const id = entry.id.replace(/\\/g, '/');
  const base = id.split('/').pop() || id;
  return base.replace(/\.mdx?$/, '');
}

export function blogLocale(entry: BlogEntry): Locale {
  const prefix = entry.id.replace(/\\/g, '/').split('/')[0];
  return locales.find((locale) => locale === prefix) ?? defaultLocale;
}

/** 翻译身份采用内容 ID，保留各语言独立的 slug 和发布日期。 */
export function blogTranslationId(entry: BlogEntry): string {
  return entry.id.replace(/\\/g, '/').replace(/^[^/]+\//, '');
}

export function blogPermalink(entry: BlogEntry): string | null {
  const date = parseBlogDate(entry.data.pubDate);
  if (!date) return null;
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return localizedPath(`/blog/${year}/${month}/${day}/${blogSlug(entry)}/`, blogLocale(entry));
}

export async function getBlogEntries(locale: Locale = defaultLocale) {
  const all = await getCollection('blog');
  return all
    .filter((entry) => entry.id.replace(/\\/g, '/').startsWith(`${locale}/`))
    .sort((a, b) => {
      const da = parseBlogDate(a.data.pubDate)?.getTime() ?? 0;
      const db = parseBlogDate(b.data.pubDate)?.getTime() ?? 0;
      return db - da;
    });
}

export function formatBlogDate(entry: BlogEntry, locale: Locale): string {
  const date = parseBlogDate(entry.data.pubDate);
  return date ? new Intl.DateTimeFormat(languageTags[locale], { dateStyle: 'long' }).format(date) : '';
}

export function blogAlternates(entry: BlogEntry, entries: BlogEntry[]): Partial<Record<Locale, string>> {
  const alternates: Partial<Record<Locale, string>> = {};
  for (const candidate of entries) {
    if (blogTranslationId(candidate) !== blogTranslationId(entry)) continue;
    const path = blogPermalink(candidate);
    if (path) alternates[blogLocale(candidate)] = path;
  }
  return alternates;
}

/** 中文与四语路由共用日期、slug 规则。 */
export async function getBlogStaticPaths(locale: Locale) {
  const entries = await getBlogEntries(locale);
  return entries.flatMap((post) => {
    const path = blogPermalink(post);
    if (!path) {
      console.warn(`[blog] ${post.id} 缺少有效 pubDate；补齐原始元数据后将自动生成静态路由。`);
      return [];
    }
    const [, , year, month, day, slug] = unlocalizedPath(path).split('/');
    return [{ params: { year, month, day, slug }, props: { post, locale } }];
  });
}

function normalizedPath(path: string): string {
  return decodeURI(path).replace(/\/+$/, '').toLowerCase();
}

/** 只改写已有目标的站内文档/博客链接，保留查询参数、锚点和外站链接。 */
export function localizeBlogHtml(
  html: string,
  locale: Locale,
  entries: BlogEntry[],
  docs: Pick<CollectionEntry<'docs'>, 'id'>[],
  siteUrl: string,
  currentPath: string,
): string {
  const origin = new URL(siteUrl).origin;
  const internalHosts = new Set([new URL(siteUrl).hostname, 'nullprivate.com', 'www.nullprivate.com', 'adguardprivate.com', 'www.adguardprivate.com']);
  const docsPaths = new Map(docs.map(({ id }) => {
    const path = `/${id.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '')}/`;
    return [normalizedPath(path), path];
  }));
  const postsByPath = new Map(entries.flatMap((entry) => {
    const path = blogPermalink(entry);
    return path ? [[normalizedPath(path), entry] as const] : [];
  }));
  const translations = new Map(entries.filter((entry) => blogLocale(entry) === locale).map((entry) => [blogTranslationId(entry), blogPermalink(entry)]));

  return html.replace(/(<a\b[^>]*?\bhref\s*=\s*)(["'])(.*?)\2/gi, (match, prefix: string, quote: string, href: string) => {
    if (!href || href.startsWith('#')) return match;
    let url: URL;
    try { url = new URL(href.replaceAll('&amp;', '&'), new URL(currentPath, origin)); }
    catch { return match; }
    if (!['http:', 'https:'].includes(url.protocol) || !internalHosts.has(url.hostname)) return match;
    const basePath = unlocalizedPath(url.pathname);
    let target: string | null | undefined;
    if (basePath === '/blog/' || basePath === '/blog') {
      target = localizedPath('/blog/', locale);
    } else if (basePath.startsWith('/blog/')) {
      const post = postsByPath.get(normalizedPath(url.pathname));
      if (post) target = translations.get(blogTranslationId(post));
    } else if (basePath === '/docs' || basePath.startsWith('/docs/')) {
      const candidate = localizedPath(basePath, locale);
      target = docsPaths.get(normalizedPath(candidate));
    }
    if (!target) return match;
    const localized = `${target}${url.search}${url.hash}`.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
    return `${prefix}${quote}${localized}${quote}`;
  });
}
