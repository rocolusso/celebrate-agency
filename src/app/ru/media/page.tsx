import type { Metadata } from 'next';
import { generateMediaListMetadata, MediaListContent } from '@/app/_locale-pages/media-list-page';

export async function generateMetadata(): Promise<Metadata> {
  return generateMediaListMetadata('ru');
}

export default function Page() {
  return <MediaListContent locale="ru" />;
}
