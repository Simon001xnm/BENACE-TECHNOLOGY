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
      <section className="bg-zinc-50 py-20 md:py-28 border-b-4 border-black">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Best Offers</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-6xl italic">
                Laptops for Sale
              </h2>
              <p className="mt-3 max-w-lg text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
                Good Quality • Clean and Tested • Ready to Use
              </p>
            </div>
            <Button asChild className="h-16 rounded-none border-4 border-black px-10 bg-white text-black font-black uppercase tracking-widest hover:bg-black hover:text-white shadow-neo-lg transition-all">
              <Link href="/laptops" className="flex items-center">
                See All Laptops <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square w-full border-4 border-black animate-pulse bg-zinc-100 rounded-none"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border-4 border-dashed border-black bg-zinc-50">
               <DatabaseBackup className="mb-6 h-12 w-12 text-zinc-300" />
               <h3 className="text-xl font-black uppercase text-black">Checking for Laptops...</h3>
               <p className="mt-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">Please wait for the list to show up</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Professional Repairs Section with Video Ad */}
      <section className="py-24 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden border-4 border-black bg-black shadow-neo-xl">
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
              <div className="absolute top-8 left-8 bg-black text-white p-6 font-black uppercase italic tracking-tighter border-l-8 border-primary shadow-neo">
                <span className="text-primary">Best</span> Repair Shop
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Technical Experts</span>
                <h2 className="mt-4 text-5xl font-black uppercase tracking-tighter text-black md:text-7xl">
                  WE FIX ALL <br />COMPUTER PROBLEMS.
                </h2>
                <p className="mt-6 text-lg font-bold text-zinc-500 leading-relaxed italic border-l-8 border-primary pl-8">
                  We fix broken screens, keys that do not work, and internal parts. We use special tools to make your laptop work like a new one. Our work is clean, fast, and you can trust us.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 p-4 border-2 border-black shadow-neo bg-zinc-50">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide">6 Months Warranty</span>
                </div>
                <div className="flex items-center gap-3 p-4 border-2 border-black shadow-neo bg-zinc-50">
                  <Zap className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide">Quick Service</span>
                </div>
              </div>
              <Button asChild size="lg" className="h-16 bg-black text-white font-black uppercase tracking-widest rounded-none border-4 border-black shadow-neo-lg hover:bg-primary transition-all px-12">
                <Link href="/repairs">Book a Repair</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Laptop Hire */}
      <section className="py-24 bg-black text-white border-b-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Rent a Laptop</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-8xl">
              RENT NOW. <br /><span className="text-zinc-600">SAVE YOUR MONEY.</span>
            </h2>
            <p className="text-xl font-bold text-zinc-400 italic">
              Need a laptop for a short time? You can rent one for school, work, or meetings. We have fast laptops ready for you at a low price.
            </p>
            <div className="pt-8 flex flex-wrap justify-center gap-8">
              {['For Students', 'For Offices', 'For Events'].map((label) => (
                <Link key={label} href="/laptop-hire" className="flex items-center gap-3 group text-xs font-black uppercase tracking-widest border-b-2 border-primary pb-1">
                  {label} <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform text-primary" />
                </Link>
              ))}
            </div>
            <div className="pt-10">
              <Button asChild size="lg" className="h-16 bg-primary text-black font-black uppercase tracking-widest rounded-none border-4 border-black shadow-[6px_6px_0px_0px_white] hover:bg-white transition-all px-12">
                <Link href="/laptop-hire">See Rental List</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tech Accessories Section */}
      <section className="py-24 bg-zinc-50 border-b-4 border-black">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex items-center justify-between">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Specialized Gear</span>
               <h2 className="text-4xl font-black uppercase tracking-tighter">Computer Parts</h2>
            </div>
            <Link href="/accessories" className="text-xs font-black uppercase tracking-widest text-primary border-2 border-black p-4 bg-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              See All Items →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {accessories.map((item, i) => (
              <Link key={i} href={`/laptops/${item.id}`} className="group border-4 border-black bg-white shadow-neo hover:shadow-neo-lg transition-all">
                <div className="relative aspect-square bg-white border-b-4 border-black overflow-hidden">
                  <Image 
                    src={item.imageUrls?.[0] || PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl || 'https://picsum.photos/seed/acc/600/600'} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{item.brand}</p>
                  <h4 className="font-black text-sm text-black group-hover:text-primary transition-colors uppercase leading-tight line-clamp-2">{item.name}</h4>
                  <p className="mt-4 font-black text-2xl text-black">KES {item.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Digital Solutions & Web Dev */}
      <section className="py-24 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Web Design</span>
                <h2 className="mt-4 text-5xl font-black uppercase tracking-tighter text-black md:text-7xl">
                  WE BUILD GREAT <br />WEBSITES.
                </h2>
                <p className="mt-6 text-lg font-bold text-zinc-500 leading-relaxed italic border-l-8 border-primary pl-8">
                  We also build websites to help your business grow. we make online shops and simple sites that look good and work well on all phones.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {['Custom Website Design', 'Online Shops', 'Business Logo Design', 'Google Search Help'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 border-2 border-black shadow-neo font-black uppercase text-[10px] tracking-widest bg-zinc-50">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="h-16 bg-black text-white font-black uppercase tracking-widest rounded-none border-4 border-black shadow-neo-lg hover:bg-primary transition-all px-12">
                <Link href="/services">See Our Work</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] border-4 border-black shadow-neo-xl overflow-hidden bg-zinc-100">
               <Image 
                src="https://picsum.photos/seed/dev/1200/900" 
                alt="Web Design Studio" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform"
                data-ai-hint="code monitor"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Trust */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-16 italic border-b-4 border-black inline-block px-8 pb-2">BENACE TECH HUB</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Trusted Shop', icon: ShieldCheck },
                { label: 'Fast Delivery', icon: Zap },
                { label: 'Expert Help', icon: Wrench },
                { label: 'Good Items', icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-6 border-4 border-black bg-white shadow-neo">
                  <div className="h-14 w-14 flex items-center justify-center bg-primary border-2 border-black rounded-none">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-black">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-20 flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild variant="outline" className="h-16 border-4 border-black font-black uppercase px-12 rounded-none bg-white text-black shadow-neo-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild className="h-16 bg-black text-white font-black uppercase px-12 rounded-none border-4 border-black shadow-neo-lg hover:bg-primary transition-all">
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
          className="flex h-16 w-16 items-center justify-center rounded-none border-4 border-black bg-green-600 text-white shadow-neo-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all hover:bg-green-700"
        >
          <MessageCircle className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}
