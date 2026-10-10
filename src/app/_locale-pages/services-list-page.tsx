import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ServicesGrid from '@/components/sections/ServicesGrid';
import SeoBlock from '@/components/seo/SeoBlock';
import servicesData from '@/data/services.json';
import { getDictionary, type Locale } from '@/lib/i18n';
import JsonLd from '@/components/seo/JsonLd';
import { buildPageGraph } from '@/lib/schema-graph';
import { buildLocalizedMetadata } from '@/lib/site-metadata';
import { getPageSeo } from '@/lib/seo';

export async function generateServicesListMetadata(locale: Locale): Promise<Metadata> {
  const dict = await getDictionary(locale, 'services');
  return {
    title: dict.page.meta.title,
    description: dict.page.meta.description,
    ...buildLocalizedMetadata(locale, '/services'),
  };
}

export async function ServicesListContent({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale, 'services');
  const commonDict = await getDictionary(locale, 'common');
  const seo = await getPageSeo(locale, 'services');

  const graph = await buildPageGraph({
    locale,
    path: '/services',
    type: 'CollectionPage',
    section: 'services',
  });

  return (
    <main>
      <JsonLd graph={graph} />
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-4">
              {dict.page.h1}
            </h1>
            <p className="text-xl text-[var(--color-gray)] max-w-2xl mx-auto">
              {dict.page.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <ServicesGrid
        services={servicesData}
        locale={locale}
        title={dict.page.h1}
        btnText={commonDict.cards.more}
        showTitle={false}
      />
      <SeoBlock
        sections={seo.sections}
        readMore={commonDict.seo.readMore}
        readLess={commonDict.seo.readLess}
      />
    </main>
  );
}
