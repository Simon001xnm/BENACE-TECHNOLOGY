'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Accessory } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const { addToCart } = useCart();
  
  // Prioritize uploaded images over placeholders
  const displayImage = accessory.imageUrls && accessory.imageUrls.length > 0 
    ? accessory.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === accessory.imageId)?.imageUrl;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-black bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,186,242,1)]">
      {/* Sale Tag */}
      {accessory.salePercentage && (
        <div className="absolute left-3 top-3 z-10">
          <Badge className="bg-red-600 font-black text-white px-2 py-0.5 rounded-sm border-2 border-black text-[10px]">
            -{accessory.salePercentage}%
          </Badge>
        </div>
      )}

      {/* Image */}
      <CardHeader className="relative aspect-square p-0 overflow-hidden bg-zinc-50 border-b-2 border-black">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={accessory.name}
            fill
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
           <div className="flex h-full w-full items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-zinc-200" />
           </div>
        )}
        
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm font-black text-[9px] uppercase tracking-tighter border-black">
            {accessory.category}
          </Badge>
        </div>
      </CardHeader>

      {/* Details */}
      <CardContent className="flex flex-grow flex-col p-4">
        <span className="mb-1 text-[9px] font-black uppercase tracking-widest text-zinc-400">
          {accessory.brand}
        </span>
        <CardTitle className="mb-2 text-sm font-black leading-tight text-black group-hover:text-primary transition-colors">
          {accessory.name}
        </CardTitle>
        
        <div className="mt-auto flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-primary">
              KES {accessory.price.toLocaleString()}
            </span>
            {accessory.oldPrice && (
              <span className="text-xs font-bold text-zinc-400 line-through">
                KES {accessory.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => addToCart(accessory)} 
          className="h-10 border-2 border-black font-black uppercase text-[10px] transition-all hover:bg-black hover:text-white"
        >
          Cart
        </Button>
        <Button 
          asChild 
          size="sm"
          className="h-10 bg-black font-black uppercase text-[10px] text-white border-2 border-black hover:bg-primary hover:text-black"
        >
          <Link href="/checkout">
            Order
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
