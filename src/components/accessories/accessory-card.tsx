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
import { ShoppingCart, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  
  const displayImage = accessory.imageUrls && accessory.imageUrls.length > 0 
    ? accessory.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === accessory.imageId)?.imageUrl;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border-4 border-black bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,186,242,1)]">
      {/* Sale Tag */}
      {accessory.salePercentage && (
        <div className="absolute left-4 top-4 z-10">
          <Badge className="bg-red-600 font-black text-white px-3 py-1 rounded-full border-2 border-black text-[10px]">
            -{accessory.salePercentage}%
          </Badge>
        </div>
      )}

      {/* Direct Link Header */}
      <CardHeader className="relative aspect-square p-0 overflow-hidden bg-zinc-50 border-b-4 border-black">
        <Link href={`/laptops/${accessory.id}`} className="block h-full w-full">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={accessory.name}
              fill
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-zinc-200" />
             </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
             <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[9px] font-black uppercase tracking-widest text-black ring-2 ring-black">
                Details <ArrowRight className="h-3 w-3" />
             </div>
          </div>
        </Link>
        
        <div className="absolute bottom-4 left-4">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm font-black text-[9px] uppercase tracking-widest border-2 border-black rounded-full px-3">
            {accessory.category}
          </Badge>
        </div>
      </CardHeader>

      {/* Details */}
      <CardContent className="flex flex-grow flex-col p-6">
        <span className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          {accessory.brand}
        </span>
        <Link href={`/laptops/${accessory.id}`}>
          <CardTitle className="mb-4 text-lg font-black leading-tight text-black group-hover:text-primary transition-colors">
            {accessory.name}
          </CardTitle>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary">
              KES {accessory.price.toLocaleString()}
            </span>
            {accessory.oldPrice && (
              <span className="text-xs font-bold text-zinc-300 line-through">
                KES {accessory.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Link href={`/laptops/${accessory.id}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-300 hover:bg-black hover:text-white transition-colors">
            <Info className="h-5 w-5" />
          </Link>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="grid grid-cols-2 gap-4 p-6 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(accessory)} 
          className="h-12 rounded-2xl border-2 border-black font-black uppercase text-xs transition-all hover:bg-black hover:text-white"
        >
          Cart
        </Button>
        <Button 
          asChild 
          className="h-12 rounded-2xl bg-black font-black uppercase text-xs text-white border-2 border-black hover:bg-primary hover:text-black"
        >
          <Link href="/checkout">
            Order
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}