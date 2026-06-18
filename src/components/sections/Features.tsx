import React from 'react';
import Container from '@/components/ui/Container';
import FeatureCard from '@/components/cards/FeatureCard';
import featuresData from '@/data/features.json';
import type { Dict, Locale } from '@/lib/i18n';
import type { Feature } from '@/lib/types';

interface FeaturesProps {
  dict: Dict;
  locale?: Locale;
}

export default function Features({ dict, locale = 'ro' }: FeaturesProps) {
  return (
    <section className="section-padding bg-[var(--color-mint)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4">
            {dict.title}
          </h2>
          <p className="text-lg text-[var(--color-gray)] max-w-3xl mx-auto">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(featuresData as Feature[]).map((feature) => (
            <FeatureCard key={feature.id} feature={feature} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
