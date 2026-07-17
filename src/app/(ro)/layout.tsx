import React from 'react';
import type { Metadata } from 'next';
import LocaleLayoutContent from '@/app/_locale-pages/locale-layout';

export const metadata: Metadata = {
  openGraph: {
    locale: 'ro_RO',
    siteName: 'Domovenok',
    type: 'website',
  },
};

export default function RoLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayoutContent locale="ro">{children}</LocaleLayoutContent>;
}
