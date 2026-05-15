'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { GoogleMap } from './google-map';

/**
 * Conditionally renders the shop-wide UI elements (Header, Map, Footer).
 * These are hidden when the user is in the admin section to provide a clean workspace.
 */
export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="min-h-screen flex flex-col">{children}</main>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <GoogleMap />
      <Footer />
    </div>
  );
}
