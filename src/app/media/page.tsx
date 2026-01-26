import React from 'react';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import EventCard from '@/components/cards/EventCard';
import eventsData from '@/data/events.json';

export const metadata: Metadata = {
  title: 'Наши праздники - Фото и видео',
  description: 'Смотрите фотографии и видео с наших праздников. Счастливые дети, яркие эмоции, профессиональная работа аниматоров.',
};

export default function MediaPage() {
  // Sort events by date (newest first)
  const sortedEvents = [...eventsData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-4">
              Наши праздники
            </h1>
            <p className="text-xl text-[var(--color-gray)]">
              Фотографии и видео с мероприятий
            </p>
          </div>
        </Container>
      </section>

      {/* Events Grid */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
