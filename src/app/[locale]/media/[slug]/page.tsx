import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PhotoGallery from '@/components/media/PhotoGallery';
import YouTubeEmbed from '@/components/media/YouTubeEmbed';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ServiceCard from '@/components/cards/ServiceCard';
import eventsData from '@/data/events.json';
import servicesData from '@/data/services.json';
// import { formatDate } from '@/lib/utils';
import { getDictionary, type Locale } from '@/lib/i18n';
import { generateAlternates, getLocaleHref } from '@/lib/i18n-utils';
import type { Event, Service } from '@/lib/types';

interface EventPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const locales: Locale[] = ['ro', 'ru'];
  return locales.flatMap((locale) =>
    eventsData.map((event) => ({ locale, slug: event.slug }))
  );
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = (eventsData as Event[]).find((e) => e.slug === slug);
  if (!event) return { title: 'Not found' };

  return {
    title: event.title[locale],
    description: event.description?.[locale] ?? event.title[locale],
    alternates: generateAlternates(locale, `/media/${slug}`),
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { locale, slug } = await params;
  const event = (eventsData as Event[]).find((e) => e.slug === slug);
  if (!event) notFound();

  const dict = await getDictionary(locale, 'media');
  const contactDict = await getDictionary(locale, 'contact');
  const commonDict = await getDictionary(locale, 'common');

  return (
    <main>
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-20">
        <Container>
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-[var(--color-gray)]">
              <li>
                <Link href={getLocaleHref(locale, '/')} className="hover:text-[var(--color-hot-pink)]">
                  {dict.detail.breadcrumbs.home}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={getLocaleHref(locale, '/media')} className="hover:text-[var(--color-hot-pink)]">
                  {dict.detail.breadcrumbs.media}
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--color-navy)] font-medium">{event.title[locale]}</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            { /* <p className="text-[var(--color-gray)] mb-2">{formatDate(event.date, locale)}</p> */ }
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
              {event.title[locale]}
            </h1>
            {event.description && (
              <p className="text-lg text-[var(--color-gray)]">{event.description[locale]}</p>
            )}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
            {dict.detail.photosTitle}
          </h2>
          <PhotoGallery images={event.images} alt={event.title[locale]} />
        </Container>
      </section>

      {event.youtubeUrl && (
        <section className="section-padding bg-[var(--color-cream)]">
          <Container>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
              {dict.detail.videoTitle}
            </h2>
            <YouTubeEmbed videoUrl={event.youtubeUrl} title={event.title[locale]} />
          </Container>
        </section>
      )}

      <ContactFormSection
        locale={locale}
        preTitle={dict.detail.ctaPreTitle}
        title={dict.detail.ctaTitle}
        subtitle={dict.detail.ctaSubtitle}
        directLabel={contactDict.form.directLabel}
        formDict={contactDict.form}
      />

      <section className="section-padding bg-[var(--color-cream)]">
        <Container>
          <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-12 text-center">
            {dict.detail.servicesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(servicesData as Service[]).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                locale={locale}
                btnText={commonDict.cards.more}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 bg-white">
        <Container>
          <div className="text-center">
            <Link
              href={getLocaleHref(locale, '/media')}
              className="text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] font-medium transition-colors"
            >
              {dict.detail.backLink}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
