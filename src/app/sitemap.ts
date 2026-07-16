import type { MetadataRoute } from 'next';
import eventsData from '@/data/events.json';
import servicesData from '@/data/services.json';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const STATIC_PATHS = ['', '/about', '/contact', '/services', '/media'] as const;

function toSitemapLastMod(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function buildLanguageAlternates(path: string): Record<string, string> {
  const cleanPath = path === '/' ? '' : path;
  const roUrl = `${BASE_URL}${cleanPath || '/'}`;
  const ruUrl = `${BASE_URL}/ru${cleanPath || ''}`;

  return {
    ro: roUrl,
    ru: ruUrl,
    'x-default': roUrl,
  };
}

function entriesForPath(
  path: string,
  lastModified: string
): MetadataRoute.Sitemap {
  const languages = buildLanguageAlternates(path);
  const { ro: roUrl, ru: ruUrl } = languages;

  return [
    {
      url: roUrl,
      lastModified,
      alternates: { languages },
    },
    {
      url: ruUrl,
      lastModified,
      alternates: { languages },
    },
  ];
}

function getDynamicPaths(): string[] {
  const servicePaths = servicesData.map((service) => `/services/${service.slug}`);
  const mediaPaths = eventsData.map((event) => `/media/${event.slug}`);
  return [...servicePaths, ...mediaPaths];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = toSitemapLastMod(new Date());

  const staticEntries = STATIC_PATHS.flatMap((path) =>
    entriesForPath(path, lastModified)
  );

  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const dynamicPaths = getDynamicPaths();
    dynamicEntries = dynamicPaths.flatMap((path) =>
      entriesForPath(path, lastModified)
    );
  } catch (error) {
    console.error('sitemap: failed to load dynamic paths', error);
  }

  return [...staticEntries, ...dynamicEntries];
}
