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
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-widest text-zinc-400">Syncing Specs...</p>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-xs font-black uppercase text-black">Product Not Found</h1>
        <Button asChild className="mt-4 h-8 rounded-none text-[8px] font-black uppercase tracking-widest px-6" variant="outline">
          <Link href="/laptops">Back to Collection</Link>
        </Button>
      </div>
    );
  }

  const laptopImage = laptop.imageUrls?.[0] || (laptop.imageId ? PlaceHolderImages.find((img) => img.id === laptop.imageId)?.imageUrl : null);

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-10">
      <div className="mb-6">
        <Button asChild variant="ghost" className="h-6 pl-0 text-zinc-400 hover:text-primary text-[8px] font-black uppercase tracking-widest">
          <Link href="/laptops" className="flex items-center">
            <ArrowLeft className="mr-1 h-3 w-3" /> All Models
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100">
          {laptopImage && (
            <Image
              src={laptopImage}
              alt={laptop.name}
              fill
              className="object-contain p-4 transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
          {laptop.status && (
            <Badge className="absolute left-4 top-4 px-2 py-0.5 text-[7px] font-black uppercase tracking-widest bg-black text-white rounded-none">
              {laptop.status}
            </Badge>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mb-1">{laptop.brand}</p>
            <h1 className="text-xl font-black tracking-tight text-black md:text-2xl uppercase">
              {laptop.name}
            </h1>
          </div>

          <div className="mb-6 border-b border-zinc-100 pb-4">
            <p className="text-2xl font-black text-black">KES {laptop.price.toLocaleString()}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3 flex items-center gap-1">
              <Info className="h-3 w-3" /> Device Intelligence
            </h2>
            <div className="text-[10px] font-bold text-zinc-600 leading-normal border-l-2 border-primary pl-4 whitespace-pre-wrap">
              {laptop.description || "No technical breakdown provided for this unit."}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-8">
            {[
              { label: 'Processor', value: laptop.specifications?.processor, icon: Cpu },
              { label: 'RAM', value: laptop.specifications?.ram, icon: Layers },
              { label: 'Storage', value: laptop.specifications?.storage, icon: HardDrive },
              { label: 'Display', value: laptop.specifications?.display, icon: Monitor }
            ].map((spec, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4 border border-zinc-100">
                <spec.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest leading-none mb-1">{spec.label}</p>
                  <p className="truncate text-[9px] font-black text-black uppercase">{spec.value || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="flex-1 h-12 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#e7af06] font-black uppercase text-[10px] tracking-widest shadow-sm" 
              onClick={() => addToCart(laptop as any)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 w-full sm:w-12 rounded-xl border-2 border-zinc-200 hover:border-primary flex items-center justify-center transition-all bg-white">
                <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                  <MessageSquare className="h-4 w-4" />
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
