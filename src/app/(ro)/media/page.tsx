import type { Metadata } from 'next';
import { generateMediaListMetadata, MediaListContent } from '@/app/_locale-pages/media-list-page';

export async function generateMetadata(): Promise<Metadata> {
  return generateMediaListMetadata('ro');
}

export default function Page() {
  return <MediaListContent locale="ro" />;
}
