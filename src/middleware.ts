import { NextRequest, NextResponse } from 'next/server';
import type { Locale } from '@/lib/i18n';

const locales: Locale[] = ['ro', 'ru'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Detect locale prefix in URL path
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // /ro/... → redirect to remove explicit default prefix (canonical = no prefix)
  if (pathnameLocale === 'ro') {
    const newPathname = pathname.replace(/^\/ro/, '') || '/';
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // /ru/... → pass through, set locale header for root layout
  if (pathnameLocale === 'ru') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', 'ru');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No locale prefix → ALWAYS Romanian (default language, no auto-detection)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', 'ro');

  // Internal rewrite: /services → /ro/services so [locale] param = 'ro'
  const newPathname = `/ro${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(new URL(newPathname, request.url), {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|images|icons|.*\\..*).*)'],
};
