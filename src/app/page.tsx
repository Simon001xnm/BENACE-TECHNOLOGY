'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { HeroSlider } from '@/components/home/hero-slider';
import { ArrowRight, Wrench, Globe, Laptop, DatabaseBackup } from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';

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
    <div className="flex flex-col gap-0 bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <HeroSlider />
      </section>

      {/* Featured Inventory - High Density Grid View */}
      <section className="bg-[#f8f9fa] py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-black sm:text-5xl italic">
                LATEST HARDWARE.
              </h2>
              <p className="mt-3 max-w-lg text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                Synced live from our Nairobi inventory hub.
              </p>
            </div>
            <Button asChild variant="outline" className="h-14 rounded-full border-2 border-black px-10 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl hover:shadow-none">
              <Link href="/laptops" className="flex items-center">
                Full Collection <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square w-full animate-pulse bg-zinc-200 rounded-3xl"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border-4 border-dashed border-zinc-200 rounded-[3rem]">
               <DatabaseBackup className="mb-6 h-12 w-12 text-zinc-200" />
               <h3 className="text-xl font-black uppercase text-zinc-900">Inventory Syncing</h3>
               <p className="mt-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">Checking for fresh arrivals...</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Services */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              { 
                title: 'Expert Repairs', 
                desc: 'Nairobi\'s most reliable technical support for all hardware brands. Precision diagnostics and fast turnaround.', 
                icon: Wrench, 
                link: '/repairs' 
              },
              { 
                title: 'Digital Solutions', 
                desc: 'Custom web development and software architecture for brands seeking a competitive digital edge.', 
                icon: Globe, 
                link: '/services' 
              },
              { 
                title: 'Quality Verified', 
                desc: 'Premium New, Ex-UK, and Boxed laptops with rigorously verified hardware performance metrics.', 
                icon: Laptop, 
                link: '/laptops' 
              }
            ].map((service, i) => (
              <div key={i} className="group relative border border-zinc-100 p-10 hover:border-black transition-all bg-white rounded-3xl">
                <div className="mb-8 flex h-14 w-14 items-center justify-center bg-zinc-50 text-black border border-zinc-200 group-hover:bg-primary group-hover:text-white transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase italic tracking-tighter">{service.title}</h3>
                <p className="text-sm font-medium text-zinc-500 leading-relaxed mb-8">{service.desc}</p>
                <Link href={service.link} className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:gap-3 transition-all">
                  LEARN MORE <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
