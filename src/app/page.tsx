
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { HeroSlider } from '@/components/home/hero-slider';
import { ArrowRight, Laptop, Wrench, Globe, Cpu, Loader2, DatabaseBackup, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
  const db = useFirestore();

  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(
      collection(db, 'products'), 
      orderBy('createdAt', 'desc'), 
      limit(8)
    );
  }, [db]);

  const { data: allLiveProducts, loading } = useCollection(productsQuery);

  const featuredLaptops = useMemo(() => {
    return allLiveProducts?.filter(p => p.type === 'laptop').slice(0, 4) || [];
  }, [allLiveProducts]);

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section - V1255 Dynamic Slider */}
      <section className="relative w-full overflow-hidden bg-black">
        <HeroSlider />
      </section>

      {/* Dynamic Inventory - High Gloss Design */}
      <section className="bg-zinc-50 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 mb-6">
                <Sparkles className="h-3 w-3" /> Live Inventory Sync
              </div>
              <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-black md:text-7xl italic leading-none">
                LATEST <span className="text-primary underline decoration-8">ARRIVALS</span>
              </h2>
              <p className="mt-6 text-xl font-bold text-zinc-400 uppercase tracking-widest">
                Synced globally from Nairobi CBD
              </p>
            </div>
            <Button asChild variant="ghost" className="h-14 rounded-full border-2 border-black px-8 font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Link href="/laptops" className="flex items-center">
                Full Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-[400px] w-full animate-pulse rounded-3xl bg-zinc-200 border-4 border-black"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
               <div className="mb-6 rounded-full bg-zinc-200 p-8">
                  <DatabaseBackup className="h-12 w-12 text-zinc-400" />
               </div>
               <h3 className="text-3xl font-black uppercase text-black">Inventory Empty</h3>
               <p className="mt-2 text-zinc-500 font-bold uppercase tracking-widest">Global refresh in progress...</p>
            </div>
          )}
        </div>
      </section>

      {/* Services Grid - Android Card Style */}
      <section className="bg-black py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            <div className="space-y-10">
              <h2 className="text-6xl font-black leading-tight tracking-tighter md:text-8xl">
                CRAFTED FOR <br/>
                <span className="text-primary italic">PERFORMANCE.</span>
              </h2>
              <p className="max-w-xl text-2xl font-medium text-zinc-400">
                Nairobi's most reliable technology partner. Delivering high-performance hardware and digital craftsmanship.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="h-16 rounded-full bg-primary font-black uppercase tracking-widest text-black hover:bg-white transition-all shadow-[8px_8px_0px_0px_rgba(0,186,242,1)]">
                  <Link href="/contact">Book a Session</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { label: 'REPAIRS', count: '1k+', icon: Wrench, color: 'bg-primary' },
                { label: 'WEBSITES', count: '100+', icon: Globe, color: 'bg-white' },
                { label: 'LATEST UNITS', count: '250+', icon: Laptop, color: 'bg-zinc-800' },
                { label: 'LATENCY', count: '0ms', icon: Cpu, color: 'bg-primary' }
              ].map((stat, i) => (
                <div key={i} className="group relative rounded-[2.5rem] border-4 border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-primary">
                  <div className={cn("mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg", stat.color)}>
                    <stat.icon className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-5xl font-black text-white mb-2">{stat.count}</p>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-primary transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
