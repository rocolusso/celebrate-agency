import type { Metadata } from 'next';
import eventsData from '@/data/events.json';
import {
  generateMediaDetailMetadata,
  MediaDetailContent,
} from '@/app/_locale-pages/media-detail-page';

export async function generateStaticParams() {
  return eventsData.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateMediaDetailMetadata('ro', slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MediaDetailContent locale="ro" slug={slug} />;
}
