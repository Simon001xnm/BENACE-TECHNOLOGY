'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { ArrowRight, Laptop, Wrench, Globe, Cpu, Loader2, DatabaseBackup, Sparkles, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
  const db = useFirestore();
  const shopHeroImage = PlaceHolderImages.find(img => img.id === 'shop-hero');

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
      {/* Hero Section - Material Android Vibe */}
      <section className="relative w-full overflow-hidden bg-white px-4 pt-12 pb-20 md:px-6 md:pt-24 lg:pt-32">
        <div className="container relative mx-auto">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative z-10 flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-black uppercase tracking-widest text-primary border-2 border-primary/20">
                <Sparkles className="h-4 w-4" /> Version 1255 Excellence
              </div>
              
              <h1 className="font-headline text-6xl font-black leading-[1] tracking-tighter text-black md:text-8xl lg:text-[110px]">
                THE <span className="text-primary italic">FUTURE</span> <br/>
                OF TECH.
              </h1>
              
              <p className="max-w-xl text-xl font-medium leading-relaxed text-zinc-500 md:text-2xl">
                Experience Nairobi's most sophisticated digital hub. High-performance gear meets expert craftsmanship.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-16 rounded-full bg-black px-10 text-lg font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 neo-shadow-primary">
                  <Link href="/laptops">Explore Catalog</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-16 rounded-full border-4 border-black px-10 text-lg font-black uppercase tracking-widest transition-all hover:bg-zinc-50 active:scale-95">
                  <Link href="/services">Our Solutions</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                {['Official Warranty', '24/7 Support', 'Free Delivery'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-black uppercase tracking-tight text-zinc-400">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center animate-in fade-in zoom-in-90 duration-1000 delay-300">
              <div className="absolute -inset-10 animate-pulse rounded-full bg-primary/5 blur-3xl"></div>
              <div className="relative aspect-square w-full max-w-[600px] overflow-hidden rounded-[3rem] border-8 border-black bg-zinc-100 shadow-[24px_24px_0px_0px_rgba(0,136,204,1)] transition-transform duration-700 hover:rotate-2">
                {shopHeroImage && (
                  <Image
                    src={shopHeroImage.imageUrl}
                    alt="Benace Tech Hub"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                )}
                <div className="absolute bottom-10 right-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-white neo-shadow animate-bounce">
                  <Laptop className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Inventory - High Gloss Design */}
      <section className="bg-zinc-50 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-3xl">
              <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-black md:text-7xl italic leading-none">
                LATEST <span className="text-primary underline decoration-8">ARRIVALS</span>
              </h2>
              <p className="mt-6 text-xl font-bold text-zinc-400 uppercase tracking-widest">
                Synced globally from Nairobi CBD
              </p>
            </div>
            <Button asChild variant="ghost" className="h-14 rounded-full border-2 border-black px-8 font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
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
                <Button asChild size="lg" className="h-16 rounded-full bg-primary font-black uppercase tracking-widest text-black hover:bg-white transition-all">
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
