import './globals.css';
import { SiteFrame } from '@/components/site/SiteFrame';

export const metadata = {
  title: 'Sondr Designs',
  description: 'A design studio for web, brand, and interiors.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
