'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart, Star, Cpu, HardDrive, Monitor, Layers, Checkbox as CheckboxIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface LaptopCardProps {
  laptop: Laptop;
  viewMode?: 'grid' | 'list';
}

export function LaptopCard({ laptop, viewMode = 'grid' }: LaptopCardProps) {
  const { addToCart } = useCart();
  
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  if (viewMode === 'list') {
    return (
      <Card className="group overflow-hidden border border-zinc-200 bg-white hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Visual Section */}
            <div className="relative w-full md:w-72 aspect-square bg-white flex items-center justify-center p-8 transition-colors group-hover:bg-zinc-50/50">
              <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
                {displayImage && (
                  <Image
                    src={displayImage}
                    alt={laptop.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 288px"
                  />
                )}
              </Link>
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {laptop.status && (
                  <Badge className="text-[9px] font-black uppercase tracking-wider bg-black text-white px-3">
                    {laptop.status}
                  </Badge>
                )}
                <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-2 py-1 border border-zinc-100 shadow-sm">
                   <Checkbox id={`compare-${laptop.id}`} className="h-3 w-3 border-zinc-300" />
                   <label htmlFor={`compare-${laptop.id}`} className="text-[9px] font-bold uppercase text-zinc-500 cursor-pointer">Compare</label>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-grow space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{laptop.brand}</p>
                  <Link href={`/laptops/${laptop.id}`}>
                    <h3 className="text-xl font-bold leading-tight hover:text-primary transition-colors line-clamp-2">
                      {laptop.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] font-bold text-zinc-400 ml-2 uppercase tracking-widest">Verified Specs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Cpu className="h-4 w-4 text-zinc-300" />
                    <span className="font-medium">{laptop.specifications?.processor || 'Standard Processor'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Layers className="h-4 w-4 text-zinc-300" />
                    <span className="font-medium">{laptop.specifications?.ram || '8GB RAM'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <HardDrive className="h-4 w-4 text-zinc-300" />
                    <span className="font-medium">{laptop.specifications?.storage || '256GB SSD'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Monitor className="h-4 w-4 text-zinc-300" />
                    <span className="font-medium">{laptop.specifications?.display || 'HD Display'}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 italic leading-relaxed pt-2">
                   {laptop.description || "Premium technical hardware engineered for maximum productivity and long-term reliability."}
                </p>
              </div>

              {/* Action Section */}
              <div className="w-full md:w-56 flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-zinc-100 pt-6 md:pt-0 md:pl-8">
                <div className="text-right w-full">
                  <p className="text-3xl font-black text-black tracking-tighter">
                    KES {laptop.price.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-emerald-600 mt-2 uppercase font-black flex items-center justify-end gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Ready for Delivery
                  </p>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Button 
                    onClick={() => addToCart(laptop as any)}
                    className="w-full bg-black hover:bg-primary text-white hover:text-black font-black uppercase tracking-widest h-12 text-xs transition-all"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                  <Button asChild variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <Link href={`/laptops/${laptop.id}`}>Full Specifications</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group flex flex-col border border-zinc-200 bg-white hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden h-full">
      <div className="relative aspect-square bg-white flex items-center justify-center p-10 transition-colors group-hover:bg-zinc-50/50">
        <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
          {displayImage && (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
          )}
        </Link>
        {laptop.status && (
          <Badge className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider bg-black text-white px-3">
            {laptop.status}
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-grow flex-col p-6 border-t border-zinc-50">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{laptop.brand}</p>
        <Link href={`/laptops/${laptop.id}`} className="flex-grow">
          <h3 className="text-sm font-bold leading-snug hover:text-primary transition-colors line-clamp-2 mb-4">
            {laptop.name}
          </h3>
        </Link>
        
        <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
              <Cpu className="h-3 w-3" />
              <span className="truncate">{laptop.specifications?.processor.split(' ').slice(-1)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
              <Layers className="h-3 w-3" />
              <span>{laptop.specifications?.ram}</span>
            </div>
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-4">
          <p className="text-2xl font-black text-black tracking-tighter">
            KES {laptop.price.toLocaleString()}
          </p>
          <Button 
            onClick={() => addToCart(laptop as any)}
            className="w-full bg-black hover:bg-primary text-white hover:text-black font-black uppercase tracking-widest h-11 text-[10px]"
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-2" /> Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
