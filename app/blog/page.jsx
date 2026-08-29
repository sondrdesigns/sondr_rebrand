import { BlogScreen } from '@/components/site/BlogScreen';

export const metadata = {
  title: 'Blog',
  description:
    'The Sondr notebook — notes on process, type, and the small decisions that make a site feel like a person. First entries landing soon.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Sondr Designs',
    description: 'Notes on process, type, and the small decisions that make a site feel like a person.',
    url: 'https://sondrdesigns.com/blog',
  },
};

export default function BlogPage() {
  return <BlogScreen />;
}
