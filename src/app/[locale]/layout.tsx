import React from 'react';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { locales } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    openGraph: {
      locale: locale === 'ru' ? 'ru_RU' : 'ro_RO',
      siteName: 'Domovenok',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale, 'common');

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </>
  );
}
