import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME } from '@/lib/constants';
import { defaultLocale, LOCALE_META } from '@/lib/i18n';
import { fontVariableClasses } from '@/lib/fonts';

export const metadata: Metadata = {
  title: `Pagina nu a fost găsită | Страница не найдена | ${SITE_NAME}`,
};

/**
 * Rendered by Next.js for URLs that match no route (experimental.globalNotFound).
 * Such URLs have no locale and no root layout, so the page is bilingual and uses
 * the default locale for <html lang>. Next.js adds noindex and the 404 status.
 */
export default function GlobalNotFound() {
  return (
    <html lang={LOCALE_META[defaultLocale].htmlLang}>
      <body className={fontVariableClasses}>
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center text-[var(--color-navy)] bg-[var(--color-cream)]">
          <p className="text-6xl font-bold text-[var(--color-hot-pink)]">404</p>
          <p className="text-xl">Pagina nu a fost găsită</p>
          <p className="text-xl">Страница не найдена</p>
          <div className="flex gap-6">
            <a href="/" className="font-medium text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)]">
              Pagina principală
            </a>
            <a href="/ru" className="font-medium text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)]">
              На главную
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
