import React from 'react';
import { SITE_ALTERNATE_NAME, SITE_NAME } from '@/lib/constants';
import { LOCALE_META, type Locale } from '@/lib/i18n';
import { businessNodeId, getLocaleHomeUrl, websiteNodeId } from '@/lib/structured-data';

interface WebSiteJsonLdProps {
  locale: Locale;
}

/** WebSite structured data (site name for Google). Rendered on the home pages only. */
export default function WebSiteJsonLd({ locale }: WebSiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteNodeId(locale),
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: getLocaleHomeUrl(locale),
    inLanguage: LOCALE_META[locale].htmlLang,
    publisher: { '@id': businessNodeId(locale) },
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be embedded as raw script content for crawlers.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
