'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { laptops as staticLaptops, accessories as staticAccessories } from '@/lib/data';
import { ArrowRight, CheckCircle, Wrench, Laptop, Globe, Cpu, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AccessoryCard } from '@/components/accessories/accessory-card';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';

export default function Home() {
  const db = useFirestore();
  const shopHeroImage = PlaceHolderImages.find(img => img.id === 'shop-hero');

  // Unified real-time query for all products
  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(
      collection(db, 'products'), 
      orderBy('createdAt', 'desc'), 
      limit(20)
    );
  }, [db]);

  const { data: allLiveProducts, loading } = useCollection(productsQuery);

  // In-memory filtering to avoid manual Firestore indexing requirements
  const featuredLaptops = useMemo(() => {
    const live = allLiveProducts?.filter(p => p.type === 'laptop').slice(0, 4);
    return (live && live.length > 0) ? live : staticLaptops.slice(0, 4);
  }, [allLiveProducts]);

  const featuredAccessories = useMemo(() => {
    const live = allLiveProducts?.filter(p => p.type === 'accessory').slice(0, 4);
    return (live && live.length > 0) ? live : staticAccessories.slice(0, 4);
  }, [allLiveProducts]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-primary/5 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-zinc-900 border-2 border-primary/20">
                Premium Tech Hub
              </div>
              <h1 className="font-headline text-4xl font-black tracking-tighter text-black md:text-5xl lg:text-7xl leading-[0.9]">
                Nairobi's Ultimate <span className="text-primary">Digital Future</span> starts at Benace.
              </h1>
              <p className="text-xl font-medium text-zinc-600 leading-relaxed max-w-xl">
                Experience world-class hardware, expert repairs, and custom software solutions designed for excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Laptop, text: 'Quality Laptops' },
                  { icon: Wrench, text: 'Expert Repairs' },
                  { icon: Globe, text: 'Web Design' },
                  { icon: Cpu, text: 'Tech Spares' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 font-bold text-sm text-black">
                    <div className="bg-black p-1 rounded-sm">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button asChild size="lg" className="h-14 bg-black px-8 font-black uppercase tracking-widest text-white border-2 border-black hover:bg-primary hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,186,242,1)] transition-all">
                  <Link href="/laptops">Shop Collection</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 border-2 border-black px-8 font-black uppercase tracking-widest hover:bg-zinc-100">
                  <Link href="/services">Our Hub</Link>
                </Button>
              </div>
            </div>

            <div className="relative group animate-in fade-in slide-in-from-right duration-700">
              <div className="absolute -inset-4 rounded-2xl bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all"></div>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-4 border-black bg-zinc-100 shadow-[12px_12px_0px_0px_rgba(0,186,242,1)]">
                {shopHeroImage && (
                  <Image
                    src={shopHeroImage.imageUrl}
                    alt="Benace Tech Hub"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl font-black tracking-tight text-black sm:text-5xl uppercase italic">
                Live <span className="text-primary">Inventory</span>
              </h2>
              <p className="mt-4 text-lg font-medium text-zinc-600">
                Explore our latest arrivals, synced in real-time from our Nairobi hub.
              </p>
            </div>
            <Button asChild variant="ghost" className="font-black uppercase tracking-widest text-primary hover:bg-primary/10">
              <Link href="/laptops">
                Browse Full Catalog <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Stats */}
      <section className="bg-black py-20 text-white relative">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tighter sm:text-6xl mb-6">
                BUILT FOR <span className="text-primary">SPEED.</span><br/>
                TRUSTED BY <span className="text-primary">THOUSANDS.</span>
              </h2>
              <p className="text-xl text-zinc-400 font-medium mb-8">
                The most reliable tech partner in the region. Real people, real solutions, real fast.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Repairs', count: '1k+', desc: 'Happy Clients' },
                { label: 'Projects', count: '100+', desc: 'Live Designs' },
                { label: 'Stock', count: '250+', desc: 'Units Ready' },
                { label: 'Uptime', count: '100%', desc: 'Cloud Sync' }
              ].map((stat, i) => (
                <div key={i} className="border-2 border-zinc-800 p-6 rounded-xl bg-zinc-900/50 backdrop-blur-sm">
                  <p className="text-3xl font-black text-primary mb-1">{stat.count}</p>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
                  <p className="text-[10px] font-bold text-zinc-600 mt-2">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}