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
      <section className="bg-zinc-50 py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Best Offers</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-black sm:text-5xl">
                Laptops for Sale
              </h2>
              <p className="mt-2 text-sm font-medium text-zinc-500">
                Good Quality • Clean and Tested • Ready to Use
              </p>
            </div>
            <Button asChild variant="outline" className="h-12 px-8 font-bold uppercase tracking-widest">
              <Link href="/laptops" className="flex items-center">
                See All Laptops <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square w-full border animate-pulse bg-zinc-100 rounded-2xl"></div>
                ))}
             </div>
          ) : featuredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl bg-white">
               <DatabaseBackup className="mb-4 h-10 w-10 text-zinc-200" />
               <h3 className="text-lg font-bold text-black uppercase">Checking for Laptops...</h3>
               <p className="mt-1 text-xs text-zinc-400 font-medium">Please wait for the list to show up</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Professional Repairs Section with Video Ad */}
      <section className="py-20 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl border bg-black shadow-xl">
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
              <div className="absolute top-6 left-6 bg-black text-white px-6 py-3 font-bold uppercase text-xs tracking-widest rounded-full border border-white/20 backdrop-blur-md">
                <span className="text-primary mr-2">●</span> Best Repair Shop
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Experts</span>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
                  We fix all <br />computer problems.
                </h2>
                <p className="mt-6 text-lg font-medium text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  We fix broken screens, keys that do not work, and internal parts. We use special tools to make your laptop work like a new one. Our work is clean, fast, and you can trust us.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl border bg-zinc-50">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wide">6 Months Warranty</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl border bg-zinc-50">
                  <Zap className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wide">Quick Service</span>
                </div>
              </div>
              <Button asChild size="lg" className="h-14 rounded-full bg-black text-white font-bold uppercase tracking-widest px-10 hover:bg-primary transition-all">
                <Link href="/repairs">Book a Repair</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Laptop Hire */}
      <section className="py-20 bg-black text-white border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Rent a Laptop</span>
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-7xl">
              Rent now. <br /><span className="text-zinc-500">Save your money.</span>
            </h2>
            <p className="text-xl font-medium text-zinc-400 italic">
              Need a laptop for a short time? You can rent one for school, work, or meetings. We have fast laptops ready for you at a low price.
            </p>
            <div className="pt-8 flex flex-wrap justify-center gap-8">
              {['For Students', 'For Offices', 'For Events'].map((label) => (
                <Link key={label} href="/laptop-hire" className="flex items-center gap-2 group text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
                  {label} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
            <div className="pt-10">
              <Button asChild size="lg" className="h-14 rounded-full bg-primary text-black font-bold uppercase tracking-widest px-12 hover:bg-white transition-all">
                <Link href="/laptop-hire">See Rental List</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tech Accessories Section */}
      <section className="py-20 bg-zinc-50 border-b">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Specialized Gear</span>
               <h2 className="text-3xl font-black uppercase tracking-tight">Computer Parts</h2>
            </div>
            <Link href="/accessories" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
              See All Items →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {accessories.map((item, i) => (
              <Link key={i} href={`/laptops/${item.id}`} className="group flex flex-col bg-white rounded-3xl border overflow-hidden hover:shadow-xl transition-all">
                <div className="relative aspect-square bg-white border-b overflow-hidden">
                  <Image 
                    src={item.imageUrls?.[0] || PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl || 'https://picsum.photos/seed/acc/600/600'} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{item.brand}</p>
                  <h4 className="font-bold text-sm text-black group-hover:text-primary transition-colors uppercase leading-tight line-clamp-2">{item.name}</h4>
                  <p className="mt-4 font-black text-xl text-black">KES {item.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Digital Solutions & Web Dev */}
      <section className="py-20 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Web Design</span>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
                  We build great <br />websites.
                </h2>
                <p className="mt-6 text-lg font-medium text-zinc-500 leading-relaxed italic border-l-4 border-primary pl-6">
                  We make websites for your business. We make shops and simple pages that look good and work well on all phones.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {['Custom Website Design', 'Online Shops', 'Business Logo Design', 'Google Search Help'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-2xl border font-bold uppercase text-[10px] tracking-widest bg-zinc-50 text-zinc-600">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="h-14 rounded-full bg-black text-white font-bold uppercase tracking-widest px-12 hover:bg-primary transition-all">
                <Link href="/services">See Our Work</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden border bg-zinc-100 shadow-xl">
               <Image 
                src="/fe42de32149b62db71a04cacce84466b.jpg" 
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
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-12 italic border-b-2 border-primary inline-block px-8 pb-2">Benace Tech Hub</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Trusted Shop', icon: ShieldCheck },
                { label: 'Fast Delivery', icon: Zap },
                { label: 'Expert Help', icon: Wrench },
                { label: 'Good Items', icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-3xl border bg-white hover:border-primary transition-colors">
                  <div className="h-12 w-12 flex items-center justify-center bg-zinc-50 rounded-full border">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="h-14 rounded-full px-10 font-bold uppercase tracking-widest">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild className="h-14 rounded-full bg-black text-white px-10 font-bold uppercase tracking-widest hover:bg-primary transition-all">
                <Link href="/contact">Visit Our Shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Action */}
      <div className="fixed bottom-6 right-6 z-[100]">
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
