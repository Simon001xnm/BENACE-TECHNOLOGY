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
import { ShoppingCart, Info, Package } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  
  const displayImage = accessory.imageUrls && accessory.imageUrls.length > 0 
    ? accessory.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === accessory.imageId)?.imageUrl;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-none border border-zinc-100 bg-white transition-all duration-300 hover:z-10 hover:shadow-2xl">
      <CardHeader className="relative h-[300px] p-0 overflow-hidden bg-white">
        <Link href={`/laptops/${accessory.id}`} className="block h-full w-full">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={accessory.name}
              fill
              className="object-cover p-0 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center bg-zinc-50">
                <Package className="h-16 w-16 text-zinc-100" />
             </div>
          )}
        </Link>
        <Badge className="absolute bottom-4 left-4 bg-primary text-white border-none font-black text-[9px] uppercase tracking-widest rounded-none px-3 py-1">
          {accessory.category}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-6 border-t border-zinc-100">
        <span className="mb-1 text-[9px] font-black uppercase tracking-widest text-zinc-400">
          {accessory.brand} TECHNICAL
        </span>
        <Link href={`/laptops/${accessory.id}`}>
          <CardTitle className="mb-4 text-lg font-black leading-tight text-black hover:text-primary transition-all uppercase tracking-tight line-clamp-1">
            {accessory.name}
          </CardTitle>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-black text-black">
            KES {accessory.price.toLocaleString()}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="h-8 w-8 text-zinc-300 hover:text-primary"
          >
            <Link href={`/laptops/${accessory.id}`}>
              <Info className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => addToCart(accessory as any)} 
          className="w-full h-12 rounded-none bg-black font-black uppercase text-[10px] tracking-widest text-white hover:bg-primary transition-all"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
