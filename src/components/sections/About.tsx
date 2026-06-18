import React from 'react';
import Container from '@/components/ui/Container';
import { BASE_PRICE } from '@/lib/constants';
import type { Dict } from '@/lib/i18n';

interface AboutProps {
  dict: Dict;
}

export default function About({ dict }: AboutProps) {
  const programTitle = (dict.programTitle as string)
    .replace('{price}', String(BASE_PRICE))
    .replace('{city}', dict.city as string);

  return (
    <section className="section-padding bg-[var(--color-peach)]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-6 text-center">
            {dict.title}
          </h2>

          <p className="text-lg text-[var(--color-navy)] mb-6 leading-relaxed">
            {dict.intro}
          </p>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-6">
            <h3 className="text-2xl font-bold text-[var(--color-hot-pink)] mb-4">
              {programTitle}
            </h3>
            <ul className="space-y-3">
              {(dict.programItems as string[]).map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-[var(--color-navy)]">
                  <span className="text-[var(--color-hot-pink)] font-bold flex-shrink-0">
                    {item.split(' ')[0]}
                  </span>
                  <span>{item.substring(item.indexOf(' ') + 1)}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-lg text-[var(--color-navy)] text-center font-medium">
            {dict.closing}
          </p>
        </div>
      </Container>
    </section>
  );
}
