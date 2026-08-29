import { ContactScreen } from '@/components/site/ContactScreen';

export const metadata = {
  title: 'Contact',
  description:
    'Start a project with Sondr Designs. Drop a note — we reply to everything. Studio hours Mon–Thu 10am–6pm, Honolulu, Hawaii.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Sondr Designs',
    description: 'Start a project with Sondr Designs. Drop a note — we reply to everything.',
    url: 'https://sondrdesigns.com/contact',
  },
};

export default function ContactPage() {
  return <ContactScreen />;
}
