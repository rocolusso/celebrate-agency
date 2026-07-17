import type { Metadata } from 'next';
import { generateServicesListMetadata, ServicesListContent } from '@/app/_locale-pages/services-list-page';

export async function generateMetadata(): Promise<Metadata> {
  return generateServicesListMetadata('ro');
}

export default function Page() {
  return <ServicesListContent locale="ro" />;
}
