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
import { collection, query, orderBy, limit, where } from 'firebase/firestore';
import { useMemo } from 'react';

export default function Home() {
  const db = useFirestore();
  const shopHeroImage = PlaceHolderImages.find(img => img.id === 'shop-hero');

  // Fetch Featured Laptops
  const featuredLaptopsQuery = useMemo(() => {
    if (!db) return null;
    return query(
      collection(db, 'products'), 
      where('type', '==', 'laptop'),
      orderBy('createdAt', 'desc'), 
      limit(4)
    );
  }, [db]);
  const { data: liveLaptops, loading: laptopsLoading } = useCollection(featuredLaptopsQuery);

  // Fetch Featured Accessories
  const featuredAccessoriesQuery = useMemo(() => {
    if (!db) return null;
    return query(
      collection(db, 'products'), 
      where('type', '==', 'accessory'),
      orderBy('createdAt', 'desc'), 
      limit(4)
    );
  }, [db]);
  const { data: liveAccessories, loading: accessoriesLoading } = useCollection(featuredAccessoriesQuery);

  // Fallback to static if live data is empty
  const featuredLaptops = useMemo(() => {
    if (liveLaptops && liveLaptops.length > 0) return liveLaptops;
    return staticLaptops.slice(0, 4);
  }, [liveLaptops]);

  const featuredAccessories = useMemo(() => {
    if (liveAccessories && liveAccessories.length > 0) return liveAccessories;
    return staticAccessories.slice(0, 4);
  }, [liveAccessories]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-primary/5 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-zinc-900 border-2 border-primary/20">
                Nairobi's Tech Leader
              </div>
              <h1 className="font-headline text-4xl font-black tracking-tighter text-black md:text-5xl lg:text-7xl leading-[0.9]">
                Empowering Your <span className="text-primary">Digital Future</span> at Benace Tech Hub.
              </h1>
              <p className="text-xl font-medium text-zinc-600 leading-relaxed max-w-xl">
                Experience premium technology solutions under one roof. We offer the best in hardware, professional maintenance, and custom digital craftsmanship.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Laptop, text: 'Premium Laptops' },
                  { icon: Wrench, text: 'Expert Repairs' },
                  { icon: Globe, text: 'Web Development' },
                  { icon: Cpu, text: 'Quality Spares' }
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
                  <Link href="/laptops">Shop Laptops</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 border-2 border-black px-8 font-black uppercase tracking-widest hover:bg-zinc-100">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>

            <div className="relative group animate-in fade-in slide-in-from-right duration-700">
              <div className="absolute -inset-4 rounded-2xl bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all"></div>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-4 border-black bg-zinc-100 shadow-[12px_12px_0px_0px_rgba(0,186,242,1)]">
                {shopHeroImage && (
                  <Image
                    src={shopHeroImage.imageUrl}
                    alt="Benace Tech Hub Shop"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                )}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border-2 border-black bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-zinc-400">Visit Us Today</p>
                      <p className="font-bold text-black">Old Nation, 2nd Flr, Shop D1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Laptops Section */}
      <section id="laptops" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl font-black tracking-tight text-black sm:text-5xl uppercase italic">
                The Elite <span className="text-primary">Collection</span>
              </h2>
              <p className="mt-4 text-lg font-medium text-zinc-600">
                Hand-picked, high-performance machines tested for reliability. Whether you need an Ex-UK workhorse or a brand-new flagship, we have you covered.
              </p>
            </div>
            <Button asChild variant="ghost" className="font-black uppercase tracking-widest text-primary hover:bg-primary/10">
              <Link href="/laptops">
                View All Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {laptopsLoading ? (
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

      {/* Services Call-to-Action */}
      <section className="bg-black py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tighter sm:text-6xl mb-6">
                NOT JUST <span className="text-primary">SALES.</span><br/>
                WE ARE <span className="text-primary">SOLUTIONS.</span>
              </h2>
              <p className="text-xl text-zinc-400 font-medium mb-8">
                From component-level motherboard repairs to custom e-commerce web design, our technicians and developers are the best in the region.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary text-black font-black uppercase tracking-widest h-12 px-8 hover:bg-white transition-colors">
                  <Link href="/repairs">Repair Service</Link>
                </Button>
                <Button asChild variant="outline" className="border-zinc-700 text-white font-black uppercase tracking-widest h-12 px-8 hover:bg-zinc-800">
                  <Link href="/services">Web Design</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Repairs', count: '500+', desc: 'Devices Fixed' },
                { label: 'Websites', count: '50+', desc: 'Live Projects' },
                { label: 'Inventory', count: '200+', desc: 'Tech Items' },
                { label: 'Rating', count: '4.9/5', desc: 'Client Trust' }
              ].map((stat, i) => (
                <div key={i} className="border-2 border-zinc-800 p-6 rounded-xl hover:border-primary/50 transition-colors bg-zinc-900/50 backdrop-blur-sm">
                  <p className="text-3xl font-black text-primary mb-1">{stat.count}</p>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
                  <p className="text-[10px] font-bold text-zinc-600 mt-2">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accessories Section */}
      <section id="accessories" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-4xl font-black tracking-tight text-black sm:text-5xl uppercase">
              Pro <span className="text-primary">Gear</span> & Spares
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-zinc-600">
              Printers, UPS systems, genuine chargers, and professional software to keep your workflow uninterrupted.
            </p>
          </div>
          {accessoriesLoading ? (
            <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredAccessories.map(accessory => (
                <AccessoryCard key={accessory.id} accessory={accessory} />
                ))}
            </div>
          )}
          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg" className="h-14 border-2 border-black px-12 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              <Link href="/accessories">
                Explore All Accessories
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
