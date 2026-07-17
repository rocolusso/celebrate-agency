'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { NAV_HREFS } from '@/lib/constants';
import type { Locale, Dict } from '@/lib/i18n';
import { getLocaleHref } from '@/lib/i18n-utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dict;
}

export default function MobileMenu({
  isOpen, onClose, locale, dict,
}: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = NAV_HREFS.map((item) => ({
    href: getLocaleHref(locale, item.href),
    label: dict.nav[item.key] as string,
  }));

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={onClose} />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[var(--color-navy)]"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-2 mt-20 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`text-xl font-medium py-3 transition-colors ${
                pathname === link.href
                  ? 'text-[var(--color-hot-pink)]'
                  : 'text-[var(--color-navy)] hover:text-[var(--color-hot-pink)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 mt-6">
          <Button href={getLocaleHref(locale, '/contact')} className="w-full" onClick={onClose}>
            {dict.nav.cta}
          </Button>
        </div>
      </div>
    </>
  );
}
