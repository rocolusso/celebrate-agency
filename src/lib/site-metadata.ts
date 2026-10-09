import type { Metadata } from 'next';
import { SITE_NAME } from './constants';
import { LOCALE_META, type Locale } from './i18n';
import { SITE_URL } from './site-config';

/** Metadata shared by every root layout; only the locale-specific parts differ. */
export function buildLocaleLayoutMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    openGraph: {
      locale: LOCALE_META[locale].ogLocale,
      siteName: SITE_NAME,
      type: 'website',
    },
  };
}
