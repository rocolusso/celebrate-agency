import contactData from '@/data/contact.json';
import {
  BASE_PRICE,
  BUSINESS_ALTERNATE_NAMES,
  BUSINESS_NAME,
  SITE_ALTERNATE_NAME,
  SITE_NAME,
} from './constants';
import {
  defaultLocale,
  getDictionary,
  LOCALE_META,
  locales,
  type Locale,
} from './i18n';
import { buildLocaleUrls } from './i18n-utils';
import { absoluteUrl } from './site-config';
import { getLocaleHomeUrl, websiteNodeId } from './structured-data';
import type { Service } from './types';

type JsonLdNode = Record<string, unknown>;

export type PageSchemaType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
export type PageSection = 'services' | 'about' | 'media' | 'contact';

export interface PageSchemaInput {
  locale: Locale;
  /** Site-relative path of the page without the locale prefix: '/', '/about', '/services/<slug>'. */
  path: string;
  type: PageSchemaType;
  /** Site-relative image of the page; defaults to the locale's Open Graph image. */
  image?: string;
  /** Section of the page for the breadcrumb; omitted on the home page (no breadcrumb). */
  section?: PageSection;
  /** Name of the last breadcrumb for detail pages (the page itself is below the section). */
  leafName?: string;
  /** The page is about the business (home and about pages). */
  aboutBusiness?: boolean;
  /** Set on service detail pages. */
  service?: Service;
}

const LOGO = { path: '/images/logo-112.png', size: 112 } as const;
const FOUNDING_YEAR = '2015';
const PAGE_ID_SEPARATOR = '#';

/** One business entity for both languages: anchored at the default locale home page. */
export const BUSINESS_ID = `${getLocaleHomeUrl(defaultLocale)}${PAGE_ID_SEPARATOR}business`;

const pageUrl = (locale: Locale, path: string): string => buildLocaleUrls(path)[LOCALE_META[locale].htmlLang];

function buildBusinessNode(locale: Locale, description: string): JsonLdNode {
  const {
    address,
    geo,
    openingHours,
    mapUrl,
    social,
    phones,
  } = contactData;
  const languages = locales.map((l) => LOCALE_META[l].htmlLang);
  return {
    '@type': 'EntertainmentBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_ALTERNATE_NAMES,
    url: getLocaleHomeUrl(defaultLocale),
    description,
    foundingDate: FOUNDING_YEAR,
    priceRange: `${BASE_PRICE}+ MDL`,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(LOGO.path),
      width: LOGO.size,
      height: LOGO.size,
    },
    image: [absoluteUrl(LOCALE_META[locale].ogImage.path)],
    telephone: phones.map((phone) => phone.number),
    contactPoint: phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.number,
      contactType: 'reservations',
      areaServed: address.country,
      availableLanguage: languages,
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      postalCode: address.postalCode,
      addressLocality: address.locality,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: mapUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: openingHours.days,
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],
    areaServed: { '@type': 'City', name: address.locality },
    sameAs: [social.instagram, social.facebook, mapUrl],
  };
}

function buildWebSiteNode(locale: Locale): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': websiteNodeId(locale),
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: getLocaleHomeUrl(locale),
    inLanguage: LOCALE_META[locale].htmlLang,
    publisher: { '@id': BUSINESS_ID },
  };
}

function buildServiceNode(locale: Locale, service: Service, canonical: string): JsonLdNode {
  const ageRange = service.ageRange[locale];
  const ages = ageRange.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (!ages) throw new Error(`Cannot read the age range "${ageRange}" of service ${service.slug}`);
  if (typeof service.price !== 'number') throw new Error(`Service ${service.slug} needs a numeric price`);
  return {
    '@type': 'Service',
    '@id': `${canonical}${PAGE_ID_SEPARATOR}service`,
    name: service.name[locale],
    description: service.description[locale],
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: contactData.address.locality },
    image: absoluteUrl(service.image),
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: Number(ages[1]),
      suggestedMaxAge: Number(ages[2]),
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'MDL',
      url: canonical,
    },
  };
}

/**
 * Complete JSON-LD graph of one page: the business (same @id on every page and in both languages),
 * the WebSite of the page language, the page itself, its breadcrumb and, on service pages, the Service.
 * Page titles/descriptions are deliberately not repeated here: Google reads them from <title> and meta.
 */
export async function buildPageGraph(input: PageSchemaInput) {
  const {
    locale,
    path,
    type,
    section,
    leafName,
    aboutBusiness,
    service,
  } = input;
  const canonical = pageUrl(locale, path);
  const [homeDict, commonDict] = await Promise.all([
    getDictionary(locale, 'home'),
    getDictionary(locale, 'common'),
  ]);

  const nodes: JsonLdNode[] = [
    buildBusinessNode(locale, homeDict.meta.description),
    buildWebSiteNode(locale),
  ];

  const page: JsonLdNode = {
    '@type': type,
    '@id': canonical,
    url: canonical,
    inLanguage: LOCALE_META[locale].htmlLang,
    isPartOf: { '@id': websiteNodeId(locale) },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(input.image ?? LOCALE_META[locale].ogImage.path),
    },
  };
  if (aboutBusiness) page.about = { '@id': BUSINESS_ID };

  if (section) {
    const trail = [
      { name: commonDict.nav.home as string, path: '/' },
      { name: commonDict.nav[section] as string, path: `/${section}` },
      ...(leafName ? [{ name: leafName, path }] : []),
    ];
    const breadcrumbId = `${canonical}${PAGE_ID_SEPARATOR}breadcrumb`;
    page.breadcrumb = { '@id': breadcrumbId };
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: trail.map((step, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: step.name,
        item: pageUrl(locale, step.path),
      })),
    });
  }

  if (service) {
    const serviceNode = buildServiceNode(locale, service, canonical);
    page.mainEntity = { '@id': serviceNode['@id'] };
    nodes.push(serviceNode);
  }

  return { '@context': 'https://schema.org', '@graph': [page, ...nodes] };
}
