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
import { collection, query, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import Image from 'next/image';
import { laptops as staticLaptops } from '@/lib/data';

export default function Home() {
  const db = useFirestore();

  const productsQuery = useMemo(() => {
    if (!db) return null;
    // Removed orderBy to ensure data shows up immediately without manual index creation
    return query(
      collection(db, 'products'), 
      limit(24)
    );
  }, [db]);

  const { data: dbProducts, loading } = useCollection(productsQuery);

  // Smart fallback: Use database products if they exist, otherwise show static catalog
  const allLiveProducts = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) return dbProducts;
    return staticLaptops.map(l => ({ ...l, type: 'laptop' }));
  }, [dbProducts]);

  const featuredLaptops = useMemo(() => {
    return allLiveProducts.filter(p => p.type === 'laptop').slice(0, 12);
  }, [allLiveProducts]);

  const categories = [
    { name: 'Laptops', img: 'https://picsum.photos/seed/cat1/200/200' },
    { name: 'Monitors', img: 'https://picsum.photos/seed/cat2/200/200' },
    { name: 'Printers', img: 'https://picsum.photos/seed/cat3/200/200' },
    { name: 'Accessories', img: 'https://picsum.photos/seed/cat4/200/200' },
    { name: 'Repair Tools', img: 'https://picsum.photos/seed/cat5/200/200' },
    { name: 'Networking', img: 'https://picsum.photos/seed/cat6/200/200' },
    { name: 'Storage', img: 'https://picsum.photos/seed/cat7/200/200' },
    { name: 'POS Systems', img: 'https://picsum.photos/seed/cat8/200/200' },
  ];

  return (
    <div className="flex flex-col gap-0 bg-[#f4f4f4] overflow-x-hidden min-h-screen">
      {/* 1. Feature Bar (Light) */}
      <section className="bg-white border-b py-4">
        <div className="w-full px-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Truck, label: 'Free Shipping', desc: 'On orders over KES 50k' },
            { icon: RotateCcw, label: 'Easy Returns', desc: '30-day return policy' },
            { icon: ShieldCheck, label: 'Secure Payment', desc: '100% secure checkout' },
            { icon: Headphones, label: '24/7 Support', desc: "We're here to help" },
            { icon: Award, label: 'Prime Benefits', desc: 'Exclusive deals & more' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="p-1.5 bg-zinc-50 rounded-full border">
                <item.icon className="h-4 w-4 text-zinc-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-black leading-none">{item.label}</span>
                <span className="text-[8px] text-zinc-500 font-medium leading-none mt-0.5">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Shop by Category Circles */}
      <section className="py-8 bg-white border-b">
        <div className="w-full px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black uppercase tracking-tight">Shop by Department</h2>
            <Link href="/laptops" className="text-[10px] font-black text-primary hover:underline uppercase">View all</Link>
          </div>
          <div className="flex items-start gap-6 overflow-x-auto no-scrollbar pb-4">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div className="h-20 w-20 rounded-full overflow-hidden bg-zinc-50 border border-zinc-100 group-hover:border-primary transition-all">
                  <Image src={cat.img} alt={cat.name} width={80} height={80} className="object-cover" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-tight group-hover:text-primary transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Today's Best Deals Grid - FULL WIDTH */}
      <section className="py-8 w-full">
        <div className="w-full">
          <div className="px-4 flex items-center justify-between mb-6">
            <h2 className="text-lg font-black uppercase tracking-tight">Today's Best Deals</h2>
            <Link href="/laptops" className="text-[10px] font-black text-primary hover:underline uppercase">View all deals</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full border-t border-l border-zinc-200">
            {loading && dbProducts === null ? (
               <>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square w-full animate-pulse bg-white border-r border-b border-zinc-200"></div>
                  ))}
               </>
            ) : (
              <>
                  {featuredLaptops.map(laptop => (
                    <div key={laptop.id} className="border-r border-b border-zinc-200">
                      <LaptopCard laptop={laptop} variant="deal" />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. POS Service Highlight */}
      <section className="py-12 bg-black text-white overflow-hidden relative">
        <div className="w-full px-8 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 space-y-6 z-10">
              <div className="inline-block bg-primary px-3 py-1 text-[9px] font-black uppercase text-black">New Solution</div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Complete <br />POS Systems</h2>
              <p className="text-sm font-bold text-zinc-400 italic max-w-md">
                We setup point of sale systems for retail shops in Nairobi. Manage your stock, sales, and money with ease.
              </p>
              <Button asChild size="lg" className="h-12 bg-primary text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">
                <Link href="/services">Setup My Shop</Link>
              </Button>
           </div>
           <div className="flex-1 relative h-64 w-full md:h-80 opacity-50 md:opacity-100">
              <Image 
                src="https://picsum.photos/seed/pos/800/600" 
                alt="POS System" 
                fill 
                className="object-cover rounded-3xl grayscale" 
                data-ai-hint="pos system"
              />
           </div>
        </div>
      </section>

      {/* 5. Trust Bar (Dark) */}
      <section className="bg-[#232f3e] text-white py-12">
        <div className="w-full px-6 grid grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { icon: Award, label: 'Top Brands', desc: 'Trusted & loved by millions' },
            { icon: BadgeCheck, label: 'Great Prices', desc: 'Unbeatable prices every day' },
            { icon: Truck, label: 'Fast Delivery', desc: 'Quick delivery to your door' },
            { icon: ShieldCheck, label: '100% Original', desc: 'Authentic products you can trust' },
            { icon: RotateCcw, label: 'Hassle-free Returns', desc: 'Easy returns within 30 days' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <item.icon className="h-6 w-6 text-primary" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                <p className="text-[8px] text-zinc-400 font-medium uppercase">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating WhatsApp Action */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="h-7 w-7" />
        </Link>
      </div>
    </div>
  );
}
