import type { Locale } from './i18n';

export type SeoSectionLevel = 2 | 3;

export interface SeoSection {
  heading: string;
  level: SeoSectionLevel;
  paragraphs: string[];
}

export interface SeoBlockData {
  sections: SeoSection[];
}

export interface SeoSlugEntry extends SeoBlockData {
  meta: {
    title: string;
    description: string;
  };
}

export type SeoPageKey = 'home' | 'about' | 'contact' | 'services' | 'media';

const pageDictionaries: Record<Locale, Record<SeoPageKey, () => Promise<SeoBlockData>>> = {
  ro: {
    home: async () => (await import('@/messages/ro/seo/home.json')).default as SeoBlockData,
    about: async () => (await import('@/messages/ro/seo/about.json')).default as SeoBlockData,
    contact: async () => (await import('@/messages/ro/seo/contact.json')).default as SeoBlockData,
    services: async () => (await import('@/messages/ro/seo/services.json')).default as SeoBlockData,
    media: async () => (await import('@/messages/ro/seo/media.json')).default as SeoBlockData,
  },
  ru: {
    home: async () => (await import('@/messages/ru/seo/home.json')).default as SeoBlockData,
    about: async () => (await import('@/messages/ru/seo/about.json')).default as SeoBlockData,
    contact: async () => (await import('@/messages/ru/seo/contact.json')).default as SeoBlockData,
    services: async () => (await import('@/messages/ru/seo/services.json')).default as SeoBlockData,
    media: async () => (await import('@/messages/ru/seo/media.json')).default as SeoBlockData,
  },
};

const serviceSeoDictionaries: Record<Locale, () => Promise<Record<string, SeoSlugEntry>>> = {
  ro: async () =>
    (await import('@/messages/ro/seo/services-by-slug.json')).default as Record<string, SeoSlugEntry>,
  ru: async () =>
    (await import('@/messages/ru/seo/services-by-slug.json')).default as Record<string, SeoSlugEntry>,
};

const mediaSeoDictionaries: Record<Locale, () => Promise<Record<string, SeoSlugEntry>>> = {
  ro: async () =>
    (await import('@/messages/ro/seo/media-by-slug.json')).default as Record<string, SeoSlugEntry>,
  ru: async () =>
    (await import('@/messages/ru/seo/media-by-slug.json')).default as Record<string, SeoSlugEntry>,
};

export async function getPageSeo(locale: Locale, pageKey: SeoPageKey): Promise<SeoBlockData> {
  return pageDictionaries[locale][pageKey]();
}

export async function getServiceSeo(locale: Locale, slug: string): Promise<SeoSlugEntry | null> {
  const dict = await serviceSeoDictionaries[locale]();
  return dict[slug] ?? null;
}

export async function getMediaSeo(locale: Locale, slug: string): Promise<SeoSlugEntry | null> {
  const dict = await mediaSeoDictionaries[locale]();
  return dict[slug] ?? null;
}
