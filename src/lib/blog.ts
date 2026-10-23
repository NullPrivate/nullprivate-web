import { getCollection, type CollectionEntry } from 'astro:content';

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

export function blogPermalink(entry: BlogEntry): string | null {
  const date = parseBlogDate(entry.data.pubDate);
  if (!date) return null;
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `/blog/${year}/${month}/${day}/${blogSlug(entry)}/`;
}

export async function getBlogEntries(locale = 'zh-cn') {
  const all = await getCollection('blog');
  return all
    .filter((entry) => entry.id.replace(/\\/g, '/').startsWith(`${locale}/`))
    .sort((a, b) => {
      const da = parseBlogDate(a.data.pubDate)?.getTime() ?? 0;
      const db = parseBlogDate(b.data.pubDate)?.getTime() ?? 0;
      return db - da;
    });
}
