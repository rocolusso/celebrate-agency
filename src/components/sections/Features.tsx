import React from 'react';
import Container from '@/components/ui/Container';
import FeatureCard from '@/components/cards/FeatureCard';
import featuresData from '@/data/features.json';

export default function Features() {
  return (
    <section className="section-padding bg-[var(--color-mint)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            Дополните праздник яркими опциями
          </h2>
          <p className="text-lg text-[var(--color-gray)] max-w-3xl mx-auto">
            Хотите сделать праздник ещё интереснее и насыщеннее? 
            Мы подготовили специальные дополнения, которые подарят детям новые эмоции!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
