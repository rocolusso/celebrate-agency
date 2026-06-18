'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { NAV_HREFS, SITE_NAME } from '@/lib/constants';
import contactData from '@/data/contact.json';
import type { Locale, Dict } from '@/lib/i18n';
import { getLocaleHref } from '@/lib/i18n-utils';

interface NavbarProps {
  locale: Locale;
  dict: Dict;
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = NAV_HREFS.map((item) => ({
    href: getLocaleHref(locale, item.href),
    label: dict.nav[item.key] as string,
  }));

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            <Link href={getLocaleHref(locale, '/')} className="text-2xl font-bold text-[var(--color-navy)]">
              {SITE_NAME}
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-[var(--color-hot-pink)]'
                      : 'text-[var(--color-navy)] hover:text-[var(--color-hot-pink)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${contactData.phones[0].number}`}
                className="text-base font-medium text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] transition-colors"
              >
                {contactData.phones[0].formatted}
              </a>
              <LanguageSwitcher locale={locale} ariaLabel={dict.langSwitcher.ariaLabel} />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-[var(--color-navy)]"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </Container>
      </nav>

      <div className="h-20" />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
