import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
// import { formatDate } from '@/lib/utils';
import type { Event } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import { getLocaleHref } from '@/lib/i18n-utils';

interface EventCardProps {
  event: Event;
  locale: Locale;
  btnText: string;
}

export default function EventCard({ event, locale, btnText }: EventCardProps) {
  return (
    <Link
      href={getLocaleHref(locale, `/media/${event.slug}`)}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={event.featuredImage}
          alt={event.title[locale]}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        { /*<p className="text-sm text-[var(--color-gray)] mb-2">*/ }
        { /*  {formatDate(event.date, locale)}*/ }
        { /*</p>*/ }
        <h3 className="text-xl font-bold text-[var(--color-navy)] mb-4 group-hover:text-[var(--color-hot-pink)] transition-colors">
          {event.title[locale]}
        </h3>
        <Button variant="primary" className="w-full">
          {btnText}
        </Button>
      </div>
    </Link>
  );
}
