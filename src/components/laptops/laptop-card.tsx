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
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
      <Card className="group overflow-hidden border border-zinc-200 bg-white hover:border-primary/30 hover:shadow-md transition-all">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-64 aspect-[4/3] md:aspect-square bg-white border-r flex items-center justify-center p-6 group-hover:bg-zinc-50 transition-colors">
              <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
                {displayImage && (
                  <Image
                    src={displayImage}
                    alt={laptop.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                )}
              </Link>
              {laptop.status && (
                <Badge className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-emerald-600">
                  {laptop.status}
                </Badge>
              )}
            </div>

            {/* Details Section */}
            <div className="flex-1 p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-grow">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{laptop.brand}</p>
                <Link href={`/laptops/${laptop.id}`}>
                  <h3 className="text-lg font-bold leading-tight hover:text-primary transition-colors line-clamp-2">
                    {laptop.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mt-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] font-bold text-zinc-400 ml-1">20+ Reviews</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight">Key Features:</p>
                  <ul className="text-xs text-zinc-600 space-y-0.5 list-disc list-inside">
                    <li>{laptop.specifications?.processor}</li>
                    <li>{laptop.specifications?.ram} Memory</li>
                    <li>{laptop.specifications?.storage} Storage</li>
                    <li>{laptop.specifications?.display}</li>
                  </ul>
                </div>
              </div>

              {/* Price & Cart Section */}
              <div className="w-full md:w-48 flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-zinc-100 pt-6 md:pt-0 md:pl-6">
                <div className="text-right">
                  <p className="text-2xl font-black text-zinc-900 leading-none">
                    KSH {laptop.price.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-1">Inclusive of all taxes</p>
                  <div className="mt-4 flex flex-col gap-1 items-end">
                     <span className="text-[10px] font-bold text-emerald-600 uppercase">In Stock</span>
                     <span className="text-[10px] font-bold text-zinc-400 uppercase">Ready for Pickup</span>
                  </div>
                </div>

                <Button 
                  onClick={() => addToCart(laptop as any)}
                  className="w-full mt-6 bg-[#28a745] hover:bg-[#218838] text-white font-bold h-11"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group flex flex-col border border-zinc-200 bg-white hover:border-primary/30 hover:shadow-md transition-all rounded-none overflow-hidden h-full">
      {/* Visual Header */}
      <div className="relative aspect-square bg-white flex items-center justify-center p-8 transition-colors group-hover:bg-zinc-50">
        <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
          {displayImage && (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
          )}
        </Link>
        {laptop.status && (
          <Badge className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-zinc-900">
            {laptop.status}
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-grow flex-col p-5 border-t border-zinc-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{laptop.brand}</p>
        <Link href={`/laptops/${laptop.id}`} className="flex-grow">
          <h3 className="text-sm font-bold leading-snug hover:text-primary transition-colors line-clamp-2 h-10">
            {laptop.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 my-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[9px] font-bold text-zinc-400 ml-1">21 Reviews</span>
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-4">
          <div>
             <p className="text-xl font-black text-zinc-900">
               KSH {laptop.price.toLocaleString()}
             </p>
             {laptop.oldPrice && (
               <p className="text-[10px] text-zinc-400 line-through">KSH {laptop.oldPrice.toLocaleString()}</p>
             )}
          </div>
          
          <Button 
            onClick={() => addToCart(laptop as any)}
            className="w-full bg-[#28a745] hover:bg-[#218838] text-white font-bold h-10 text-xs"
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-2" /> Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}