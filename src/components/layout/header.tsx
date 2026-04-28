'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/cart/cart-sheet';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';

export function Header() {
  const { cartCount } = useCart();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/use.png"
            alt="Benace Technologies Logo"
            width={180}
            height={45}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/laptops"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Laptops
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Services
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
