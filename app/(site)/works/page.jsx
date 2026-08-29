import { WorksScreen } from '@/components/site/WorksScreen';

export const metadata = {
  title: 'Works',
  description:
    'The full works library — every site, brand, and project we\'ve built, filed by hand. 7 projects and counting.',
  alternates: { canonical: '/works' },
  openGraph: {
    title: 'Works | Sondr Designs',
    description: 'Every site and brand project we\'ve built, filed by hand.',
    url: 'https://sondrdesigns.com/works',
  },
};

export default function WorksPage() {
  return <WorksScreen />;
}
