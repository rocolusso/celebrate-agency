import type { Locale } from './i18n';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://domovenok.md';

export function generateAlternates(locale: Locale, pathname: string) {
  const cleanPath = pathname === '/' ? '' : pathname;
  const roUrl = `${BASE_URL}${cleanPath || '/'}`;
  const ruUrl = `${BASE_URL}/ru${cleanPath || ''}`;

  return {
    canonical: locale === 'ro' ? roUrl : ruUrl,
    languages: {
      ro: roUrl,
      ru: ruUrl,
      'x-default': roUrl,
    },
  };
}

export function getLocaleHref(targetLocale: Locale, pathname: string): string {
  if (targetLocale === 'ro') {
    return pathname;
  }
  return `/ru${pathname === '/' ? '' : pathname}`;
}
