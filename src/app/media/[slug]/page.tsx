import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PhotoGallery from '@/components/media/PhotoGallery';
import YouTubeEmbed from '@/components/media/YouTubeEmbed';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ServiceCard from '@/components/cards/ServiceCard';
import eventsData from '@/data/events.json';
import servicesData from '@/data/services.json';
import { formatDate } from '@/lib/utils';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: 'Событие не найдено',
    };
  }

  return {
    title: `${event.title} - Наши праздники`,
    description: event.description || `Фотографии и видео с праздника: ${event.title}`,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-20">
        <Container>
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-[var(--color-gray)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-hot-pink)]">
                  Главная
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/media" className="hover:text-[var(--color-hot-pink)]">
                  Медиа
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--color-navy)] font-medium">{event.title}</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[var(--color-gray)] mb-2">{formatDate(event.date)}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
              {event.title}
            </h1>
            {event.description && (
              <p className="text-lg text-[var(--color-gray)]">{event.description}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
            Фотографии
          </h2>
          <PhotoGallery images={event.images} alt={event.title} />
        </Container>
      </section>

      {/* Video Section */}
      {event.youtubeUrl && (
        <section className="section-padding bg-[var(--color-cream)]">
          <Container>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
              Видео с праздника
            </h2>
            <YouTubeEmbed videoUrl={event.youtubeUrl} title={event.title} />
          </Container>
        </section>
      )}

      {/* Contact Form with CTA */}
      <ContactFormSection
        preTitle="Понравился праздник? Закажите свой!"
        title="Свяжитесь с нами"
        subtitle="Оставьте заявку, и мы свяжемся с вами в ближайшее время"
      />

      {/* Services Grid */}
      <section className="section-padding bg-[var(--color-cream)]">
        <Container>
          <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-12 text-center">
            Выберите персонажа для вашего праздника
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Back Link */}
      <section className="py-8 bg-white">
        <Container>
          <div className="text-center">
            <Link
              href="/media"
              className="text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] font-medium transition-colors"
            >
              ← Вернуться к списку событий
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
