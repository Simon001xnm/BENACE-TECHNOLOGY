'use client';

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/cart/cart-sheet';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';

export function Header() {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Laptops', href: '/laptops' },
    { name: 'Desktops & Monitors', href: '/desktops' },
    { name: 'Repairs', href: '/repairs' },
    { name: 'Laptop Hire', href: '/laptop-hire' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/use.png"
              alt="Benace Technologies Logo"
              width={140}
              height={35}
              priority
              className="object-contain"
            />
          </Link>

          <CartSheet>
            <Button variant="ghost" size="icon" className="relative text-black hover:bg-primary/10">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </CartSheet>
        </div>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wide text-black transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold uppercase tracking-wide hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
