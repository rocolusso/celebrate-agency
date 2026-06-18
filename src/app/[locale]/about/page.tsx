import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getDictionary, type Locale } from '@/lib/i18n';
import { generateAlternates, getLocaleHref } from '@/lib/i18n-utils';
import { BASE_PRICE } from '@/lib/constants';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale, 'about');
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: generateAlternates(locale, '/about'),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale, 'about');

  const programTitle = dict.program.title
    .replace('{price}', String(BASE_PRICE))
    .replace('{city}', dict.program.city);

  const programSubtitle = dict.program.subtitle
    .replace('{price}', String(BASE_PRICE))
    .replace('{city}', dict.program.city);

  return (
    <main>
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
              {dict.page.h1}
            </h1>
            <p className="text-xl text-[var(--color-gray)]">
              {dict.page.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-6">
                {dict.main.title}
              </h2>
              <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-4">
                {dict.main.text}
              </p>
            </div>

            <div className="bg-[var(--color-peach)] rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-6">
                {programTitle}
              </h3>
              <p className="text-lg text-[var(--color-navy)] mb-6">
                {programSubtitle}
              </p>
              <ul className="space-y-4">
                {(dict.program.items as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.split(' ')[0]}</span>
                    <span className="text-lg text-[var(--color-navy)]">
                      {item.substring(item.indexOf(' ') + 1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-6 text-center">
                {dict.why.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(dict.why.items as { icon: string; title: string; desc: string }[]).map(
                  (item, index) => (
                    <div key={index} className="bg-[var(--color-cream)] rounded-xl p-6">
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--color-gray)]">{item.desc}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="text-center bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-4">
                {dict.cta.title}
              </h2>
              <p className="text-lg text-[var(--color-gray)] mb-6">
                {dict.cta.subtitle}
              </p>
              <Button href={getLocaleHref(locale, '/contact')} size="lg">
                {dict.cta.btn}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
