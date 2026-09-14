'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/cart/cart-sheet';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

export function Header() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topNavLinks = [
    { name: "Laptops", href: '/laptops' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Repairs', href: '/repairs' },
    { name: 'Laptop Hire', href: '/laptop-hire' },
    { name: 'Services', href: '/services' },
  ];

  return (
    <header className="w-full flex flex-col sticky top-0 z-50 shadow-md transition-all">
      {/* Top Primary Nav - PayPal Blue */}
      <div className="bg-[#0070ba] text-white py-2 px-4 md:px-6 flex items-center gap-4 md:gap-8 h-16">
        <Link href="/" className="shrink-0 pt-1">
          <Image
            src="/logo.jpeg"
            alt="Matesh Technologies"
            width={120}
            height={40}
            priority
            className="rounded-sm"
          />
        </Link>

        <div className="hidden xl:flex flex-col text-[10px] leading-tight">
          <span className="text-white/70 uppercase font-black tracking-widest">Deliver to</span>
          <div className="flex items-center font-black uppercase tracking-widest text-white">
            <MapPin className="h-3 w-3 mr-1" /> Kenya & E.A
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex h-10 overflow-hidden rounded-md max-w-2xl mx-auto ring-1 ring-white/20">
          <div className="hidden md:flex items-center bg-white text-zinc-600 px-4 border-r text-[9px] font-black uppercase tracking-widest cursor-pointer hover:bg-zinc-50 transition-colors">
            All <ChevronDown className="h-2 w-2 ml-1" />
          </div>
          <Input 
            className="flex-grow border-none rounded-none focus-visible:ring-0 text-black h-full text-[10px] font-bold uppercase tracking-wide px-4 bg-white"
            placeholder="Search for laptops, components and more..."
          />
          <Button className="bg-[#003087] hover:bg-[#002566] rounded-none h-full px-6 border-l border-white/10">
            <Search className="h-4 w-4 text-white" />
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[10px]">
          <CartSheet>
            <div className="relative flex items-center font-black uppercase tracking-widest cursor-pointer group">
              <div className="relative">
                <ShoppingCart className="h-7 w-7 text-white" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#0070ba] border-2 border-[#0070ba]">
                  {cartCount}
                </span>
              </div>
              <span className="ml-3 group-hover:text-white/80 transition-colors text-[10px] text-white">Cart</span>
            </div>
          </CartSheet>
        </div>

        <Button variant="ghost" className="lg:hidden text-white p-0">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Secondary Nav Bar - Deep PayPal Blue */}
      <div className="bg-[#003087] text-white text-[10px] font-black uppercase tracking-widest px-4 md:px-6 h-9 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-6 h-full overflow-x-auto no-scrollbar">
          <Button variant="ghost" className="text-white hover:bg-white/10 h-full rounded-none flex items-center px-4 text-[10px] font-black uppercase tracking-widest">
            <Menu className="h-4 w-4 mr-2" /> All
          </Button>
          {topNavLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="whitespace-nowrap hover:text-white/80 transition-colors py-2 px-1 border-b-2 border-transparent hover:border-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
           <span className="text-[9px] font-black uppercase tracking-widest text-white/80 animate-pulse">Hub Live</span>
        </div>
      </div>
    </header>
  );
}
