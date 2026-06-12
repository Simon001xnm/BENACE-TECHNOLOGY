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
 * Version 1255 Accessory Card
 * Designed to match the premium tech aesthetic without redundant Quick Views.
 */
export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  
  const displayImage = accessory.imageUrls && accessory.imageUrls.length > 0 
    ? accessory.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === accessory.imageId)?.imageUrl;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border-4 border-black bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,186,242,1)]">
      {/* Performance Tag */}
      {accessory.salePercentage && (
        <div className="absolute left-6 top-6 z-10">
          <Badge className="bg-red-600 font-black text-white px-3 py-1.5 rounded-full border-2 border-black text-[10px] shadow-md">
            -{accessory.salePercentage}%
          </Badge>
        </div>
      )}

      {/* Visual Engine Container */}
      <CardHeader className="relative aspect-square p-0 overflow-hidden bg-zinc-50 border-b-4 border-black">
        <Link href={`/laptops/${accessory.id}`} className="block h-full w-full">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={accessory.name}
              fill
              className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center">
                <Package className="h-16 w-16 text-zinc-200" />
             </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
             <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-black ring-2 ring-black shadow-xl">
                Explore Gear <ArrowRight className="h-3 w-3" />
             </div>
          </div>
        </Link>
        
        <div className="absolute bottom-6 left-6">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm font-black text-[9px] uppercase tracking-[0.2em] border-2 border-black rounded-full px-4 py-1">
            {accessory.category}
          </Badge>
        </div>
      </CardHeader>

      {/* Metadata Interface */}
      <CardContent className="flex flex-grow flex-col p-8">
        <span className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {accessory.brand} PERIPHERALS
        </span>
        <Link href={`/laptops/${accessory.id}`}>
          <CardTitle className="mb-6 text-xl font-black leading-tight text-black group-hover:text-primary transition-colors">
            {accessory.name}
          </CardTitle>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary tracking-tighter">
              KES {accessory.price.toLocaleString()}
            </span>
            {accessory.oldPrice && (
              <span className="text-xs font-bold text-zinc-300 line-through">
                KES {accessory.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Link href={`/laptops/${accessory.id}`} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-300 hover:bg-black hover:text-white transition-all shadow-sm">
            <Info className="h-6 w-6" />
          </Link>
        </div>
      </CardContent>

      {/* Tactile Controls */}
      <CardFooter className="grid grid-cols-2 gap-4 p-8 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(accessory as any)} 
          className="h-14 rounded-2xl border-2 border-black font-black uppercase text-xs transition-all hover:bg-black hover:text-white"
        >
          Add to Cart
        </Button>
        <Button 
          asChild 
          className="h-14 rounded-2xl bg-black font-black uppercase text-xs text-white border-2 border-black hover:bg-primary hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Link href="/checkout">
            Checkout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
