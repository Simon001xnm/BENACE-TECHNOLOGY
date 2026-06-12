'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart, Eye, Star, Info } from 'lucide-react';
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
      {/* Visual Badge */}
      {laptop.salePercentage && (
        <div className="absolute left-6 top-6 z-20">
          <Badge className="bg-red-600 font-black text-white px-4 py-1.5 rounded-full border-2 border-black text-xs">
            -{laptop.salePercentage}% OFF
          </Badge>
        </div>
      )}

      {/* Glossy Image Container */}
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
          
          <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
            <div className="translate-y-10 rounded-full bg-black p-6 text-white shadow-2xl transition-all duration-500 group-hover:translate-y-0 hover:bg-primary hover:text-white">
              <Eye className="h-8 w-8" />
            </div>
          </div>
        </Link>
        
        {/* Android-style Status Badge */}
        <div className="absolute bottom-6 left-6">
          {laptop.status && (
            <Badge className={cn("font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 text-[10px]", getStatusStyle())}>
              {laptop.status}
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Premium Content */}
      <CardContent className="flex flex-grow flex-col p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {laptop.brand}
          </span>
          <div className="flex gap-1 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>

        <Link href={`/laptops/${laptop.id}`} className="mb-4 block">
          <CardTitle className="text-2xl font-black leading-[1.1] tracking-tight text-black transition-colors group-hover:text-primary">
            {laptop.name}
          </CardTitle>
        </Link>

        <div className="mb-6 flex flex-wrap gap-2">
            {[laptop.specifications?.ram, laptop.specifications?.storage].filter(Boolean).map((spec, i) => (
              <span key={i} className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black uppercase text-zinc-500 border border-zinc-200">
                {spec}
              </span>
            ))}
        </div>
        
        <div className="mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-zinc-400 mb-1">Price</span>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary leading-none">
                  KES {laptop.price.toLocaleString()}
                </span>
                {laptop.oldPrice && (
                  <span className="mt-1 text-sm font-bold text-zinc-300 line-through">
                    KES {laptop.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
               <Info className="h-6 w-6" />
            </div>
        </div>
      </CardContent>

      {/* Action Bar */}
      <CardFooter className="grid grid-cols-2 gap-4 p-8 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(laptop)} 
          className="h-16 rounded-3xl border-4 border-black font-black uppercase tracking-widest text-lg transition-all hover:bg-black hover:text-white active:scale-95"
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>
        <Button 
          asChild 
          className="h-16 rounded-3xl bg-black font-black uppercase tracking-widest text-white border-4 border-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
            <Link href={`/laptops/${laptop.id}`}>
              Specs
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
