import React from 'react';
import contactData from '@/data/contact.json';
import { SITE_NAME } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';
import { businessNodeId, getLocaleHomeUrl } from '@/lib/structured-data';

interface LocalBusinessJsonLdProps {
  locale: Locale;
}

export default function LocalBusinessJsonLd({ locale }: LocalBusinessJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessNodeId(locale),
    name: SITE_NAME,
    url: getLocaleHomeUrl(locale),
    telephone: contactData.phones.map((phone) => phone.number),
    sameAs: [contactData.social.instagram],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bălți',
      addressCountry: 'MD',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bălți',
    },
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
