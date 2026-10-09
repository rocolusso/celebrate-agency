import type { Metadata } from 'next';
import { SITE_NAME } from './constants';
import { LOCALE_META, type Locale } from './i18n';

export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

/**
 * Applies the site title template to a page title.
 * Needed for pages that live in the same segment as the layout that declares
 * `title.template` (the home pages): Next.js does not apply a template to them.
 */
export function applyTitleTemplate(title: string): string {
  return TITLE_TEMPLATE.replace('%s', () => title);
}

/**
 * Metadata shared by every root layout; only the locale-specific parts differ.
 * `metadataBase` is intentionally not set: it would normalize the root URL
 * (dropping the trailing slash) and break parity with the indexed sitemap URLs.
 */
export function buildLocaleLayoutMetadata(locale: Locale): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: TITLE_TEMPLATE,
    },
    openGraph: {
      locale: LOCALE_META[locale].ogLocale,
      siteName: SITE_NAME,
      type: 'website',
    },
  };
}
