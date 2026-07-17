'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  ariaLabel?: string;
}

export default function LanguageSwitcher({ locale, ariaLabel }: LanguageSwitcherProps) {
  const pathname = usePathname();

  let roHref: string;
  let ruHref: string;

  if (locale === 'ru') {
    roHref = pathname.replace(/^\/ru/, '') || '/';
    ruHref = pathname;
  } else {
    roHref = pathname;
    ruHref = `/ru${pathname === '/' ? '' : pathname}`;
  }

  return (
    <div className="flex items-center gap-1" aria-label={ariaLabel}>
      <Link
        href={roHref}
        className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'ro'
            ? 'text-[var(--color-hot-pink)] font-bold'
            : 'text-[var(--color-navy)] hover:text-[var(--color-hot-pink)]'
        }`}
      >
        <span>RO</span>
      </Link>
      <span className="text-[var(--color-gray)] text-sm">|</span>
      <Link
        href={ruHref}
        className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'ru'
            ? 'text-[var(--color-hot-pink)] font-bold'
            : 'text-[var(--color-navy)] hover:text-[var(--color-hot-pink)]'
        }`}
      >
        <span>RU</span>
      </Link>
    </div>
  );
}
