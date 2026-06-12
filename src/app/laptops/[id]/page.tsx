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
import { ShoppingCart, ArrowLeft, Cpu, HardDrive, Monitor, Layers, Info, Loader2, MessageSquare } from 'lucide-react';
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
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 font-bold uppercase tracking-widest text-xs text-zinc-400">Synchronizing Specs...</p>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black uppercase text-black">Product Not Found</h1>
        <Button asChild className="mt-8 rounded-full font-bold uppercase tracking-widest px-8" variant="outline">
          <Link href="/laptops">Back to Collection</Link>
        </Button>
      </div>
    );
  }

  const laptopImage = laptop.imageUrls?.[0] || (laptop.imageId ? PlaceHolderImages.find((img) => img.id === laptop.imageId)?.imageUrl : null);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-10">
        <Button asChild variant="ghost" className="pl-0 text-zinc-400 hover:text-primary font-bold uppercase tracking-widest text-xs">
          <Link href="/laptops" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> All Laptops
          </Link>
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
          {laptopImage && (
            <Image
              src={laptopImage}
              alt={laptop.name}
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
          {laptop.status && (
            <Badge className="absolute left-6 top-6 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-black text-white">
              {laptop.status}
            </Badge>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">{laptop.brand}</p>
            <h1 className="font-headline text-4xl font-black tracking-tight text-black md:text-5xl">
              {laptop.name}
            </h1>
          </div>

          <div className="mb-8 border-b border-zinc-100 pb-8">
            <p className="text-4xl font-black text-primary">KES {laptop.price.toLocaleString()}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
              <Info className="h-4 w-4" /> About this device
            </h2>
            <p className="text-lg font-medium text-zinc-600 leading-relaxed italic border-l-4 border-primary pl-6">
              {laptop.description || "No description provided for this technical masterpiece."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            {[
              { label: 'Processor', value: laptop.specifications?.processor, icon: Cpu },
              { label: 'RAM', value: laptop.specifications?.ram, icon: Layers },
              { label: 'Storage', value: laptop.specifications?.storage, icon: HardDrive },
              { label: 'Display', value: laptop.specifications?.display, icon: Monitor }
            ].map((spec, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-6 border border-zinc-100">
                <spec.icon className="h-5 w-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase text-zinc-400 tracking-widest">{spec.label}</p>
                  <p className="truncate text-sm font-black text-black">{spec.value || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 h-16 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl" 
              onClick={() => addToCart(laptop as any)}
            >
              <ShoppingCart className="mr-3 h-5 w-5" /> Add to Cart
            </Button>
            <Button asChild size="lg" variant="outline" className="h-16 w-full sm:w-16 rounded-2xl border-2 border-zinc-200 hover:border-primary flex items-center justify-center transition-all">
                <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                  <MessageSquare className="h-5 w-5" />
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
