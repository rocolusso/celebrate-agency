import React from 'react';
import { formatPrice } from '@/lib/utils';
import type { Feature } from '@/lib/types';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Icon */}
      {feature.icon && (
        <div className="text-5xl mb-4 text-center">
          {feature.icon}
        </div>
      )}

      {/* Name */}
      <h3 className="text-lg font-bold text-[var(--color-navy)] mb-3 text-center">
        {feature.nameRu}
      </h3>

      {/* Description */}
      <p className="text-[var(--color-gray)] text-sm mb-4 text-center">
        {feature.description}
      </p>

      {/* Price */}
      <p className="text-[var(--color-electric-blue)] font-bold text-xl text-center">
        {formatPrice(feature.price)}
      </p>
    </div>
  );
}
