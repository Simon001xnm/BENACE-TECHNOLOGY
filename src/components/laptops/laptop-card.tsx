'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart, Star, Info, ArrowRight, Cpu, Layers, HardDrive } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function LaptopCard({ laptop }: { laptop: Laptop }) {
  const { addToCart } = useCart();
  
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  const getStatusStyle = () => {
    switch (laptop.status) {
      case 'New': return 'bg-emerald-500 text-white border-black';
      case 'Boxed': return 'bg-primary text-white border-black';
      case 'Ex-UK': return 'bg-black text-white border-black';
      default: return 'bg-zinc-200 text-black border-black';
    }
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border-4 border-black bg-white transition-all duration-500 hover:-translate-y-4 hover:shadow-[16px_16px_0px_0px_rgba(0,136,204,1)]">
      {/* Sale Tag */}
      {laptop.salePercentage && (
        <div className="absolute left-6 top-6 z-20">
          <Badge className="bg-red-600 font-black text-white px-4 py-1.5 rounded-full border-2 border-black text-xs shadow-lg">
            -{laptop.salePercentage}% OFF
          </Badge>
        </div>
      )}

      {/* Main Image Link - Direct Gateway to Specs */}
      <CardHeader className="relative aspect-[5/4] p-0 overflow-hidden bg-zinc-50 border-b-4 border-black">
        <Link href={`/laptops/${laptop.id}`} className="block h-full w-full">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center bg-zinc-100">
                <ShoppingCart className="h-16 w-16 text-zinc-300" />
             </div>
          )}
          
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 p-6">
            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-black shadow-2xl ring-2 ring-black">
              Full Technical Specs <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </Link>
        
        {/* Status Badge */}
        <div className="absolute bottom-6 left-6">
          {laptop.status && (
            <Badge className={cn("font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 text-[10px] shadow-sm", getStatusStyle())}>
              {laptop.status}
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Content Area - Optimized for Spec Information */}
      <CardContent className="flex flex-grow flex-col p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {laptop.brand} ARCHITECTURE
          </span>
          <div className="flex gap-0.5 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>

        <Link href={`/laptops/${laptop.id}`} className="mb-6 block">
          <CardTitle className="text-2xl font-black leading-[1.1] tracking-tight text-black transition-colors group-hover:text-primary">
            {laptop.name}
          </CardTitle>
        </Link>

        {/* Spec Overview - Direct visibility instead of Quick View */}
        <div className="mb-8 grid grid-cols-1 gap-2 border-l-4 border-zinc-100 pl-4">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <Cpu className="h-4 w-4 text-primary" /> {laptop.specifications?.processor}
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <Layers className="h-4 w-4 text-primary" /> {laptop.specifications?.ram} MEMORY
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <HardDrive className="h-4 w-4 text-primary" /> {laptop.specifications?.storage} SSD
            </div>
        </div>
        
        <div className="mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-zinc-400 mb-1">Pricing</span>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary leading-none tracking-tighter">
                  KES {laptop.price.toLocaleString()}
                </span>
                {laptop.oldPrice && (
                  <span className="mt-1 text-sm font-bold text-zinc-300 line-through">
                    KES {laptop.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <Link href={`/laptops/${laptop.id}`} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-300 transition-all hover:bg-black hover:text-white border-2 border-transparent hover:border-black">
               <Info className="h-6 w-6" />
            </Link>
        </div>
      </CardContent>

      {/* Primary Action Bar */}
      <CardFooter className="grid grid-cols-2 gap-4 p-8 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(laptop)} 
          className="h-16 rounded-3xl border-4 border-black font-black uppercase tracking-widest text-lg transition-all hover:bg-black hover:text-white active:scale-95"
          aria-label={`Add ${laptop.name} to cart`}
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>
        <Button 
          asChild 
          className="h-16 rounded-3xl bg-black font-black uppercase tracking-widest text-white border-4 border-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
            <Link href={`/laptops/${laptop.id}`}>
              Full Specs
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
