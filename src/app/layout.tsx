import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/lib/cart-context';
import { CompareProvider } from '@/lib/compare-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PublicLayoutWrapper } from '@/components/layout/public-layout-wrapper';

export const metadata: Metadata = {
  title: 'Benace Tech Hub | Best Laptops & Repair Shop in Nairobi CBD',
  description: 'Shop for high-quality laptops and accessories in Nairobi. We offer fast computer repairs, professional website design, and point of sale setup. Visit us at Old Nation House.',
  keywords: 'Laptops for sale Nairobi, Computer repair Nairobi CBD, Website design Kenya, HP Laptops Kenya, Dell Laptops Nairobi, Laptop hire Nairobi, POS system setup Kenya',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Benace Tech Hub | Laptops & Technical Gear Nairobi',
    description: 'Quality laptops, expert repairs, and digital solutions in the heart of Nairobi.',
    url: 'https://benacetechhub.com',
    siteName: 'Benace Tech Hub',
    locale: 'en_KE',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0070ba',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#f8f9fa] text-foreground" suppressHydrationWarning>
        <FirebaseClientProvider>
          <CartProvider>
            <CompareProvider>
              <PublicLayoutWrapper>
                {children}
              </PublicLayoutWrapper>
              <Toaster />
            </CompareProvider>
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
