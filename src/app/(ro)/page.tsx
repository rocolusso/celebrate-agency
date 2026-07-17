import type { Metadata } from 'next';
import { generateHomeMetadata, HomePageContent } from '@/app/_locale-pages/home-page';

export async function generateMetadata(): Promise<Metadata> {
  return generateHomeMetadata('ro');
}

export default function Page() {
  return <HomePageContent locale="ro" />;
}
