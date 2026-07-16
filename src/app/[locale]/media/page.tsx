import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import EventCard from '@/components/cards/EventCard';
import SeoBlock from '@/components/seo/SeoBlock';
import eventsData from '@/data/events.json';
import { getDictionary, type Locale } from '@/lib/i18n';
import { generateAlternates } from '@/lib/i18n-utils';
import { getPageSeo } from '@/lib/seo';
import type { Event } from '@/lib/types';

interface MediaPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: MediaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale, 'media');
  return {
    title: dict.page.meta.title,
    description: dict.page.meta.description,
    alternates: generateAlternates(locale, '/media'),
  };
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale, 'media');
  const commonDict = await getDictionary(locale, 'common');
  const seo = await getPageSeo(locale, 'media');

  const sortedEvents = [...(eventsData as Event[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main>
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-4">
              {dict.page.h1}
            </h1>
            <p className="text-xl text-[var(--color-gray)]">
              {dict.page.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                locale={locale}
                btnText={commonDict.cards.view}
              />
            ))}
          </div>
        </Container>
      </section>
      <SeoBlock
        sections={seo.sections}
        readMore={commonDict.seo.readMore}
        readLess={commonDict.seo.readLess}
      />
    </main>
  );
}
