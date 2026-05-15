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
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function LaptopCard({ laptop }: { laptop: Laptop }) {
  const { addToCart } = useCart();
  
  // Prioritize uploaded images over placeholders
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  const getStatusClass = () => {
    switch (laptop.status) {
      case 'New': return 'bg-emerald-600';
      case 'Boxed': return 'bg-primary';
      case 'Ex-UK': return 'bg-zinc-800';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-black bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,186,242,1)]">
      {/* Sale Badge */}
      {laptop.salePercentage && (
        <div className="absolute left-3 top-3 z-10">
          <Badge className="bg-red-600 font-black text-white px-2 py-1 rounded-sm border-2 border-black">
            SAVE {laptop.salePercentage}%
          </Badge>
        </div>
      )}

      {/* Image Container */}
      <CardHeader className="relative aspect-[4/3] p-0 overflow-hidden bg-zinc-50">
        <Link href={`/laptops/${laptop.id}`} className="block h-full w-full">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-zinc-200" />
             </div>
          )}
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="translate-y-4 rounded-full bg-black p-4 text-white shadow-xl transition-transform duration-300 group-hover:translate-y-0 hover:bg-primary hover:text-black">
              <Eye className="h-6 w-6" />
            </div>
          </div>
        </Link>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 right-3">
          {laptop.status && (
            <Badge className={`${getStatusClass()} font-bold text-white px-3 py-1 rounded-none border-2 border-black`}>
              {laptop.status}
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-grow flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {laptop.brand}
          </span>
          <div className="flex gap-0.5 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
        </div>

        <Link href={`/laptops/${laptop.id}`} className="mb-3 block">
          <CardTitle className="text-lg font-black leading-tight text-black transition-colors group-hover:text-primary">
            {laptop.name}
          </CardTitle>
        </Link>

        <CardDescription className="mb-4 line-clamp-2 text-xs font-bold leading-relaxed text-zinc-600">
          {laptop.specifications.processor} • {laptop.specifications.ram} • {laptop.specifications.storage}
        </CardDescription>
        
        <div className="mt-auto flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-primary">
                KES {laptop.price.toLocaleString()}
              </span>
              {laptop.oldPrice && (
                <span className="text-sm font-bold text-zinc-400 line-through">
                  KES {laptop.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
              ✓ In Stock & Ready to Ship
            </p>
          </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(laptop)} 
          className="h-12 border-2 border-black font-black uppercase tracking-widest transition-all hover:bg-black hover:text-white"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <Button 
          asChild 
          className="h-12 bg-black font-black uppercase tracking-widest text-white transition-all hover:bg-primary hover:text-black border-2 border-black"
        >
            <Link href={`/laptops/${laptop.id}`}>
              Specs
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
