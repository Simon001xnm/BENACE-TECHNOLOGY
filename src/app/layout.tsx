import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/lib/cart-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PublicLayoutWrapper } from '@/components/layout/public-layout-wrapper';

export const metadata: Metadata = {
  title: 'Benace Tech Hub',
  description: 'Laptop Ecommerce and Web Design Services',
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
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
