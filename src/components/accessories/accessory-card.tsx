'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Accessory } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Package } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  
  const displayImage = accessory.imageUrls && accessory.imageUrls.length > 0 
    ? accessory.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === accessory.imageId)?.imageUrl;

  const originalPrice = accessory.oldPrice || accessory.price * 1.25;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-none border-none bg-white transition-all hover:z-10 hover:shadow-2xl">
      <CardContent className="p-1.5 flex flex-col h-full space-y-1">
        <div className="absolute top-1.5 left-1.5 z-10">
          <Badge className="bg-primary text-white font-black text-[6px] px-1 py-0.5 rounded-none uppercase leading-none">
            {accessory.category || 'GEAR'}
          </Badge>
        </div>

        <Link href={`/laptops/${accessory.id}`} className="relative block aspect-square w-full overflow-hidden bg-zinc-50/50">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={accessory.name}
              fill
              className="object-contain p-2 transition-transform group-hover:scale-110 duration-700"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-50">
              <Package className="h-4 w-4 text-zinc-200" />
            </div>
          )}
        </Link>

        <div className="flex flex-col flex-grow space-y-0.5 pt-1">
          <Link href={`/laptops/${accessory.id}`}>
            <h3 className="text-[9px] font-bold leading-[1.1] text-zinc-900 line-clamp-2 group-hover:text-primary transition-colors uppercase tracking-tighter">
              {accessory.brand} {accessory.name}
            </h3>
          </Link>

          <div className="flex items-center gap-0.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-1.5 w-1.5 fill-[#ffa41c] text-[#ffa41c]" />
              ))}
            </div>
            <span className="text-[7px] text-zinc-400 font-bold">100%</span>
          </div>

          <div className="flex flex-col mt-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-black text-black">
                KES {accessory.price.toLocaleString()}
              </span>
              <span className="text-[7px] text-zinc-400 line-through font-medium">
                {originalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => addToCart({ ...accessory, quantity: 1 } as any)}
          className="w-full h-6 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground border border-primary font-black text-[8px] uppercase tracking-widest shadow-sm mt-auto py-0"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
