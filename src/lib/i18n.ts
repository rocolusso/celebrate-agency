export type Locale = 'ro' | 'ru';
export const locales: Locale[] = ['ro', 'ru'];
export const defaultLocale: Locale = 'ro';

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
