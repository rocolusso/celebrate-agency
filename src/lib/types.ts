export interface Service {
  id: string;
  nameRu: string;
  slug: string;
  description: string;
  image: string;
  gallery?: string[];
  color: string;
  price: number;
  ageRange: string;
  duration: string;
}

export interface Feature {
  id: string;
  nameRu: string;
  description: string;
  price: number | string;
  icon?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  featuredImage: string;
  images: string[];
  youtubeUrl?: string;
  description?: string;
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
