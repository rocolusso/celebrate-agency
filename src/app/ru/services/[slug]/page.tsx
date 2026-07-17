import type { Metadata } from 'next';
import servicesData from '@/data/services.json';
import {
  generateServiceDetailMetadata,
  ServiceDetailContent,
} from '@/app/_locale-pages/service-detail-page';

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateServiceDetailMetadata('ru', slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailContent locale="ru" slug={slug} />;
}
