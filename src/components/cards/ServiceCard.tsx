import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Colored Top Border */}
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-2 group-hover:shadow-lg"
        style={{
          backgroundColor: service.color,
          boxShadow: `0 4px 12px ${service.color}40`,
        }}
      />

      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.nameRu}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-hot-pink)] transition-colors">
          {service.nameRu}
        </h3>
        <Button variant="primary" className="w-full">
          Подробнее
        </Button>
      </div>
    </Link>
  );
}
