import { StudioScreen } from '@/components/site/StudioScreen';

export const metadata = {
  title: 'Studio',
  description:
    'Three people based in Honolulu, Hawaii — a small studio on purpose. We share drafts, argue about kerning, and build things that last.',
  alternates: { canonical: '/studio' },
  openGraph: {
    title: 'Studio | Sondr Designs',
    description: 'Three people based in Honolulu, Hawaii — a small studio on purpose.',
    url: 'https://sondrdesigns.com/studio',
  },
};

export default function StudioPage() {
  return <StudioScreen />;
}
