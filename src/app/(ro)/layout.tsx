import React from 'react';
import LocaleLayoutContent from '@/app/_locale-pages/locale-layout';
import { buildLocaleLayoutMetadata } from '@/lib/site-metadata';

export const metadata = buildLocaleLayoutMetadata('ro');

export default function RoLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayoutContent locale="ro">{children}</LocaleLayoutContent>;
}
