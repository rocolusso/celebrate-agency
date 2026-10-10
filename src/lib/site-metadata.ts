import type { Metadata } from 'next';
import { SITE_NAME } from './constants';
import { generateAlternates } from './i18n-utils';
import {
  LOCALE_META,
  locales,
  OG_IMAGE_FORMAT,
  type Locale,
} from './i18n';
import { absoluteUrl } from './site-config';

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
 * Open Graph data of a locale: site name, type, locale (+ the other locales as alternates)
 * and the locale's preview image as an absolute URL. `og:url` is added per page.
 */
function buildOpenGraph(locale: Locale): NonNullable<Metadata['openGraph']> {
  const { ogLocale, ogImage } = LOCALE_META[locale];
  return {
    siteName: SITE_NAME,
    type: 'website',
    locale: ogLocale,
    alternateLocale: locales
      .filter((other) => other !== locale)
      .map((other) => LOCALE_META[other].ogLocale),
    images: [{ url: absoluteUrl(ogImage.path), ...OG_IMAGE_FORMAT, alt: ogImage.alt }],
  };
}

/**
 * Per-page metadata: canonical + hreflang and the complete Open Graph block
 * (`og:url` equals the canonical). A page-level `openGraph` replaces the layout's one
 * in Next.js, so every page spreads this instead of passing `alternates` alone.
 */
export function buildLocalizedMetadata(
  locale: Locale,
  pathname: string
): Pick<Metadata, 'alternates' | 'openGraph'> {
  const alternates = generateAlternates(locale, pathname);
  return {
    alternates,
    openGraph: { ...buildOpenGraph(locale), url: alternates.canonical },
  };
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
    openGraph: buildOpenGraph(locale),
  };
}
