import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function LocaleLayoutContent({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = await getDictionary(locale, 'common');
  return (
    <>
      <LocalBusinessJsonLd locale={locale} />
      <Navbar locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </>
  );
}
