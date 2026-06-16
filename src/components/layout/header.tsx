'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, ArrowUpRight, X } from 'lucide-react';
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
    { name: 'Laptop Hire', href: '/laptop-hire' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/95 py-2 backdrop-blur-md shadow-sm" 
          : "bg-white py-4"
      )}
    >
      <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="relative mr-10 group shrink-0">
          <Image
            src="/use.png"
            alt="Benace Technologies Logo"
            width={120}
            height={32}
            priority
            className="object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <CartSheet>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-10 w-10 rounded-full bg-zinc-50 hover:bg-zinc-100 transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </CartSheet>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-zinc-50">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col">
                <SheetHeader className="p-6 border-b bg-white flex flex-row items-center justify-between">
                  <SheetTitle className="text-left font-black text-xl uppercase tracking-tight">
                    Benace Hub
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow flex flex-col p-8 gap-8 overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-black uppercase tracking-tight hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-6 w-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                  ))}
                  <div className="mt-auto pt-8 border-t space-y-4">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Available 24/7</p>
                    <Button asChild className="w-full h-16 rounded-2xl bg-black text-white font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-xl">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Talk to Us Now</Link>
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
