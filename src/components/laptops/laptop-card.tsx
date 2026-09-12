'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LaptopCardProps {
  laptop: Laptop;
  variant?: 'grid' | 'deal' | 'list';
}

export function LaptopCard({ laptop, variant = 'deal' }: LaptopCardProps) {
  const { addToCart } = useCart();
  
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  const originalPrice = laptop.oldPrice || laptop.price * 1.25;
  const salePercentage = laptop.salePercentage || 20;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-md border border-zinc-200 bg-white transition-all hover:shadow-lg">
      <CardContent className="p-3 flex flex-col h-full space-y-2">
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-red-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-sm">
            {salePercentage}% OFF
          </Badge>
        </div>

        <Link href={`/laptops/${laptop.id}`} className="relative block aspect-square w-full overflow-hidden">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-contain p-1 transition-transform group-hover:scale-105 duration-500"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-50">
              <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-widest">No Image</span>
            </div>
          )}
        </Link>

        <div className="flex flex-col flex-grow space-y-1">
          <Link href={`/laptops/${laptop.id}`}>
            <h3 className="text-xs font-bold leading-tight text-zinc-900 line-clamp-2 group-hover:text-primary transition-colors">
              {laptop.brand} {laptop.name} - {laptop.specifications.processor}, {laptop.specifications.ram} RAM, {laptop.specifications.storage}
            </h3>
          </Link>

          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("h-2.5 w-2.5", i < 4 ? "fill-[#ffa41c] text-[#ffa41c]" : "text-zinc-200")} />
              ))}
            </div>
            <span className="text-[9px] text-zinc-400 font-medium">12,568</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-black text-black">
                KES {laptop.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-zinc-400 line-through">
                KES {originalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
          className="w-full h-7 rounded-md bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#e7af06] font-bold text-[10px] shadow-sm mt-auto py-0"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
