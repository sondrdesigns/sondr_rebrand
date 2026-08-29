import './globals.css';
import { SiteFrame } from '@/components/site/SiteFrame';

const SITE_URL = 'https://sondrdesigns.com';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sondr Designs — Web, Brand & Interiors',
    template: '%s | Sondr Designs',
  },
  description:
    'Sondr is a small design studio based in Honolulu, Hawaii. We craft bespoke websites, brand identities, and interior pieces — hand-built, paper-first.',
  keywords: ['web design', 'brand identity', 'interior design', 'honolulu', 'hawaii', 'design studio'],
  authors: [{ name: 'Sondr Designs', url: SITE_URL }],
  creator: 'Sondr Designs',
  publisher: 'Sondr Designs',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Sondr Designs',
    title: 'Sondr Designs — Web, Brand & Interiors',
    description:
      'A small design studio based in Honolulu, Hawaii. Bespoke websites, brand identities, and interior pieces — hand-built, paper-first.',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sondr Designs — Web, Brand & Interiors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sondr Designs — Web, Brand & Interiors',
    description:
      'A small design studio based in Honolulu, Hawaii. Bespoke websites, brand identities, and interior pieces.',
    images: ['/assets/og-image.png'],
  },
  icons: {
    icon: '/assets/sondr-icon-logo.png',
    shortcut: '/assets/sondr-icon-logo.png',
    apple: '/assets/sondr-icon-logo.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Sondr Designs',
      description: 'Web, brand & interior design studio based in Honolulu, Hawaii.',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Sondr Designs',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/sondr-icon-logo.png`,
      image: `${SITE_URL}/assets/og-image.png`,
      description: 'Bespoke web design, brand identity, and interior design studio based in Honolulu, Hawaii.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Honolulu',
        addressRegion: 'HI',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'studio@sondrdesigns.com',
        contactType: 'customer service',
      },
      sameAs: ['https://www.instagram.com/sondr.designs'],
      priceRange: '$$',
      openingHours: 'Mo-Th 10:00-18:00',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
