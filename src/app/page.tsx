'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { HeroSlider } from '@/components/home/hero-slider';
import { 
  ArrowRight, 
  Wrench, 
  Globe, 
  Laptop, 
  DatabaseBackup, 
  MessageCircle, 
  Zap, 
  ShieldCheck, 
  Calendar,
  MousePointer2,
  ChevronRight
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
      limit(8)
    );
  }, [db]);

  const { data: allLiveProducts, loading } = useCollection(productsQuery);

  const featuredLaptops = useMemo(() => {
    return allLiveProducts?.filter(p => p.type === 'laptop').slice(0, 4) || [];
  }, [allLiveProducts]);

  const accessories = useMemo(() => {
    return allLiveProducts?.filter(p => p.type === 'accessory').slice(0, 4) || [];
  }, [allLiveProducts]);

  return (
    <div className="flex flex-col gap-0 bg-white">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <HeroSlider />
      </section>

      {/* 2. Featured Laptops */}
      <section className="bg-[#f8f9fa] py-20 md:py-28 border-b">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-black sm:text-5xl italic">
                Laptops for Sale
              </h2>
              <p className="mt-3 max-w-lg text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                Good Quality • Clean and Tested • Ready to Use
              </p>
            </div>
            <Button asChild variant="outline" className="h-14 rounded-none border-2 border-black px-10 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              <Link href="/laptops" className="flex items-center">
                See All Laptops <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square w-full animate-pulse bg-zinc-200 rounded-none"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border-4 border-dashed border-zinc-200">
               <DatabaseBackup className="mb-6 h-12 w-12 text-zinc-200" />
               <h3 className="text-xl font-black uppercase text-zinc-900">Checking for Laptops...</h3>
               <p className="mt-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">Please wait for the list to show up</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Professional Repairs Section with Video Ad */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden bg-black shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/Download (21).mp4" type="video/mp4" />
                Your browser cannot play this video.
              </video>
              <div className="absolute top-8 left-8 bg-black text-white p-6 font-black uppercase italic tracking-tighter border-l-4 border-primary">
                <span className="text-primary">Best</span> Repair Shop
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Technical Experts</span>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
                  WE FIX ALL <br />COMPUTER PROBLEMS.
                </h2>
                <p className="mt-6 text-lg font-medium text-zinc-500 leading-relaxed">
                  We fix broken screens, keys that do not work, and internal parts. We use special tools to make your laptop work like a new one. Our work is clean, fast, and you can trust us.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wide">6 Months Warranty</span>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wide">Quick Service</span>
                </div>
              </div>
              <Button asChild size="lg" className="h-14 bg-black text-white font-black uppercase tracking-widest rounded-none hover:bg-primary transition-all px-10">
                <Link href="/repairs">Book a Repair</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Laptop Hire */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Rent a Laptop</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl">
              RENT NOW. <br /><span className="text-zinc-500">SAVE YOUR MONEY.</span>
            </h2>
            <p className="text-lg font-medium text-zinc-400">
              Need a laptop for a short time? You can rent one for school, work, or meetings. We have fast laptops ready for you at a low price.
            </p>
            <div className="pt-8 flex flex-wrap justify-center gap-6">
              <Link href="/laptop-hire" className="flex items-center gap-2 group text-xs font-black uppercase tracking-widest">
                For Students <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/laptop-hire" className="flex items-center gap-2 group text-xs font-black uppercase tracking-widest">
                For Offices <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/laptop-hire" className="flex items-center gap-2 group text-xs font-black uppercase tracking-widest">
                For Events <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="pt-10">
              <Button asChild size="lg" className="bg-primary text-black font-black uppercase tracking-widest rounded-none hover:bg-white transition-all">
                <Link href="/laptop-hire">See Rental List</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tech Accessories Section */}
      <section className="py-24 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Computer Parts</h2>
            <Link href="/accessories" className="text-xs font-black uppercase tracking-widest text-primary hover:underline">
              See All Items →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {accessories.map((item, i) => (
              <Link key={i} href={`/accessories`} className="group">
                <div className="relative aspect-square bg-zinc-50 mb-4 overflow-hidden">
                  <Image 
                    src={item.imageUrls?.[0] || 'https://picsum.photos/seed/acc/600/600'} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.brand}</p>
                <h4 className="font-bold text-sm text-black group-hover:text-primary transition-colors">{item.name}</h4>
                <p className="mt-1 font-black text-black">KES {item.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Digital Solutions & Web Dev */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Web Design</span>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
                  WE BUILD GREAT <br />WEBSITES.
                </h2>
                <p className="mt-6 text-lg font-medium text-zinc-500 leading-relaxed">
                  We also build websites to help your business grow. we make online shops and simple sites that look good and work well on all phones.
                </p>
              </div>
              <ul className="space-y-4">
                {['Custom Website Design', 'Online Shops', 'Business Logo Design', 'Google Search Help'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                    <ChevronRight className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="h-14 bg-black text-white font-black uppercase tracking-widest rounded-none hover:bg-primary transition-all px-10">
                <Link href="/services">See Our Work</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] bg-zinc-200">
               <Image 
                src="https://picsum.photos/seed/dev/1200/900" 
                alt="Web Design Studio" 
                fill 
                className="object-cover"
                data-ai-hint="code monitor"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Trust */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-10">BENACE TECH HUB</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Trusted Shop', icon: ShieldCheck },
                { label: 'Fast Delivery', icon: Zap },
                { label: 'Expert Help', icon: Wrench },
                { label: 'Good Items', icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center bg-zinc-50 rounded-full">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="h-14 border-2 border-black font-black uppercase px-8">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild className="h-14 bg-black text-white font-black uppercase px-8">
                <Link href="/contact">Visit Our Shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Action */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <Link 
          href="https://wa.me/254714210957" 
          target="_blank"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 transition-all hover:bg-green-700"
        >
          <MessageCircle className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}
