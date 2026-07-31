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
    { name: 'Web Services', href: '/services' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Hire Laptops', href: '/laptop-hire' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/95 border-b py-2 backdrop-blur-md shadow-sm" 
          : "bg-[#f8f9fa] py-4"
      )}
    >
      <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="mr-10 group shrink-0">
          <Image
            src="/use.png"
            alt="Benace Tech Hub Nairobi"
            width={120}
            height={32}
            priority
            className="object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-primary transition-colors"
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
              className="relative h-10 w-10 rounded-xl bg-white hover:bg-zinc-50 transition-all border border-zinc-100"
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
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white border border-zinc-100">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col border-none">
                <SheetHeader className="p-6 border-b bg-white flex flex-row items-center justify-between">
                  <SheetTitle className="text-left font-black text-xl uppercase tracking-tighter">
                    Benace Hub
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow flex flex-col p-8 gap-8 bg-white overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-6 w-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                  ))}
                  <div className="mt-auto pt-8 border-t space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-sm font-bold">Old Nation House, 2nd Floor, Shop D1</p>
                    </div>
                    <Button asChild className="w-full h-16 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl">
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
