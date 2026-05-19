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
import { ShoppingCart, ArrowLeft, Cpu, HardDrive, Monitor, Layers, Info, Loader2 } from 'lucide-react';
import { useMemo } from 'react';

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
        <p className="mt-4 font-black uppercase tracking-widest">Configuring details...</p>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase text-black">Laptop not found</h1>
        <Button asChild className="mt-6 border-2 border-black font-black" variant="outline">
          <Link href="/laptops">Back to Collection</Link>
        </Button>
      </div>
    );
  }

  const laptopImage = laptop.imageUrls?.[0] || (laptop.imageId ? PlaceHolderImages.find((img) => img.id === laptop.imageId)?.imageUrl : null);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Button asChild variant="ghost" className="mb-8 pl-0 text-muted-foreground hover:text-primary font-bold">
        <Link href="/laptops">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
        </Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          {laptopImage ? (
            <Image
              src={laptopImage}
              alt={laptop.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingCart className="h-24 w-24 text-zinc-100" />
            </div>
          )}
          {laptop.status && (
            <Badge className="absolute left-6 top-6 scale-125 px-4 py-1 text-sm font-black border-2 border-black bg-primary">
              {laptop.status}
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              {laptop.brand}
            </p>
            <h1 className="font-headline text-4xl font-black tracking-tight text-black md:text-5xl">
              {laptop.name}
            </h1>
          </div>

          <div className="mb-8 flex items-baseline gap-4">
            <p className="text-4xl font-black text-primary">
              KES {laptop.price.toLocaleString()}
            </p>
            {laptop.oldPrice && (
              <p className="text-xl font-bold text-zinc-400 line-through">
                KES {laptop.oldPrice.toLocaleString()}
              </p>
            )}
          </div>

          {laptop.description && (
            <div className="mb-8 rounded-xl border-2 border-black bg-zinc-50 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 font-black uppercase text-xs mb-3 text-primary">
                <Info className="h-4 w-4" /> Technical Overview
              </div>
              <p className="text-zinc-600 font-medium leading-relaxed italic">
                {laptop.description}
              </p>
            </div>
          )}

          <div className="mb-10 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-widest">Master Specs</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Processor', value: laptop.specifications?.processor, icon: Cpu },
                { label: 'Memory', value: laptop.specifications?.ram, icon: Layers },
                { label: 'Storage', value: laptop.specifications?.storage, icon: HardDrive },
                { label: 'Display', value: laptop.specifications?.display || 'Standard', icon: Monitor }
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border-2 border-black bg-white p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <spec.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400">{spec.label}</p>
                    <p className="text-sm font-black">{spec.value || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="flex-1 h-14 bg-black text-white font-black uppercase tracking-widest border-2 border-black hover:bg-primary hover:text-black shadow-[6px_6px_0px_0px_rgba(0,186,242,1)]" 
              onClick={() => addToCart(laptop as any)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1 h-14 border-2 border-black font-black uppercase tracking-widest hover:bg-zinc-50">
              <Link href="/checkout">Direct Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}