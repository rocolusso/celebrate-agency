import {
  defaultLocale,
  LOCALE_META,
  locales,
  type Locale,
} from './i18n';
import { absoluteUrl } from './site-config';

function localizedPath(locale: Locale, pathname: string): string {
  const cleanPath = pathname === '/' ? '' : pathname;
  return `${LOCALE_META[locale].pathPrefix}${cleanPath}` || '/';
}

/**
 * Absolute URLs of one page in every locale, keyed by hreflang value
 * (the same value as <html lang>), plus `x-default` pointing to the default locale.
 */
export function buildLocaleUrls(pathname: string): Record<string, string> {
  const urls = Object.fromEntries(
    locales.map((locale): [string, string] => [
      LOCALE_META[locale].htmlLang,
      absoluteUrl(localizedPath(locale, pathname)),
    ])
  );
  return { ...urls, 'x-default': urls[LOCALE_META[defaultLocale].htmlLang] };
}

export function generateAlternates(locale: Locale, pathname: string) {
  const languages = buildLocaleUrls(pathname);
  return {
    canonical: languages[LOCALE_META[locale].htmlLang],
    languages,
  };
}

export function getLocaleHref(targetLocale: Locale, pathname: string): string {
  if (targetLocale === 'ro') {
    return pathname;
  }
  return `/ru${pathname === '/' ? '' : pathname}`;
}
