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
 * Accessory Card - Version 1255 Refined
 * Removed all borders from image container, image takes 75% of container area.
 */
export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  
  const displayImage = accessory.imageUrls && accessory.imageUrls.length > 0 
    ? accessory.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === accessory.imageId)?.imageUrl;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border-none bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* Performance Tag */}
      {accessory.salePercentage && (
        <div className="absolute left-6 top-6 z-20">
          <Badge className="bg-red-600 font-black text-white px-4 py-2 rounded-full border-none text-[10px] shadow-lg">
            -{accessory.salePercentage}% SAVINGS
          </Badge>
        </div>
      )}

      {/* Visual Engine Container - 75% focus on image */}
      <CardHeader className="relative aspect-square p-0 overflow-hidden bg-transparent">
        <Link href={`/laptops/${accessory.id}`} className="block h-full w-full p-8">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={accessory.name}
              fill
              className="object-contain p-6 transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center">
                <Package className="h-20 w-20 text-zinc-100" />
             </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
             <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-6 py-3 text-[10px] font-black uppercase tracking-widest text-black shadow-2xl">
                Technical Details <ArrowRight className="h-4 w-4" />
             </div>
          </div>
        </Link>
        
        <div className="absolute bottom-6 left-6 z-20">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm font-black text-[9px] uppercase tracking-[0.2em] border-none rounded-full px-4 py-2 shadow-sm">
            {accessory.category}
          </Badge>
        </div>
      </CardHeader>

      {/* Metadata Interface */}
      <CardContent className="flex flex-grow flex-col p-10 pt-4">
        <span className="mb-2 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
          {accessory.brand} TECHNICAL GEAR
        </span>
        <Link href={`/laptops/${accessory.id}`}>
          <CardTitle className="mb-8 text-2xl font-black leading-tight text-zinc-900 group-hover:text-primary transition-colors tracking-tight">
            {accessory.name}
          </CardTitle>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-black tracking-tighter">
              KES {accessory.price.toLocaleString()}
            </span>
            {accessory.oldPrice && (
              <span className="text-sm font-bold text-zinc-300 line-through">
                KES {accessory.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Link href={`/laptops/${accessory.id}`} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-300 hover:bg-black hover:text-white transition-all shadow-sm">
            <Info className="h-7 w-7" />
          </Link>
        </div>
      </CardContent>

      {/* Tactile Controls */}
      <CardFooter className="grid grid-cols-2 gap-4 p-10 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(accessory as any)} 
          className="h-14 rounded-2xl border-2 border-zinc-100 bg-white font-black uppercase text-[10px] tracking-widest transition-all hover:bg-zinc-50"
        >
          Add to Cart
        </Button>
        <Button 
          asChild 
          className="h-14 rounded-2xl bg-black font-black uppercase text-[10px] tracking-widest text-white hover:bg-primary hover:text-black shadow-xl transition-all"
        >
          <Link href="/checkout">
            Checkout Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
