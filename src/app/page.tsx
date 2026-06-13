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

      {/* Featured Inventory - Landing Page Grid View */}
      <section className="bg-zinc-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Premium Hardware
              </h2>
              <p className="mt-2 text-zinc-500 font-medium uppercase text-xs tracking-widest">
                The latest laptops, synced live from our Nairobi inventory.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-none border-2 border-black px-6 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              <Link href="/laptops" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square w-full animate-pulse bg-zinc-200"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <DatabaseBackup className="mb-4 h-10 w-10 text-zinc-300" />
               <h3 className="text-xl font-bold text-zinc-900 uppercase">Inventory Syncing</h3>
               <p className="mt-1 text-xs font-bold text-zinc-400 uppercase tracking-widest">Checking for fresh stock...</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Services */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { 
                title: 'Expert Repairs', 
                desc: 'Nairobi\'s most reliable technical support for all hardware brands. Precision diagnostics.', 
                icon: Wrench, 
                link: '/repairs' 
              },
              { 
                title: 'Digital Solutions', 
                desc: 'Custom web development and software architecture for growing brands.', 
                icon: Globe, 
                link: '/services' 
              },
              { 
                title: 'Quality Gear', 
                desc: 'Premium New, Ex-UK, and Boxed laptops with verified hardware performance.', 
                icon: Laptop, 
                link: '/laptops' 
              }
            ].map((service, i) => (
              <div key={i} className="group relative border-2 border-zinc-100 p-8 hover:border-black transition-all">
                <div className="mb-6 flex h-12 w-12 items-center justify-center bg-zinc-50 text-black border border-zinc-200">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2 uppercase tracking-tight">{service.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">{service.desc}</p>
                <Link href={service.link} className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-primary hover:gap-2 transition-all">
                  Full Details <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
