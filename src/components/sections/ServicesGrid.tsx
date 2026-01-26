import React from 'react';
import Container from '@/components/ui/Container';
import ServiceCard from '@/components/cards/ServiceCard';
import type { Service } from '@/lib/types';

interface ServicesGridProps {
  services: Service[];
  columns?: 2 | 3 | 4;
}

export default function ServicesGrid({ services, columns = 3 }: ServicesGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="section-padding bg-[var(--color-cream)]">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-12 text-center">
          Наши персонажи
        </h2>

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 md:gap-8`}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
