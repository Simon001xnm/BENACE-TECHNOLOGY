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
  CheckCircle2,
  MousePointer2
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

  return (
    <div className="flex flex-col gap-0 bg-[#fdfdfd] overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <HeroSlider />
      </section>

      {/* 2. Featured Laptops - SEO: Laptops for sale in Nairobi */}
      <section className="py-16 md:py-24 bg-white w-full">
        <div className="container mx-auto px-4 mb-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block">Store Catalog</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-black sm:text-5xl leading-tight">
                Best Laptops <br />in Nairobi.
              </h2>
              <p className="text-base font-bold text-zinc-400 italic">
                High quality • Verified • 6 months warranty
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
                  <div key={i} className="aspect-square w-full animate-pulse bg-zinc-50 border border-zinc-100"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 w-full">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
                 <DatabaseBackup className="mb-6 h-12 w-12 text-zinc-200" />
                 <h3 className="text-xl font-black text-black uppercase tracking-tight">Checking Stock...</h3>
                 <p className="mt-2 text-xs text-zinc-400 font-bold uppercase tracking-widest">We are updating our shop list</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Professional Repairs - SEO: Fast Laptop Repair Nairobi CBD */}
      <section className="py-16 bg-zinc-50 md:py-24 w-full border-y border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-3xl shadow-xl bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-80"
              >
                <source src="/Download (21).mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md text-white px-6 py-3 font-black uppercase text-[10px] tracking-[0.3em] rounded-full border border-white/20">
                 Reliable Service in Nairobi
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Technical Center</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-black md:text-6xl leading-tight">
                  Fast Repair <br />Service.
                </h2>
                <p className="text-lg font-bold text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  We fix all computer problems. Broken screens, dead batteries, or slow systems—we make them like new again. Visit us for a free check.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: '6 Months Warranty', icon: ShieldCheck },
                  { label: 'Original Spare Parts', icon: Zap },
                  { label: 'Same Day Delivery', icon: Laptop },
                  { label: 'Data Recovery', icon: DatabaseBackup }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-100 bg-white">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="h-14 w-full sm:w-auto rounded-xl bg-black text-white font-black uppercase tracking-widest px-10 hover:bg-primary transition-all">
                <Link href="/repairs">Fix My Device</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Website Studio - SEO: Web design Nairobi business */}
      <section className="py-16 md:py-24 bg-white w-full">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Web Studio</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-black md:text-6xl leading-tight">
                  We build <br />Great Sites.
                </h2>
                <p className="text-lg font-bold text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  Get a professional website for your business in Nairobi. We build clean, fast, and mobile-friendly websites that help you find more customers.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[
                  'Business Websites', 'Online Stores', 'Company Logos', 'POS Systems'
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {item}
                    </div>
                 ))}
              </div>
              <Button asChild size="lg" className="h-14 w-full sm:w-auto rounded-xl bg-black text-white font-black uppercase tracking-widest px-10 hover:bg-primary transition-all">
                <Link href="/services">View Web Projects</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
               <Image 
                src="/fe42de32149b62db71a04cacce84466b.jpg" 
                alt="Professional Web Design Nairobi" 
                fill 
                className="object-cover transition-transform hover:scale-105 duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recent Work - SEO Portfolio */}
      <section className="py-16 bg-zinc-50 w-full border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block">Portfolio</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-black sm:text-5xl">Our Work.</h2>
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest max-w-2xl mx-auto">
              Trusted by businesses in Kenya to provide top-tier digital solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {portfolioProjects.map(project => (
              <PortfolioItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="py-20 bg-black w-full text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter sm:text-4xl">Benace Tech Hub</h3>
            <p className="text-lg font-bold text-zinc-400 italic">
              Your trusted partner for laptops, repairs, and web design in Nairobi. Visit our shop at Old Nation House.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button asChild className="h-14 w-full sm:w-auto rounded-xl bg-primary text-white px-10 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                <Link href="/contact">Visit Our Shop</Link>
              </Button>
              <Button asChild variant="outline" className="h-14 w-full sm:w-auto rounded-xl px-10 font-black uppercase tracking-widest border-white/20 text-white hover:bg-white hover:text-black transition-all">
                <Link href="https://wa.me/254714210957" target="_blank">Chat on WhatsApp</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="h-7 w-7" />
        </Link>
      </div>
    </div>
  );
}
