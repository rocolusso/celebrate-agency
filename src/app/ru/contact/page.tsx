import type { Metadata } from 'next';
import { generateContactMetadata, ContactPageContent } from '@/app/_locale-pages/contact-page';

export async function generateMetadata(): Promise<Metadata> {
  return generateContactMetadata('ru');
}

export default function Page() {
  return <ContactPageContent locale="ru" />;
}
