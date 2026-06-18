export interface LocalizedString {
  ru: string;
  ro: string;
}

export interface Service {
  id: string;
  name: LocalizedString;
  slug: string;
  description: LocalizedString;
  image: string;
  gallery?: string[];
  color: string;
  price: number;
  ageRange: LocalizedString;
  duration: LocalizedString;
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
    city: string;
    area: string;
    street: string;
    full: string;
  };
  social: {
    instagram: string;
  };
  workingHours: string;
}
