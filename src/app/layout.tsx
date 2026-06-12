import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/lib/cart-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PublicLayoutWrapper } from '@/components/layout/public-layout-wrapper';

export const metadata: Metadata = {
  title: 'Benace Tech Hub | Premium Laptops & Digital Solutions Nairobi',
  description: 'Nairobi\'s #1 destination for high-performance laptops, professional hardware repairs, and custom web design. Trusted tech partner in Kenya.',
  keywords: 'Laptops Nairobi, Laptop Repair Kenya, Web Design Nairobi, Benace Tech, Ex-UK Laptops, HP Laptops Nairobi, Dell Laptops Kenya',
  openGraph: {
    title: 'Benace Tech Hub',
    description: 'Nairobi\'s Ultimate Digital Future. Shop Premium Laptops.',
    url: 'https://benacetechnologies.co.ke',
    siteName: 'Benace Tech Hub',
    locale: 'en_KE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0088cc',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning>
        <FirebaseClientProvider>
          <CartProvider>
            <PublicLayoutWrapper>
              {children}
            </PublicLayoutWrapper>
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
