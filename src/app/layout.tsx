import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const salonName = process.env.NEXT_PUBLIC_SALON_NAME || 'hair2000';

export const metadata: Metadata = {
  title: `${salonName} — Try Your Next Hairstyle Before You Book`,
  description:
    'Upload a selfie, preview your new look with AI, and book a stylist consultation at our premium salon. Transform your hair with confidence.',
  keywords: [
    'AI hairstyle preview',
    'salon booking',
    'hair transformation',
    'hairstyle preview',
    salonName,
    'hair consultation',
  ],
  openGraph: {
    title: `${salonName} — Try Your Next Hairstyle Before You Book`,
    description:
      'Upload a selfie, preview your new look with AI, and book a stylist consultation with confidence.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${salonName} — AI Hair Preview`,
    description: 'Try your next hairstyle before you book. Upload a selfie and see your transformation.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1814',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
