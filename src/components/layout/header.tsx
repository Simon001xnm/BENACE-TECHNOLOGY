'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, ArrowUpRight } from 'lucide-react';
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
    { name: 'Web Design', href: '/services' },
    { name: 'Hire', href: '/laptop-hire' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled 
          ? "bg-white/80 backdrop-blur-2xl py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="relative transition-transform hover:scale-105 active:scale-95">
            <Image
              src="/use.png"
              alt="Benace Technologies Logo"
              width={160}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav - Pill Style */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex bg-zinc-100/50 p-1.5 rounded-full border border-black/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black transition-all rounded-full hover:bg-black hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <Link
             href="/contact"
             className="ml-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest bg-primary text-white rounded-full hover:bg-black transition-all flex items-center gap-2"
          >
            Contact <ArrowUpRight className="h-3 w-3" />
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <CartSheet>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative h-12 w-12 rounded-2xl border-2 border-black bg-white shadow-none transition-all hover:bg-primary hover:text-white active:scale-90"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-black text-white border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </CartSheet>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-2 border-black bg-white active:scale-90">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm border-l-4 border-black p-0">
                <SheetHeader className="p-8 border-b-2 border-black bg-zinc-50">
                  <SheetTitle className="text-left font-black uppercase tracking-tighter text-4xl">
                    Benace <span className="text-primary">Hub</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-8 gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  ))}
                  <div className="mt-10 pt-10 border-t-2 border-zinc-100">
                    <Button asChild className="w-full h-16 rounded-3xl bg-black font-black uppercase text-lg neo-shadow-primary">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
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
