import type { Metadata } from 'next';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import { getGalleryPhotos } from '@/lib/content';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  title: 'Adventure Gallery',
  description: 'View photos and video highlights from Ayana Outdoors’ camps and treks. See children experiencing sunrise hikes, river camps, and outdoor learning.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Adventure Gallery | Ayana Outdoors',
    description: 'Browse our visual lookbook of kids adventure camps, scenic treks, and nature experiences.',
  },
};

export default async function Gallery() {
  const photos = await getGalleryPhotos();

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <GalleryContent photos={photos} />
    </main>
  );
}
