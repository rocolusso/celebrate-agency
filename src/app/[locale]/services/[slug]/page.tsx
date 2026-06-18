import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ServiceCard from '@/components/cards/ServiceCard';
import PhotoGallery from '@/components/media/PhotoGallery';
import servicesData from '@/data/services.json';
import { formatPrice } from '@/lib/utils';
import { getDictionary, type Locale } from '@/lib/i18n';
import { generateAlternates, getLocaleHref } from '@/lib/i18n-utils';
import type { Service } from '@/lib/types';

interface ServicePageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const locales: Locale[] = ['ro', 'ru'];
  return locales.flatMap((locale) =>
    servicesData.map((service) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = (servicesData as Service[]).find((s) => s.slug === slug);
  if (!service) return { title: 'Not found' };
  const dict = await getDictionary(locale, 'services');

  return {
    title: `${service.name[locale]} - ${dict.detail.labels.price} ${formatPrice(service.price)}`,
    description: service.description[locale],
    alternates: generateAlternates(locale, `/services/${slug}`),
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = (servicesData as Service[]).find((s) => s.slug === slug);
  if (!service) notFound();

  const dict = await getDictionary(locale, 'services');
  const contactDict = await getDictionary(locale, 'contact');
  const commonDict = await getDictionary(locale, 'common');
  const relatedServices = (servicesData as Service[]).filter((s) => s.id !== service.id);

  return (
    <main>
      <section
        className="relative py-16 md:py-24"
        style={{ background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)` }}
      >
        <Container>
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-[var(--color-gray)]">
              <li>
                <Link href={getLocaleHref(locale, '/')} className="hover:text-[var(--color-hot-pink)]">
                  {dict.detail.breadcrumbs.home}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={getLocaleHref(locale, '/services')} className="hover:text-[var(--color-hot-pink)]">
                  {dict.detail.breadcrumbs.services}
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--color-navy)] font-medium">{service.name[locale]}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.name[locale]}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-6">
                {service.name[locale]}
              </h1>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="text-sm text-[var(--color-gray)]">{dict.detail.labels.price}</p>
                    <p className="text-2xl font-bold" style={{ color: service.color }}>
                      {formatPrice(service.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👶</span>
                  <div>
                    <p className="text-sm text-[var(--color-gray)]">{dict.detail.labels.age}</p>
                    <p className="text-lg font-medium text-[var(--color-navy)]">
                      {service.ageRange[locale]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="text-sm text-[var(--color-gray)]">{dict.detail.labels.duration}</p>
                    <p className="text-lg font-medium text-[var(--color-navy)]">
                      {service.duration[locale]}
                    </p>
                  </div>
                </div>
              </div>
              <Button href="#contact" size="lg" className="w-full md:w-auto">
                {dict.detail.orderBtn}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-6">
              {dict.detail.aboutTitle}
            </h2>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-8">
              {service.description[locale]}
            </p>
            <div className="bg-[var(--color-cream)] rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
                {dict.detail.includesTitle}
              </h3>
              <ul className="space-y-3">
                {(dict.detail.includes as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--color-navy)]">
                    <span className="text-xl flex-shrink-0">{item.split(' ')[0]}</span>
                    <span className="text-lg">{item.substring(item.indexOf(' ') + 1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {service.gallery && service.gallery.length > 0 && (
        <section className="section-padding bg-white">
          <Container>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
              {dict.detail.galleryTitle}
            </h2>
            <PhotoGallery images={service.gallery} alt={service.name[locale]} />
          </Container>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="section-padding bg-[var(--color-cream)]">
          <Container>
            <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
              {dict.detail.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedServices.map((related) => (
                <ServiceCard
                  key={related.id}
                  service={related}
                  locale={locale}
                  btnText={commonDict.cards.more}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactFormSection
        locale={locale}
        title={contactDict.form.sectionTitle}
        subtitle={contactDict.form.sectionSubtitle}
        directLabel={contactDict.form.directLabel}
        formDict={contactDict.form}
      />
    </main>
  );
}
