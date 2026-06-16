'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { AccessoryCard } from '@/components/accessories/accessory-card';
import { HeroSlider } from '@/components/home/hero-slider';
import { portfolioProjects } from '@/lib/data';
import { PortfolioItem } from '@/components/services/portfolio-item';
import { 
  ArrowRight, 
  Wrench, 
  Globe, 
  Laptop, 
  DatabaseBackup, 
  MessageCircle, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  MousePointer2
} from 'lucide-react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
    <div className="flex flex-col gap-0 bg-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <HeroSlider />
      </section>

      {/* 2. Featured Laptops */}
      <section className="bg-white py-16 md:py-24 border-b border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block">Best Sellers</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-6xl">
                Laptops for Sale
              </h2>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                Good Quality • Tested • Ready to Use
              </p>
            </div>
            <Button asChild variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest border-zinc-200 hover:border-black transition-all">
              <Link href="/laptops" className="flex items-center">
                See All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square w-full border border-zinc-100 animate-pulse bg-zinc-50 rounded-[2rem]"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-zinc-100 rounded-[3rem] bg-zinc-50/30">
               <DatabaseBackup className="mb-6 h-12 w-12 text-zinc-200" />
               <h3 className="text-xl font-black text-black uppercase tracking-tight">Updating Stock...</h3>
               <p className="mt-2 text-xs text-zinc-400 font-bold uppercase tracking-widest">Checking our shop inventory</p>
            </div>
          )}
        </div>
      </section>

      {/* 2.5 Tech Accessories Section */}
      <section className="bg-zinc-50 py-16 md:py-24 border-b border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block">Useful Gear</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
                Tech Accessories
              </h2>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                Printers • Mice • Backup Power
              </p>
            </div>
            <Button asChild variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest border-zinc-200 hover:border-black transition-all">
              <Link href="/accessories" className="flex items-center">
                View All Gear <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 w-full border border-zinc-100 animate-pulse bg-zinc-200 rounded-2xl"></div>
              ))}
            </div>
          ) : featuredAccessories.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredAccessories.map(accessory => (
                <AccessoryCard key={accessory.id} accessory={accessory as any} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-zinc-200 rounded-[2rem] bg-white">
              <MousePointer2 className="mx-auto h-12 w-12 text-zinc-200 mb-4" />
              <p className="font-bold text-zinc-400 uppercase tracking-widest text-xs">New accessories coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Professional Repairs Section with Video Ad */}
      <section className="py-20 bg-white md:py-32 border-b border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-90"
              >
                <source src="/Download (21).mp4" type="video/mp4" />
                Your browser cannot play this video.
              </video>
              <div className="absolute top-8 left-8 bg-black/80 text-white px-6 py-3 font-black uppercase text-[10px] tracking-[0.2em] rounded-full border border-white/20 backdrop-blur-md">
                <span className="text-primary mr-2">●</span> Live Repair Shop
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Technical Experts</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-black md:text-7xl leading-[0.9]">
                  We fix all <br />problems.
                </h2>
                <p className="text-lg font-bold text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  We fix broken screens and parts that do not work. We make your laptop look and work like new. Our work is fast and clean.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50/50 shadow-sm">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">6 Months Warranty</span>
                </div>
                <div className="flex flex-col gap-2 p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50/50 shadow-sm">
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Fast Same Day Fix</span>
                </div>
              </div>
              <Button asChild size="lg" className="h-16 w-full sm:w-auto rounded-2xl bg-black text-white font-black uppercase tracking-widest px-12 hover:bg-primary transition-all shadow-xl">
                <Link href="/repairs">Fix My Laptop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Laptop Hire */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Rent Now</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-8xl leading-[0.9]">
              Rent Today. <br /><span className="text-zinc-600">Pay Less.</span>
            </h2>
            <p className="text-xl font-bold text-zinc-400 italic max-w-2xl mx-auto">
              Need a laptop for a few days? You can rent one from us for school or work. We have good laptops ready for you at a low price.
            </p>
            <div className="pt-8 flex flex-wrap justify-center gap-10">
              {['For Students', 'For Offices', 'For Events'].map((label) => (
                <Link key={label} href="/laptop-hire" className="flex items-center gap-3 group text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-all">
                  {label} <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              ))}
            </div>
            <div className="pt-10">
              <Button asChild size="lg" className="h-20 rounded-[2rem] bg-primary text-black font-black uppercase tracking-widest px-16 hover:bg-white transition-all shadow-2xl shadow-primary/20">
                <Link href="/laptop-hire">See Prices</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Digital Solutions & Web Dev */}
      <section className="py-20 md:py-32 bg-white border-b border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Web Studio</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-black md:text-7xl leading-[0.9]">
                  We build <br />great sites.
                </h2>
                <p className="text-lg font-bold text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  We make websites for your business that work well on all phones. We build online shops and simple pages for your company.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {['Custom Design', 'Online Shops', 'Business Logos', 'Google SEO'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-100 font-black uppercase text-[10px] tracking-widest bg-zinc-50/50 text-zinc-700">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="h-16 w-full sm:w-auto rounded-2xl bg-black text-white font-black uppercase tracking-widest px-12 hover:bg-primary transition-all shadow-xl">
                <Link href="/services">See Our Work</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
               <Image 
                src="/fe42de32149b62db71a04cacce84466b.jpg" 
                alt="Web Design Studio" 
                fill 
                className="object-cover transition-transform hover:scale-105 duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Portfolio Section */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block">Our Work</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-6xl">Recent Projects</h2>
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest max-w-2xl mx-auto">
              Take a look at the websites we have built for other businesses recently.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {portfolioProjects.map(project => (
              <PortfolioItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final Trust */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-16 italic border-b-4 border-primary inline-block px-10 pb-2">Benace Tech Hub</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Trusted Shop', icon: ShieldCheck },
                { label: 'Fast Delivery', icon: Zap },
                { label: 'Expert Help', icon: Wrench },
                { label: 'Good Quality', icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-6 p-10 rounded-[2.5rem] border border-zinc-100 bg-zinc-50/30 hover:bg-white hover:shadow-xl transition-all group">
                  <div className="h-16 w-16 flex items-center justify-center bg-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-20 flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button asChild variant="outline" className="h-16 w-full sm:w-auto rounded-2xl px-12 font-black uppercase tracking-widest border-zinc-200 hover:border-black transition-all">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild className="h-16 w-full sm:w-auto rounded-2xl bg-black text-white px-12 font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl">
                <Link href="/contact">Visit Shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Action */}
      <div className="fixed bottom-6 right-6 z-[100] group">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all hover:bg-green-700"
        >
          <MessageCircle className="h-8 w-8" />
        </Link>
        <div className="absolute right-20 bottom-3 bg-white px-4 py-2 rounded-xl shadow-xl border border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
           <p className="text-[10px] font-black uppercase tracking-widest text-black whitespace-nowrap">Chat with us</p>
        </div>
      </div>
    </div>
  );
}
