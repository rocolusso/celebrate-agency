import React from 'react';
import type { Metadata } from 'next';
import LocaleLayoutContent from '@/app/_locale-pages/locale-layout';

export const metadata: Metadata = {
  openGraph: {
    locale: 'ru_RU',
    siteName: 'Domovenok',
    type: 'website',
  },
};

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayoutContent locale="ru">{children}</LocaleLayoutContent>;
}
