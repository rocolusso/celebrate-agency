import React from 'react';
import Container from '@/components/ui/Container';
import ContactForm from '@/components/forms/ContactForm';
import contactData from '@/data/contact.json';
import type { Locale, Dict } from '@/lib/i18n';

interface ContactFormSectionProps {
  locale: Locale;
  preTitle?: string;
  title: string;
  subtitle: string;
  directLabel: string;
  formDict: Dict;
}

export default function ContactFormSection({
  locale,
  preTitle,
  title,
  subtitle,
  directLabel,
  formDict,
}: ContactFormSectionProps) {
  return (
    <section id="contact" className="section-padding bg-[var(--color-lavender)]">
      <Container>
        <div className="max-w-2xl mx-auto">
          {preTitle && (
            <p className="text-xl font-semibold text-[var(--color-hot-pink)] mb-2 text-center">
              {preTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4 text-center">
            {title}
          </h2>
          <p className="text-lg text-[var(--color-gray)] mb-8 text-center">
            {subtitle}
          </p>

          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
            <ContactForm locale={locale} formDict={formDict} />
          </div>

          <div className="text-center">
            <p className="text-[var(--color-navy)] font-medium mb-4">{directLabel}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {contactData.phones.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:${phone.number}`}
                  className="text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] font-medium text-lg transition-colors"
                >
                  📞 {phone.formatted} ({phone.name})
                </a>
              ))}
              <span className="text-[var(--color-electric-blue)] font-medium text-lg">
                📍 {contactData.address.full}
              </span>
              <a
                href={contactData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] font-medium text-lg transition-colors"
              >
                📱 Instagram
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
