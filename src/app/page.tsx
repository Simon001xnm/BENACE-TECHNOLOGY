'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { 
  MessageCircle, 
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Award,
  BadgeCheck
} from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import Image from 'next/image';

export default function Home() {
  const db = useFirestore();

  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(
      collection(db, 'products'), 
      orderBy('createdAt', 'desc'), 
      limit(24)
    );
  }, [db]);

  const { data: allLiveProducts, loading } = useCollection(productsQuery);

  const featuredLaptops = useMemo(() => {
    return allLiveProducts?.filter(p => p.type === 'laptop').slice(0, 6) || [];
  }, [allLiveProducts]);

  const categories = [
    { name: 'Electronics', img: 'https://picsum.photos/seed/cat1/200/200' },
    { name: 'Home & Kitchen', img: 'https://picsum.photos/seed/cat2/200/200' },
    { name: 'Fashion', img: 'https://picsum.photos/seed/cat3/200/200' },
    { name: 'Beauty', img: 'https://picsum.photos/seed/cat4/200/200' },
    { name: 'Sports', img: 'https://picsum.photos/seed/cat5/200/200' },
    { name: 'Toys & Games', img: 'https://picsum.photos/seed/cat6/200/200' },
    { name: 'Automotive', img: 'https://picsum.photos/seed/cat7/200/200' },
    { name: 'Pet Supplies', img: 'https://picsum.photos/seed/cat8/200/200' },
  ];

  return (
    <div className="flex flex-col gap-0 bg-[#f4f4f4] overflow-x-hidden min-h-screen">
      {/* 1. Feature Bar (Light) */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { icon: Truck, label: 'Free Shipping', desc: 'On orders over KES 50k' },
            { icon: RotateCcw, label: 'Easy Returns', desc: '30-day return policy' },
            { icon: ShieldCheck, label: 'Secure Payment', desc: '100% secure checkout' },
            { icon: Headphones, label: '24/7 Support', desc: "We're here to help" },
            { icon: Award, label: 'Prime Benefits', desc: 'Exclusive deals & more' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 rounded-full border">
                <item.icon className="h-5 w-5 text-zinc-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase text-black">{item.label}</span>
                <span className="text-[10px] text-zinc-500 font-medium">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Shop by Category Circles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight">Shop by Category</h2>
            <Link href="/laptops" className="text-xs font-bold text-primary hover:underline">View all</Link>
          </div>
          <div className="flex items-start gap-8 overflow-x-auto no-scrollbar pb-4">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-4 shrink-0 cursor-pointer group">
                <div className="h-28 w-28 rounded-full overflow-hidden bg-zinc-50 border-2 border-transparent group-hover:border-primary transition-all">
                  <Image src={cat.img} alt={cat.name} width={112} height={112} className="object-cover" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Today's Best Deals Grid */}
      <section className="py-12 w-full">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight">Today's Best Deals</h2>
            <Link href="/laptops" className="text-xs font-bold text-primary hover:underline">View all deals</Link>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] w-full animate-pulse bg-white rounded-lg border border-zinc-200"></div>
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {featuredLaptops.map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} variant="deal" />
                ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Promo Banners */}
      <section className="py-12 bg-[#f4f4f4]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border flex flex-col justify-between h-64 relative overflow-hidden group cursor-pointer">
             <div className="relative z-10">
               <h3 className="text-xl font-black uppercase tracking-tight">Up to 60% Off</h3>
               <p className="text-xs font-bold text-zinc-500 mt-1 uppercase">On Top Brands</p>
               <Button size="sm" className="mt-4 bg-black text-white text-[10px] uppercase font-black rounded px-4">Shop Now</Button>
             </div>
             <div className="absolute bottom-4 right-4 w-40 h-40 group-hover:scale-105 transition-transform">
                <Image src="https://picsum.photos/seed/promo1/300/300" alt="Promo 1" fill className="object-contain" />
             </div>
          </div>
          <div className="bg-white p-6 rounded-lg border flex flex-col justify-between h-64 relative overflow-hidden group cursor-pointer">
             <div className="relative z-10">
               <h3 className="text-xl font-black uppercase tracking-tight">Amazon Essentials</h3>
               <p className="text-xs font-bold text-zinc-500 mt-1 uppercase">Everyday must-haves</p>
               <Button size="sm" className="mt-4 bg-[#ffd814] text-black text-[10px] uppercase font-black rounded px-4 border border-[#e7af06]">Shop Item</Button>
             </div>
             <div className="absolute bottom-4 right-4 w-40 h-40 group-hover:scale-105 transition-transform">
                <Image src="https://picsum.photos/seed/promo2/300/300" alt="Promo 2" fill className="object-contain" />
             </div>
          </div>
          <div className="bg-white p-6 rounded-lg border flex flex-col justify-between h-64 relative overflow-hidden group cursor-pointer">
             <div className="relative z-10">
               <h3 className="text-xl font-black uppercase tracking-tight">Home Makeover</h3>
               <p className="text-xs font-bold text-zinc-500 mt-1 uppercase">Stylish finds for your space</p>
               <Button size="sm" className="mt-4 bg-black text-white text-[10px] uppercase font-black rounded px-4">Shop Now</Button>
             </div>
             <div className="absolute bottom-4 right-4 w-40 h-40 group-hover:scale-105 transition-transform">
                <Image src="https://picsum.photos/seed/promo3/300/300" alt="Promo 3" fill className="object-contain" />
             </div>
          </div>
        </div>
      </section>

      {/* 5. Trust Bar (Dark) */}
      <section className="bg-[#232f3e] text-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-5 gap-12">
          {[
            { icon: Award, label: 'Top Brands', desc: 'Trusted & loved by millions' },
            { icon: BadgeCheck, label: 'Great Prices', desc: 'Unbeatable prices every day' },
            { icon: Truck, label: 'Fast Delivery', desc: 'Quick delivery to your door' },
            { icon: ShieldCheck, label: '100% Original', desc: 'Authentic products you can trust' },
            { icon: RotateCcw, label: 'Hassle-free Returns', desc: 'Easy returns within 30 days' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <item.icon className="h-8 w-8 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest">{item.label}</p>
                <p className="text-[10px] text-zinc-400 font-medium uppercase">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating WhatsApp Action */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}