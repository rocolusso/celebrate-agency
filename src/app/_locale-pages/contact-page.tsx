import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ContactForm from '@/components/forms/ContactForm';
import SeoBlock from '@/components/seo/SeoBlock';
import contactData from '@/data/contact.json';
import { getDictionary, type Locale } from '@/lib/i18n';
import { generateAlternates } from '@/lib/i18n-utils';
import { getPageSeo } from '@/lib/seo';

export async function generateContactMetadata(locale: Locale): Promise<Metadata> {
  const dict = await getDictionary(locale, 'contact');
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: generateAlternates(locale, '/contact'),
  };
}

export async function ContactPageContent({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale, 'contact');
  const commonDict = await getDictionary(locale, 'common');
  const seo = await getPageSeo(locale, 'contact');
  const { workingHours } = dict.page;

  return (
    <main>
      <section className="bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-soft-pink)] py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] mb-4">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-6">
                {dict.page.formTitle}
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-[var(--color-light-gray)]">
                <ContactForm locale={locale} formDict={dict.form} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-6">
                {dict.page.infoTitle}
              </h2>
              <div className="space-y-6">
                <div className="bg-[var(--color-cream)] rounded-xl p-6">
                  <h3 className="font-bold text-[var(--color-navy)] mb-3 flex items-center gap-2">
                    <span className="text-2xl">📞</span>
                    {dict.page.phones}
                  </h3>
                  <div className="space-y-2">
                    {contactData.phones.map((phone) => (
                      <div key={phone.number}>
                        <a
                          href={`tel:${phone.number}`}
                          className="text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] font-medium text-lg transition-colors"
                        >
                          {phone.formatted}
                        </a>
                        <p className="text-sm text-[var(--color-gray)]">{phone.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--color-cream)] rounded-xl p-6">
                  <h3 className="font-bold text-[var(--color-navy)] mb-3 flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    {dict.page.address}
                  </h3>
                  <p className="text-[var(--color-gray)]">{contactData.address.full}</p>
                </div>

                <div className="bg-[var(--color-cream)] rounded-xl p-6">
                  <h3 className="font-bold text-[var(--color-navy)] mb-3 flex items-center gap-2">
                    <span className="text-2xl">🕐</span>
                    {dict.page.hours}
                  </h3>
                  <p className="text-[var(--color-gray)]">{workingHours}</p>
                </div>

                <div className="bg-[var(--color-cream)] rounded-xl p-6">
                  <h3 className="font-bold text-[var(--color-navy)] mb-3 flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    {dict.page.social}
                  </h3>
                  <a
                    href={contactData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <SeoBlock
        sections={seo.sections}
        readMore={commonDict.seo.readMore}
        readLess={commonDict.seo.readLess}
      />
    </main>
  );
}
