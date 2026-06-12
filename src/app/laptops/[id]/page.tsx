'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { laptops as staticLaptops } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft, Cpu, HardDrive, Monitor, Layers, Info, Loader2, ShieldCheck, Zap, MessageSquare } from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function LaptopDetailPage() {
  const params = useParams();
  const laptopId = params.id as string;
  const { addToCart } = useCart();
  const db = useFirestore();

  const productRef = db ? doc(db, 'products', laptopId) : null;
  const { data: dbLaptop, loading } = useDoc(productRef);

  const laptop = useMemo(() => {
    if (dbLaptop) return dbLaptop;
    return staticLaptops.find((l) => l.id === laptopId);
  }, [dbLaptop, laptopId]);

  if (loading) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 font-black uppercase tracking-[0.3em] text-zinc-400">Synchronizing Local Spec-Sheet...</p>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase text-black">Device Offline</h1>
        <p className="mt-2 font-bold text-zinc-400 uppercase">Product not found in current inventory cluster.</p>
        <Button asChild className="mt-8 rounded-full border-4 border-black font-black uppercase tracking-widest px-8" variant="outline">
          <Link href="/laptops">Back to Collection</Link>
        </Button>
      </div>
    );
  }

  const laptopImage = laptop.imageUrls?.[0] || (laptop.imageId ? PlaceHolderImages.find((img) => img.id === laptop.imageId)?.imageUrl : null);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <div className="mb-12 flex items-center justify-between">
        <Button asChild variant="ghost" className="pl-0 text-zinc-400 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors">
          <Link href="/laptops">
            <ArrowLeft className="mr-2 h-4 w-4" /> Global Collection
          </Link>
        </Button>
        <Badge variant="outline" className="border-2 border-black font-black uppercase text-[10px] tracking-[0.2em] px-4 py-1">
          V1255 Verified
        </Badge>
      </div>

      <div className="grid gap-16 lg:grid-cols-2 items-start">
        {/* Visual Engine Container */}
        <div className="sticky top-28 space-y-8">
          <div className="relative aspect-square overflow-hidden rounded-[3rem] border-8 border-black bg-white p-12 shadow-[24px_24px_0px_0px_rgba(0,136,204,0.1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,136,204,1)]">
            {laptopImage ? (
              <Image
                src={laptopImage}
                alt={laptop.name}
                fill
                className="object-contain p-12 transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ShoppingCart className="h-32 w-32 text-zinc-100" />
              </div>
            )}
            {laptop.status && (
              <Badge className="absolute left-8 top-8 scale-150 px-6 py-2 text-xs font-black border-4 border-black bg-primary text-white shadow-xl">
                {laptop.status}
              </Badge>
            )}
          </div>
          
          {/* Trust Points */}
          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3 rounded-3xl border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Master Verified</span>
             </div>
             <div className="flex items-center gap-3 rounded-3xl border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Express</span>
             </div>
          </div>
        </div>

        {/* Data Engine Container */}
        <div className="flex flex-col">
          <div className="mb-8">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.4em] text-primary">
              {laptop.brand} ARCHITECTURE
            </p>
            <h1 className="font-headline text-5xl font-black leading-[1.1] tracking-tighter text-black md:text-7xl italic">
              {laptop.name}
            </h1>
          </div>

          <div className="mb-12 flex flex-col gap-2 border-b-4 border-zinc-100 pb-12">
            <p className="text-6xl font-black text-primary tracking-tighter">
              KES {laptop.price.toLocaleString()}
            </p>
            <div className="flex items-center gap-4">
               {laptop.oldPrice && (
                <p className="text-2xl font-bold text-zinc-300 line-through">
                  KES {laptop.oldPrice.toLocaleString()}
                </p>
              )}
              {laptop.salePercentage && (
                <Badge className="bg-red-600 text-white font-black border-2 border-black">-{laptop.salePercentage}%</Badge>
              )}
            </div>
          </div>

          {laptop.description && (
            <div className="mb-12 relative">
              <div className="flex items-center gap-3 font-black uppercase text-xs mb-6 text-zinc-400 tracking-[0.2em]">
                <Info className="h-5 w-5 text-primary" /> Technical Narrative
              </div>
              <p className="text-2xl font-medium text-zinc-600 leading-relaxed italic border-l-8 border-primary pl-8">
                {laptop.description}
              </p>
            </div>
          )}

          <div className="mb-12 space-y-10">
            <h2 className="text-xl font-black uppercase tracking-[0.3em] text-black flex items-center gap-4">
              Hardware Stack <span className="h-px flex-1 bg-black/10"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Computational Core', value: laptop.specifications?.processor, icon: Cpu, color: 'text-blue-500' },
                { label: 'System Memory', value: laptop.specifications?.ram, icon: Layers, color: 'text-purple-500' },
                { label: 'Storage Node', value: laptop.specifications?.storage, icon: HardDrive, color: 'text-emerald-500' },
                { label: 'Visual Interface', value: laptop.specifications?.display || 'Standard', icon: Monitor, color: 'text-orange-500' }
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-6 rounded-[2rem] border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,186,242,1)]">
                  <div className={cn("p-4 rounded-2xl bg-zinc-50", spec.color)}>
                    <spec.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{spec.label}</p>
                    <p className="text-xl font-black tracking-tight">{spec.value || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Engine - Tactile Bar */}
          <div className="mt-12 sticky bottom-8 z-30 flex flex-col gap-4 sm:flex-row bg-white/50 backdrop-blur-2xl p-6 rounded-[3rem] border-4 border-black shadow-2xl">
            <Button 
              size="lg" 
              className="flex-1 h-20 rounded-[2rem] bg-black text-white font-black uppercase tracking-widest text-xl border-4 border-black hover:bg-primary hover:text-black shadow-[8px_8px_0px_0px_rgba(0,186,242,1)] active:scale-95 transition-all" 
              onClick={() => addToCart(laptop as any)}
            >
              <ShoppingCart className="mr-3 h-6 w-6" /> Add to Hub
            </Button>
            <Button asChild size="lg" variant="outline" className="h-20 w-full sm:w-20 rounded-[2rem] border-4 border-black bg-white flex items-center justify-center hover:bg-primary transition-all">
                <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                  <MessageSquare className="h-6 w-6" />
                </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1 h-20 rounded-[2rem] border-4 border-black font-black uppercase tracking-widest text-xl hover:bg-zinc-50 active:scale-95 transition-all">
              <Link href="/checkout">Buy Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
