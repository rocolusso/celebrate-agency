import React from 'react';
import { formatPrice } from '@/lib/utils';
import type { Feature } from '@/lib/types';
import type { Locale } from '@/lib/i18n';

interface FeatureCardProps {
  feature: Feature;
  locale: Locale;
}

export default function FeatureCard({ feature, locale }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      {feature.icon && (
        <div className="text-5xl mb-4 text-center">{feature.icon}</div>
      )}
      <h3 className="text-lg font-bold text-[var(--color-navy)] mb-3 text-center">
        {feature.name[locale]}
      </h3>
      <p className="text-[var(--color-gray)] text-sm mb-4 text-center">
        {feature.description[locale]}
      </p>
      <p className="text-[var(--color-electric-blue)] font-bold text-xl text-center">
        {formatPrice(feature.price)}
      </p>
    </div>
  );
}
