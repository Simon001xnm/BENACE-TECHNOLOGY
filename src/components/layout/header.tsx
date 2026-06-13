'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/cart/cart-sheet';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Laptops', href: '/laptops' },
    { name: 'Repairs', href: '/repairs' },
    { name: 'Services', href: '/services' },
    { name: 'Accessories', href: '/accessories' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-md py-3 shadow-sm" 
          : "bg-white py-5"
      )}
    >
      <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="relative mr-8">
          <Image
            src="/use.png"
            alt="Benace Technologies Logo"
            width={140}
            height={36}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <CartSheet>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative rounded-full h-11 w-11 bg-zinc-50 hover:bg-zinc-100"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </CartSheet>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-zinc-50">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm p-0">
                <SheetHeader className="p-8 border-b">
                  <SheetTitle className="text-left font-bold text-2xl">
                    Benace Hub
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-8 gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-bold hover:text-primary transition-colors flex items-center justify-between"
                    >
                      {link.name}
                      <ArrowUpRight className="h-5 w-5 opacity-50" />
                    </Link>
                  ))}
                  <div className="mt-8 pt-8 border-t">
                    <Button asChild className="w-full h-14 rounded-full font-bold">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Get in Touch</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
