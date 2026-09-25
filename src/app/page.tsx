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
  PackageSearch
} from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import Image from 'next/image';
import { laptops as staticLaptops } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeroSlider } from '@/components/home/hero-slider';

export default function Home() {
  const db = useFirestore();

  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), limit(100));
  }, [db]);

  const { data: dbProducts, loading } = useCollection(productsQuery);

  const allLiveProducts = useMemo(() => {
    const liveItems = dbProducts || [];
    if (liveItems.length > 0) return liveItems;
    return staticLaptops.map(l => ({ ...l, type: 'laptop' as const }));
  }, [dbProducts]);

  const featuredLaptops = useMemo(() => {
    return allLiveProducts.filter(p => p.type === 'laptop');
  }, [allLiveProducts]);

  // Guaranteed image mappings matching verified registry records to prevent blank paths
  const categories = [
    { name: 'Laptops', img: PlaceHolderImages.find(p => p.id === 'lenovo-thinkbook-14-g6-webp')?.imageUrl || '/0iqgqn78il76mvlr74kjcfbdyvmxew672970.webp' },
    { name: 'Monitors', img: PlaceHolderImages.find(p => p.id === 'hero-1')?.imageUrl || '/FB_IMG_1753445965146.jpg' },
    { name: 'Printers', img: PlaceHolderImages.find(p => p.id === 'printer-placeholder')?.imageUrl || 'https://picsum.photos/seed/printer/600/400' },
    { name: 'Accessories', img: PlaceHolderImages.find(p => p.id === 'accessory-dell-mouse-1')?.imageUrl || '/FB_IMG_1753354619216.jpg' },
    { name: 'Repair Tools', img: PlaceHolderImages.find(p => p.id === 'hero-1')?.imageUrl || '/FB_IMG_1753445965146.jpg' },
    { name: 'Networking', img: PlaceHolderImages.find(p => p.id === 'cart-item-placeholder')?.imageUrl || '/FB_IMG_1753445965146.jpg' },
    { name: 'Storage', img: PlaceHolderImages.find(p => p.id === 'shop-hero')?.imageUrl || '/FB_IMG_1753445965146.jpg' },
    { name: 'POS Systems', img: PlaceHolderImages.find(p => p.id === 'pos-system-hero')?.imageUrl || '/3da4051a8a4c87af701f96948c2ceec7.jpg' },
  ];

  const posImage = PlaceHolderImages.find(p => p.id === 'pos-system-hero');

  return (
    <div className="flex flex-col gap-0 bg-[#f4f4f4] overflow-x-hidden min-h-screen">
      {/* Top Banner Benefits */}
      <section className="bg-white border-b py-3">
        <div className="w-full px-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Truck, label: 'Free Shipping', desc: 'Orders Over KES 50,000' },
            { icon: RotateCcw, label: 'Verified Quality', desc: '1 Year Warranty' },
            { icon: ShieldCheck, label: 'Secure Hub', desc: 'Certified Technical Support' },
            { icon: Headphones, label: 'Expert Advice', desc: 'Talk to a Technician' },
            { icon: Award, label: 'Top Brands', desc: 'Lenovo, HP, Dell & More' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-[#0070ba]" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-black leading-none">{item.label}</span>
                <span className="text-[7px] text-zinc-400 font-bold leading-none mt-1">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Impact Hero */}
      <HeroSlider />

      {/* Shop By Department Slider */}
      <section className="py-8 bg-white border-b">
        <div className="w-full px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black uppercase tracking-tight">Shop Technical Categories</h2>
            <Link href="/laptops" className="text-[8px] font-black text-[#0070ba] hover:underline uppercase tracking-widest">Explore Full Inventory</Link>
          </div>
          <div className="flex items-start gap-6 overflow-x-auto no-scrollbar pb-4">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                <div className="h-20 w-20 rounded-2xl overflow-hidden bg-zinc-50 border-2 border-zinc-100 group-hover:border-[#0070ba] transition-all duration-300 shadow-sm">
                  <Image src={cat.img} alt={cat.name} width={80} height={80} className="object-cover transition-transform group-hover:scale-110" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-[#0070ba] transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Top Deals Grid */}
      <section className="py-6 w-full min-h-[50vh]">
        <div className="w-full">
          <div className="px-6 flex items-center justify-between mb-6">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-black uppercase tracking-tighter">Premium Stock Arrivals</h2>
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Verified Units</span>
            </div>
            <Link href="/laptops" className="text-[8px] font-black text-[#0070ba] hover:underline uppercase tracking-widest">View All Deals</Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full border-t border-l border-zinc-200 bg-white">
            {loading && dbProducts === null ? (
               <>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square w-full animate-pulse bg-zinc-50 border-r border-b border-zinc-200"></div>
                  ))}
               </>
            ) : featuredLaptops.length > 0 ? (
              <>
                  {featuredLaptops.map(laptop => (
                    <div key={laptop.id} className="border-r border-b border-zinc-200">
                      <LaptopCard laptop={laptop} variant="deal" />
                    </div>
                  ))}
              </>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white border-r border-b border-zinc-200">
                <PackageSearch className="h-12 w-12 text-zinc-200 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Updating Technical Registry</p>
                <p className="text-[8px] font-bold text-zinc-300 uppercase mt-2">New high-spec units arriving daily</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* POS Systems Professional Section */}
      <section className="py-16 bg-[#003087] text-white overflow-hidden relative">
        <div className="w-full px-8 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 space-y-6 z-10">
              <div className="inline-block bg-[#0070ba] px-3 py-1 text-[8px] font-black uppercase text-white tracking-[0.2em]">Official Solutions</div>
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Smart <br />Retail POS Hub</h2>
              <p className="text-xs font-bold text-white/70 max-w-sm leading-relaxed">
                Empower your business with high-performance Point of Sale systems. We handle setup, stock management integration, and full support across Nairobi and Kenya.
              </p>
              <Button asChild className="h-12 rounded-none bg-white text-[#003087] font-black uppercase text-[9px] tracking-widest px-10 border-2 border-white hover:bg-[#0070ba] hover:text-white transition-all shadow-xl">
                <Link href="/services">Request Installation</Link>
              </Button>
           </div>
           <div className="flex-1 relative h-64 w-full md:h-80">
              {posImage && (
                <Image 
                  src={posImage.imageUrl} 
                  alt={posImage.description} 
                  fill 
                  className="object-cover rounded-3xl border-4 border-white/10 shadow-2xl" 
                  data-ai-hint={posImage.imageHint}
                />
              )}
           </div>
        </div>
      </section>

      {/* WhatsApp Floating CTA */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute right-full mr-4 bg-black text-white text-[8px] font-black uppercase px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest shadow-xl">
            Chat with an Expert
          </span>
        </Link>
      </div>
    </div>
  );
}
