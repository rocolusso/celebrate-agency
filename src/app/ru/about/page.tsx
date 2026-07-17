import type { Metadata } from 'next';
import { generateAboutMetadata, AboutPageContent } from '@/app/_locale-pages/about-page';

export async function generateMetadata(): Promise<Metadata> {
  return generateAboutMetadata('ru');
}

export default function Page() {
  return <AboutPageContent locale="ru" />;
}
