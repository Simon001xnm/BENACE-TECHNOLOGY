'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { HeroSlider } from '@/components/home/hero-slider';
import { ArrowRight, Wrench, Globe, Laptop, Cpu, DatabaseBackup, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col gap-0 bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <HeroSlider />
      </section>

      {/* Featured Inventory */}
      <section className="bg-zinc-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-2 text-zinc-500 font-medium">
                The latest hardware, synced live from our Nairobi inventory.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-md px-6 font-bold hover:bg-primary hover:text-white transition-all">
              <Link href="/laptops" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-[350px] w-full animate-pulse rounded-lg bg-zinc-200"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <DatabaseBackup className="mb-4 h-10 w-10 text-zinc-300" />
               <h3 className="text-xl font-bold text-zinc-900">Inventory Syncing</h3>
               <p className="mt-1 text-sm text-zinc-500">Checking for fresh stock...</p>
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
                desc: 'Nairobi\'s most reliable technical support for all hardware brands.', 
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
                title: 'Quality Hardware', 
                desc: 'Premium New, Ex-UK, and Boxed laptops with verified performance.', 
                icon: Laptop, 
                link: '/laptops' 
              }
            ].map((service, i) => (
              <div key={i} className="group relative rounded-xl border border-zinc-100 p-8 hover:bg-zinc-50 transition-all">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{service.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">{service.desc}</p>
                <Link href={service.link} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:gap-2 transition-all">
                  Learn More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
