import { InteriorComingSoon } from '@/components/site/InteriorComingSoon';

export const metadata = {
  title: 'Interior Dept.',
  description:
    'Sondr\'s interior department — handmade furniture pieces, limited editions, and spatial consultancy. Same careful hand as our web and brand work.',
  alternates: { canonical: '/interior' },
  openGraph: {
    title: 'Interior Dept. | Sondr Designs',
    description: 'Handmade furniture pieces, limited editions, and spatial consultancy.',
    url: 'https://sondrdesigns.com/interior',
  },
};

export default function InteriorPage() {
  return <InteriorComingSoon />;
}
