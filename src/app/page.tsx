'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { 
  MessageCircle, 
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Award,
  BadgeCheck,
  PackageSearch
} from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import Image from 'next/image';
import { laptops as staticLaptops } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const db = useFirestore();

  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), limit(100));
  }, [db]);

  const { data: dbProducts, loading } = useCollection(productsQuery);

  const allLiveProducts = useMemo(() => {
    if (dbProducts && dbProducts.length > 0) return dbProducts;
    return staticLaptops.map(l => ({ ...l, type: 'laptop' as const }));
  }, [dbProducts]);

  const featuredLaptops = useMemo(() => {
    return allLiveProducts.filter(p => p.type === 'laptop');
  }, [allLiveProducts]);

  const categories = [
    { name: 'Laptops', img: PlaceHolderImages.find(p => p.id === 'laptop-hp-830-g8-1')?.imageUrl || '' },
    { name: 'Monitors', img: PlaceHolderImages.find(p => p.id === 'laptop-dell-pro-14-1')?.imageUrl || '' },
    { name: 'Printers', img: PlaceHolderImages.find(p => p.id === 'printer-placeholder')?.imageUrl || '' },
    { name: 'Accessories', img: PlaceHolderImages.find(p => p.id === 'accessory-dell-mouse-1')?.imageUrl || '' },
    { name: 'Repair Tools', img: PlaceHolderImages.find(p => p.id === 'laptop-hp-dragonfly-1')?.imageUrl || '' },
    { name: 'Networking', img: PlaceHolderImages.find(p => p.id === 'laptop-lenovo-thinkbook-14-irl-1')?.imageUrl || '' },
    { name: 'Storage', img: PlaceHolderImages.find(p => p.id === 'laptop-hp-840-g8-2')?.imageUrl || '' },
    { name: 'POS Systems', img: PlaceHolderImages.find(p => p.id === 'pos-system-hero')?.imageUrl || '' },
  ];

  const posImage = PlaceHolderImages.find(p => p.id === 'pos-system-hero');

  return (
    <div className="flex flex-col gap-0 bg-[#f4f4f4] overflow-x-hidden min-h-screen">
      <section className="bg-white border-b py-3">
        <div className="w-full px-2 grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { icon: Truck, label: 'Free Shipping', desc: 'Over KES 50k' },
            { icon: RotateCcw, label: 'Easy Returns', desc: '30-day policy' },
            { icon: ShieldCheck, label: 'Secure Payment', desc: '100% safe' },
            { icon: Headphones, label: 'Live Support', desc: "We're here" },
            { icon: Award, label: 'Top Benefits', desc: 'Exclusive deals' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <item.icon className="h-3 w-3 text-[#0070ba]" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-black leading-none">{item.label}</span>
                <span className="text-[7px] text-zinc-400 font-medium leading-none mt-0.5">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6 bg-white border-b">
        <div className="w-full px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-tight">Shop by Department</h2>
            <Link href="/laptops" className="text-[8px] font-black text-[#0070ba] hover:underline uppercase">View all</Link>
          </div>
          <div className="flex items-start gap-4 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-zinc-50 border border-zinc-100 group-hover:border-[#0070ba] transition-all">
                  <Image src={cat.img} alt={cat.name} width={56} height={56} className="object-cover" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-tight group-hover:text-[#0070ba] transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 w-full min-h-[40vh]">
        <div className="w-full">
          <div className="px-4 flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-tight">Today's Top Deals</h2>
            <Link href="/laptops" className="text-[8px] font-black text-[#0070ba] hover:underline uppercase">View all</Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full border-t border-l border-zinc-200 min-h-[300px]">
            {loading && dbProducts === null ? (
               <>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square w-full animate-pulse bg-white border-r border-b border-zinc-200"></div>
                  ))}
               </>
            ) : featuredLaptops.length > 0 ? (
              <>
                  {featuredLaptops.map(laptop => (
                    <div key={laptop.id} className="border-r border-b border-zinc-200 bg-white">
                      <LaptopCard laptop={laptop} variant="deal" />
                    </div>
                  ))}
              </>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white border-r border-b border-zinc-200">
                <PackageSearch className="h-10 w-10 text-zinc-200 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Inventory Coming Soon</p>
                <p className="text-[8px] font-bold text-zinc-300 uppercase mt-1">We are currently updating our catalog</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 bg-black text-white overflow-hidden relative">
        <div className="w-full px-6 flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1 space-y-4 z-10">
              <div className="inline-block bg-[#0070ba] px-2 py-0.5 text-[7px] font-black uppercase text-white">New Solution</div>
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Smart <br />POS Systems</h2>
              <p className="text-[10px] font-bold text-zinc-400 max-w-sm leading-tight">
                Setup your retail shop today. Manage stock, sales, and money with ease across Kenya.
              </p>
              <Button asChild className="h-9 rounded-none bg-[#0070ba] text-white font-black uppercase text-[8px] tracking-widest px-8 border border-[#0070ba] hover:bg-white hover:text-[#0070ba] transition-all">
                <Link href="/services">Setup Now</Link>
              </Button>
           </div>
           <div className="flex-1 relative h-48 w-full md:h-64">
              {posImage && (
                <Image 
                  src={posImage.imageUrl} 
                  alt={posImage.description} 
                  fill 
                  className="object-cover rounded-2xl" 
                  data-ai-hint={posImage.imageHint}
                />
              )}
           </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-[100]">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
