import React from 'react';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ServicesGrid from '@/components/sections/ServicesGrid';
import servicesData from '@/data/services.json';

export const metadata: Metadata = {
  title: 'Все услуги - Аниматоры для детских праздников',
  description: 'Выберите персонажа для праздника вашего ребенка: Единорожка, Щенячий патруль, Фиксики и другие. 12 вариантов на выбор.',
};

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-4">
              Наши услуги
            </h1>
            <p className="text-xl text-[var(--color-gray)] max-w-2xl mx-auto">
              Выберите любимого персонажа вашего ребенка
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <ServicesGrid services={servicesData} />
    </main>
  );
}
