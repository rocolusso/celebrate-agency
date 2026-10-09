import React from 'react';
import LocaleLayoutContent from '@/app/_locale-pages/locale-layout';
import { buildLocaleLayoutMetadata } from '@/lib/site-metadata';

export const metadata = buildLocaleLayoutMetadata('ru');

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayoutContent locale="ru">{children}</LocaleLayoutContent>;
}
