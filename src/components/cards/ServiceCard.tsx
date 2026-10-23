import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import type { Service } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { getLocaleHref } from '@/lib/i18n-utils';

/** Default for the 1 / 2 / 3 column grids (md:2, lg:3). */
const DEFAULT_SIZES = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

interface ServiceCardProps {
  service: Service;
  locale: Locale;
  btnText: string;
  /** `sizes` of the image; override when the card sits in a different grid. */
  sizes?: string;
}

export default function ServiceCard({ service, locale, btnText, sizes = DEFAULT_SIZES }: ServiceCardProps) {
  return (
    <Link
      href={getLocaleHref(locale, `/services/${service.slug}`)}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-2 group-hover:shadow-lg"
        style={{ backgroundColor: service.color, boxShadow: `0 4px 12px ${service.color}40` }}
      />
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.name[locale]}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-hot-pink)] transition-colors">
          {service.name[locale]}
        </h3>
        <Button variant="primary" className="w-full">
          {btnText}
        </Button>
      </div>
    </Link>
  );
}
