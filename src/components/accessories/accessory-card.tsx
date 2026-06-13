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
import type { Accessory } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart, Info, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

/**
 * Accessory Card - Version 1255 Balanced
 * Image takes 75% visual dominance, NO BORDERS.
 */
export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  
  const displayImage = accessory.imageUrls && accessory.imageUrls.length > 0 
    ? accessory.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === accessory.imageId)?.imageUrl;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border-none bg-white transition-all duration-500 hover:shadow-2xl">
      {/* Visual Engine Container - 75% focus, NO BORDERS */}
      <CardHeader className="relative aspect-square p-0 overflow-hidden bg-transparent">
        <Link href={`/laptops/${accessory.id}`} className="block h-full w-full p-10">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={accessory.name}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center">
                <Package className="h-16 w-16 text-zinc-50" />
             </div>
          )}
        </Link>
        
        <div className="absolute bottom-6 left-10 z-20">
          <Badge variant="outline" className="bg-zinc-50/50 backdrop-blur-sm font-bold text-[9px] uppercase tracking-[0.2em] border-none rounded-full px-4 py-1.5">
            {accessory.category}
          </Badge>
        </div>
      </CardHeader>

      {/* Balanced Metadata Interface */}
      <CardContent className="flex flex-grow flex-col p-10 pt-4">
        <span className="mb-2 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300">
          {accessory.brand} TECHNICAL
        </span>
        <Link href={`/laptops/${accessory.id}`}>
          <CardTitle className="mb-10 text-2xl font-black leading-tight text-zinc-900 group-hover:text-primary transition-colors tracking-tighter">
            {accessory.name}
          </CardTitle>
        </Link>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-50">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-black tracking-tighter">
              KES {accessory.price.toLocaleString()}
            </span>
          </div>
          <Link href={`/laptops/${accessory.id}`} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-200 hover:bg-black hover:text-white transition-all">
            <Info className="h-6 w-6" />
          </Link>
        </div>
      </CardContent>

      {/* Tactile Controls */}
      <CardFooter className="grid grid-cols-2 gap-4 p-10 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(accessory as any)} 
          className="h-14 rounded-2xl border-none bg-zinc-50 font-black uppercase text-[10px] tracking-widest text-zinc-400 hover:bg-zinc-100"
        >
          Add to Cart
        </Button>
        <Button 
          asChild 
          className="h-14 rounded-2xl bg-black font-black uppercase text-[10px] tracking-widest text-white hover:bg-primary transition-all shadow-lg"
        >
          <Link href="/checkout">
            Checkout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
