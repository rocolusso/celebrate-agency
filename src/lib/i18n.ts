export type Locale = 'ro' | 'ru';
export const locales: Locale[] = ['ro', 'ru'];
export const defaultLocale: Locale = 'ro';

export interface LocaleMeta {
  /** Value for <html lang> and for the self-referencing hreflang (must always match). */
  htmlLang: string;
  /** Value for og:locale. */
  ogLocale: string;
  /** URL path prefix of the locale (empty for the default locale). */
  pathPrefix: string;
  /** Open Graph / Twitter preview image of the locale (file in `public/`) and its alt text. */
  ogImage: { path: string; alt: string };
}

/** Format shared by every Open Graph image; the real file size is checked by `verify:seo` (A12). */
export const OG_IMAGE_FORMAT = { width: 1200, height: 630, type: 'image/jpeg' } as const;

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  ro: {
    htmlLang: 'ro',
    ogLocale: 'ro_RO',
    pathPrefix: '',
    ogImage: {
      path: '/images/opengraph-ro.jpg',
      alt: 'Domovenok: animatori pentru petreceri de copii în Bălți',
    },
  },
  ru: {
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    pathPrefix: '/ru',
    ogImage: {
      path: '/images/opengraph.jpg',
      alt: 'Domovenok: аниматоры для детских праздников в Бельцах',
    },
  },
};

export type Namespace = 'common' | 'home' | 'services' | 'media' | 'about' | 'contact';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dict = Record<string, any>;

const dictionaries: Record<Locale, Record<Namespace, () => Promise<Dict>>> = {
  ro: {
    common: async () => (await import('@/messages/ro/common.json')).default as Dict,
    home: async () => (await import('@/messages/ro/home.json')).default as Dict,
    services: async () => (await import('@/messages/ro/services.json')).default as Dict,
    media: async () => (await import('@/messages/ro/media.json')).default as Dict,
    about: async () => (await import('@/messages/ro/about.json')).default as Dict,
    contact: async () => (await import('@/messages/ro/contact.json')).default as Dict,
  },
  ru: {
    common: async () => (await import('@/messages/ru/common.json')).default as Dict,
    home: async () => (await import('@/messages/ru/home.json')).default as Dict,
    services: async () => (await import('@/messages/ru/services.json')).default as Dict,
    media: async () => (await import('@/messages/ru/media.json')).default as Dict,
    about: async () => (await import('@/messages/ru/about.json')).default as Dict,
    contact: async () => (await import('@/messages/ru/contact.json')).default as Dict,
  },
};

export async function getDictionary(locale: Locale, namespace: Namespace): Promise<Dict> {
  return dictionaries[locale][namespace]();
}
