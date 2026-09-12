'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, ShoppingCart } from 'lucide-react';
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
      <CardContent className="p-4 flex flex-col h-full space-y-3">
        {/* Deal Badge */}
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-sm">
            {salePercentage}% OFF
          </Badge>
        </div>

        {/* Image Container */}
        <Link href={`/laptops/${laptop.id}`} className="relative block aspect-square w-full overflow-hidden">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-contain p-2 transition-transform group-hover:scale-105 duration-500"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-50">
              <span className="text-[10px] font-bold text-zinc-300">No Image</span>
            </div>
          )}
        </Link>

        {/* Info Section */}
        <div className="flex flex-col flex-grow space-y-2">
          <Link href={`/laptops/${laptop.id}`}>
            <h3 className="text-sm font-bold leading-tight text-zinc-900 line-clamp-2 group-hover:text-primary transition-colors">
              {laptop.brand} {laptop.name} - {laptop.specifications.processor}, {laptop.specifications.ram} RAM, {laptop.specifications.storage}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("h-3 w-3", i < 4 ? "fill-primary text-primary" : "text-zinc-200")} />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 font-medium">12,568</span>
          </div>

          {/* Pricing */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-black">
                KES {laptop.price.toLocaleString()}
              </span>
              <span className="text-xs text-zinc-400 line-through">
                KES {originalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
          className="w-full h-9 rounded-md bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-sm mt-auto"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
