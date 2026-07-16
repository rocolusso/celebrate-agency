import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesGrid from '@/components/sections/ServicesGrid';
import Features from '@/components/sections/Features';
import ContactFormSection from '@/components/sections/ContactFormSection';
import SeoBlock from '@/components/seo/SeoBlock';
import servicesData from '@/data/services.json';
import { getDictionary, type Locale } from '@/lib/i18n';
import { generateAlternates } from '@/lib/i18n-utils';
import { getPageSeo } from '@/lib/seo';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale, 'home');

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: generateAlternates(locale, '/'),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const homeDict = await getDictionary(locale, 'home');
  const contactDict = await getDictionary(locale, 'contact');
  const commonDict = await getDictionary(locale, 'common');
  const seo = await getPageSeo(locale, 'home');

  return (
    <main>
      <Hero
        title={homeDict.hero.title}
        subtitle={homeDict.hero.subtitle}
        ctaText={homeDict.hero.ctaText}
        ctaHref="#contact"
        backgroundImage="/images/hero/hero-bg.jpg"
      />
      <About dict={homeDict.about} />
      <ServicesGrid
        services={servicesData}
        locale={locale}
        title={homeDict.services.title}
        btnText={commonDict.cards.more}
      />
      <Features dict={homeDict.features} locale={locale} />
      <ContactFormSection
        locale={locale}
        title={homeDict.contact.title}
        subtitle={homeDict.contact.subtitle}
        directLabel={homeDict.contact.directLabel}
        formDict={contactDict.form}
      />
      <SeoBlock
        sections={seo.sections}
        readMore={commonDict.seo.readMore}
        readLess={commonDict.seo.readLess}
      />
    </main>
  );
}
