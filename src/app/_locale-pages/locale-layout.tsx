import React from 'react';
import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary, LOCALE_META, type Locale } from '@/lib/i18n';
import { fontVariableClasses } from '@/lib/fonts';

/**
 * Shared shell for every root layout (src/app/(ro)/layout.tsx and src/app/ru/layout.tsx).
 * The <html lang> value always comes from LOCALE_META, so it cannot drift from hreflang.
 */
export default async function LocaleLayoutContent({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = await getDictionary(locale, 'common');
  return (
    <html lang={LOCALE_META[locale].htmlLang} suppressHydrationWarning>
      <body className={fontVariableClasses}>
        <Analytics />
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="H4CpaqPIT7ENOeCOtKKbCA" strategy="afterInteractive" />
        {/* <SpeedInsights /> */}
        <Navbar locale={locale} dict={dict} />
        {children}
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
