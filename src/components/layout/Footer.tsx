import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { NAV_HREFS, SITE_NAME } from '@/lib/constants';
import contactData from '@/data/contact.json';
import type { Locale, Dict } from '@/lib/i18n';
import { getLocaleHref } from '@/lib/i18n-utils';

interface FooterProps {
  locale: Locale;
  dict: Dict;
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = NAV_HREFS.map((item) => ({
    href: getLocaleHref(locale, item.href),
    label: dict.nav[item.key] as string,
  }));

  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">{SITE_NAME}</h3>
              <p className="text-gray-300">{dict.footer.tagline}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{dict.footer.navTitle}</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-soft-pink)] hover:text-[var(--color-hot-pink)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{dict.footer.contactTitle}</h4>
              <ul className="space-y-3">
                {contactData.phones.map((phone) => (
                  <li key={phone.number}>
                    <a
                      href={`tel:${phone.number}`}
                      className="text-[var(--color-soft-pink)] hover:text-[var(--color-hot-pink)] transition-colors"
                    >
                      {phone.formatted} ({phone.name})
                    </a>
                  </li>
                ))}

                {/*<li className="text-gray-300">{contactData.address.full}</li>*/}

                <li>
                  <a
                    href={contactData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-soft-pink)] hover:text-[var(--color-hot-pink)] transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} {SITE_NAME}. {dict.footer.rights}.</p>
        </div>
      </Container>
    </footer>
  );
}
