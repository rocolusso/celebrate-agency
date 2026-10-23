export interface LocalizedString {
  ru: string;
  ro: string;
}

/** Block of the service page body: an optional H3 heading, paragraphs and a list of items. */
export interface ServiceContentBlock {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Service {
  id: string;
  name: LocalizedString;
  slug: string;
  description: LocalizedString;
  image: string;
  gallery?: string[];
  color: string;
  /** Price in lei shown on the page; absent for services priced on request. */
  price?: number;
  /** Show "price on request" instead of a number. */
  priceOnRequest?: boolean;
  /** Short note next to the price, e.g. "per greeting". */
  priceNote?: LocalizedString;
  /** Do not put an Offer (price) into the Service JSON-LD of this page. */
  hideOffer?: boolean;
  ageRange: LocalizedString;
  duration?: LocalizedString;
  /** Extra page body shown under the description. */
  content?: {
    ru: ServiceContentBlock[];
    ro: ServiceContentBlock[];
  };
}

export interface Feature {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number | string;
  icon?: string;
}

export interface Event {
  id: string;
  title: LocalizedString;
  slug: string;
  date: string;
  featuredImage: string;
  images: string[];
  youtubeUrl?: string;
  description?: LocalizedString;
}

export interface ContactInfo {
  phones: Array<{
    name: string;
    number: string;
    formatted: string;
  }>;
  address: {
    streetAddress: string;
    postalCode: string;
    locality: string;
    country: string;
    full: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: {
    days: string[];
    opens: string;
    closes: string;
  };
  mapUrl: string;
  social: {
    instagram: string;
    facebook: string;
  };
  workingHours: string;
}
