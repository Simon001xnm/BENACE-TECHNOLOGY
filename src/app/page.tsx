'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { AccessoryCard } from '@/components/accessories/accessory-card';
import { HeroSlider } from '@/components/home/hero-slider';
import { portfolioProjects } from '@/lib/data';
import { PortfolioItem } from '@/components/services/portfolio-item';
import { 
  ArrowRight, 
  DatabaseBackup, 
  MessageCircle, 
  Zap, 
  ShieldCheck, 
  Laptop,
  CheckCircle2
} from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import Image from 'next/image';

export default function Home() {
  const db = useFirestore();

  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(
      collection(db, 'products'), 
      orderBy('createdAt', 'desc'), 
      limit(24)
    );
  }, [db]);

  const { data: allLiveProducts, loading } = useCollection(productsQuery);

  const featuredLaptops = useMemo(() => {
    return allLiveProducts?.filter(p => p.type === 'laptop').slice(0, 8) || [];
  }, [allLiveProducts]);

  const featuredAccessories = useMemo(() => {
    return allLiveProducts?.filter(p => p.type === 'accessory').slice(0, 4) || [];
  }, [allLiveProducts]);

  return (
    <div className="flex flex-col gap-0 bg-[#fdfdfd] overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <HeroSlider />
      </section>

      {/* 2. Featured Laptops - Nairobi Local SEO */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-6 mb-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block">Store Collection</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-black md:text-4xl leading-none">
                Best Laptops in Nairobi.
              </h2>
              <p className="text-sm font-bold text-zinc-400 italic">
                High quality • Verified • Same-day delivery
              </p>
            </div>
            <Button asChild variant="outline" className="h-12 px-6 rounded-xl font-black uppercase tracking-widest border-zinc-200 hover:border-black transition-all">
              <Link href="/laptops" className="flex items-center">
                See All Models <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="w-full">
          {loading ? (
             <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square w-full animate-pulse bg-zinc-50"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 w-full">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="container mx-auto px-6">
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
                 <DatabaseBackup className="mb-4 h-10 w-10 text-zinc-200" />
                 <h3 className="text-sm font-black text-black uppercase tracking-widest">Checking Inventory...</h3>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Tech Peripherals - Edge to Edge */}
      <section className="py-16 bg-zinc-50 w-full border-y border-zinc-100">
        <div className="container mx-auto px-6 mb-10">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block">Specialized Gear</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-black md:text-4xl leading-none">
              Printers & Accessories.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {featuredAccessories.map(item => (
            <AccessoryCard key={item.id} accessory={item} />
          ))}
        </div>
      </section>

      {/* 4. Professional Repairs - Technical SEO */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-[3rem] shadow-2xl bg-black">
              <Image 
                src="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800&auto=format&fit=crop" 
                alt="Expert Laptop Repair in Nairobi" 
                fill 
                className="object-cover opacity-80"
                data-ai-hint="technician repair"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md text-white px-6 py-3 font-black uppercase text-[10px] tracking-[0.3em] rounded-full border border-white/20">
                 Technical Hub CBD
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Repair Center</span>
                <h2 className="text-4xl font-black uppercase tracking-tight text-black md:text-5xl leading-tight">
                  Fast Laptop <br />Repair.
                </h2>
                <p className="text-base font-bold text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  We fix all computer problems in Nairobi. From broken screens to slow systems, we make your device work perfectly again.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Verified Parts', icon: ShieldCheck },
                  { label: 'Same Day Help', icon: Zap },
                  { label: 'Expert Support', icon: Laptop }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-100 bg-zinc-50">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="h-14 w-full sm:w-auto rounded-xl bg-black text-white font-black uppercase tracking-widest px-10 hover:bg-primary transition-all">
                <Link href="/repairs">Fix My Laptop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Website Studio - Digital Solutions */}
      <section className="py-20 bg-zinc-50 w-full border-t border-zinc-100">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Web Studio</span>
                <h2 className="text-4xl font-black uppercase tracking-tight text-black md:text-5xl leading-tight">
                  Professional <br />Web Design.
                </h2>
                <p className="text-base font-bold text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  Get a great website for your business in Kenya. We build fast, beautiful sites that help you find more customers online.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                 {[
                  'Online Stores', 'Company Profiles', 'POS Systems'
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-700 bg-white px-4 py-2 rounded-full border border-zinc-100">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {item}
                    </div>
                 ))}
              </div>
              <Button asChild size="lg" className="h-14 w-full sm:w-auto rounded-xl bg-black text-white font-black uppercase tracking-widest px-10 hover:bg-primary transition-all">
                <Link href="/services">View Projects</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
               <Image 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
                alt="Web Design Services Nairobi" 
                fill 
                className="object-cover transition-transform hover:scale-105 duration-1000"
                data-ai-hint="web agency"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Portfolio Showcase */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block">Success Stories</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-black md:text-4xl">Our Recent Work.</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {portfolioProjects.slice(0, 2).map(project => (
              <PortfolioItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-24 bg-black w-full text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl space-y-10">
          <h3 className="text-4xl font-black uppercase tracking-tight md:text-5xl leading-none">Ready to start?</h3>
          <p className="text-base font-bold text-zinc-500 italic">
            Visit Benace Tech Hub at Old Nation House for the best laptops and digital help in Nairobi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              <Link href="/contact">Visit Our Shop</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-white/20 text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              <Link href="https://wa.me/254714210957" target="_blank">WhatsApp Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Action */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}
