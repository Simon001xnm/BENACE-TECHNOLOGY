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
    { name: 'Laptop Hire', href: '/laptop-hire' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b-4 border-black",
        scrolled 
          ? "bg-white py-2 shadow-neo" 
          : "bg-white py-4"
      )}
    >
      <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="relative mr-8 group">
          <Image
            src="/use.png"
            alt="Benace Technologies Logo"
            width={140}
            height={36}
            priority
            className="object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-black uppercase tracking-widest text-black hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <CartSheet>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative h-12 w-12 border-2 border-black bg-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-none border-2 border-black bg-primary text-[10px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </CartSheet>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-12 w-12 border-2 border-black shadow-neo">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm p-0 border-l-4 border-black">
                <SheetHeader className="p-8 border-b-4 border-black bg-zinc-50">
                  <SheetTitle className="text-left font-black text-2xl uppercase tracking-tighter">
                    Benace Hub
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-8 gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center justify-between"
                    >
                      {link.name}
                      <ArrowUpRight className="h-6 w-6 opacity-30" />
                    </Link>
                  ))}
                  <div className="mt-8 pt-8 border-t-4 border-black">
                    <Button asChild className="w-full h-16 rounded-none border-2 border-black bg-black text-white font-black uppercase tracking-widest hover:bg-primary transition-all shadow-neo">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Talk to Us</Link>
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
