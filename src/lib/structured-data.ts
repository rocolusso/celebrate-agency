import { LOCALE_META, type Locale } from './i18n';
import { buildLocaleUrls } from './i18n-utils';

/**
 * Canonical URL of the locale's home page, from the same function that builds the canonical
 * and hreflang URLs (so JSON-LD urls cannot drift from them).
 */
export function getLocaleHomeUrl(locale: Locale): string {
  return buildLocaleUrls('/')[LOCALE_META[locale].htmlLang];
}

/** Stable id of the WebSite node: "<locale home url>#website" (the business id lives in schema-graph.ts). */
export const websiteNodeId = (locale: Locale): string => `${getLocaleHomeUrl(locale)}#website`;
