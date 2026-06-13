import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/lib/cart-context';
import { CompareProvider } from '@/lib/compare-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PublicLayoutWrapper } from '@/components/layout/public-layout-wrapper';

export const metadata: Metadata = {
  title: 'Benace Tech Hub | Laptops & Technical Gear Nairobi',
  description: 'Shop premium laptops, networking equipment, and professional accessories. Your trusted technology partner in Kenya.',
  keywords: 'Laptops Nairobi, HP Laptops, Dell Laptops, IT Equipment Kenya, Benace Tech Hub',
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d4ed8',
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
      <body className="font-body antialiased bg-[#f4f4f4] text-foreground" suppressHydrationWarning>
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
