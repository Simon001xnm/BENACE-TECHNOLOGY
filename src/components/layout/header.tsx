'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User, MapPin, ChevronDown, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/cart/cart-sheet';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topNavLinks = [
    { name: "Today's Deals", href: '#' },
    { name: 'Best Sellers', href: '/laptops' },
    { name: 'New Releases', href: '#' },
    { name: 'Customer Service', href: '/contact' },
    { name: 'Gift Cards', href: '#' },
  ];

  return (
    <header className="w-full flex flex-col">
      {/* Top Primary Nav */}
      <div className="bg-[#131921] text-white py-2 px-4 md:px-6 flex items-center gap-4 md:gap-8 h-16">
        <Link href="/" className="shrink-0 pt-1">
          <Image
            src="/use.png"
            alt="Benace Store"
            width={100}
            height={30}
            priority
            className="invert brightness-200"
          />
        </Link>

        <div className="hidden xl:flex flex-col text-[12px] leading-tight">
          <span className="text-zinc-400">Deliver to</span>
          <div className="flex items-center font-bold">
            <MapPin className="h-4 w-4 mr-1" /> Kenya & East Africa
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex h-10 overflow-hidden rounded-md">
          <div className="hidden md:flex items-center bg-[#f3f3f3] text-zinc-600 px-3 border-r text-xs font-medium cursor-pointer hover:bg-zinc-200 transition-colors">
            All <ChevronDown className="h-3 w-3 ml-1" />
          </div>
          <Input 
            className="flex-grow border-none rounded-none focus-visible:ring-0 text-black h-full"
            placeholder="Search for products, brands and more..."
          />
          <Button className="bg-primary hover:bg-primary/90 rounded-none h-full px-5">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[12px]">
          <Link href="/admin/login" className="flex flex-col group">
            <span className="text-zinc-400 group-hover:text-white transition-colors">Hello, Sign in</span>
            <span className="font-bold flex items-center group-hover:text-white">Account & Lists <ChevronDown className="h-3 w-3 ml-1" /></span>
          </Link>
          <Link href="/admin/orders" className="flex flex-col group">
            <span className="text-zinc-400 group-hover:text-white transition-colors">Returns</span>
            <span className="font-bold group-hover:text-white">& Orders</span>
          </Link>
          <CartSheet>
            <div className="relative flex items-end font-bold cursor-pointer group">
              <div className="relative">
                <ShoppingCart className="h-8 w-8 text-white" />
                <span className="absolute -top-1 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-black text-white">
                  {cartCount}
                </span>
              </div>
              <span className="ml-1 group-hover:text-primary transition-colors">Cart</span>
            </div>
          </CartSheet>
        </div>

        <Button variant="ghost" className="lg:hidden text-white p-0">
          <Menu className="h-7 w-7" />
        </Button>
      </div>

      {/* Secondary Nav Bar */}
      <div className="bg-[#232f3e] text-white text-[13px] font-medium px-4 md:px-6 h-10 flex items-center justify-between">
        <div className="flex items-center gap-6 h-full overflow-x-auto no-scrollbar">
          <Button variant="ghost" className="text-white hover:bg-white/10 h-full rounded-none flex items-center px-2">
            <Menu className="h-5 w-5 mr-1" /> All Categories
          </Button>
          {topNavLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="whitespace-nowrap hover:text-primary transition-colors py-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2">
           <Image src="https://picsum.photos/seed/promo/200/40" alt="Special Deals" width={100} height={20} className="rounded" />
        </div>
      </div>
    </header>
  );
}
