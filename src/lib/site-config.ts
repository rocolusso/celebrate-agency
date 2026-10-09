const DEFAULT_SITE_URL = 'https://domovenok.md';

function normalizeBaseUrl(value: string | undefined): string {
  const trimmed = (value ?? '').trim().replace(/\/+$/, '');
  return trimmed || DEFAULT_SITE_URL;
}

/** Single source of truth for the public site origin (no trailing slash). */
export const SITE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_BASE_URL);

/** Builds an absolute URL from a site-relative path (a leading slash is added if missing). */
export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
