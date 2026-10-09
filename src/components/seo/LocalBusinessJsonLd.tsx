import React from 'react';
import contactData from '@/data/contact.json';
import { SITE_NAME } from '@/lib/constants';
import { LOCALE_META, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site-config';

interface LocalBusinessJsonLdProps {
  locale: Locale;
}

export default function LocalBusinessJsonLd({ locale }: LocalBusinessJsonLdProps) {
  const url = `${SITE_URL}${LOCALE_META[locale].pathPrefix}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url,
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
