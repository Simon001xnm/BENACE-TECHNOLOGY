'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { useCompare } from '@/lib/compare-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, List, ShoppingCart, Truck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LaptopCardProps {
  laptop: Laptop;
  viewMode?: 'grid' | 'list';
}

export function LaptopCard({ laptop, viewMode = 'list' }: LaptopCardProps) {
  const { addToCart } = useCart();
  const { compareItems, addToCompare, removeFromCompare } = useCompare();
  const [quantity, setQuantity] = useState(1);
  
  const isSelectedForCompare = compareItems.some((item) => item.id === laptop.id);
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  return (
    <Card className={cn(
      "group overflow-hidden border-none bg-white transition-all duration-300 rounded-[2rem] shadow-soft hover:shadow-xl",
      viewMode === 'list' ? "w-full" : "h-full"
    )}>
      <CardContent className="p-6 md:p-8">
        <div className={cn(
          "flex flex-col gap-6",
          viewMode === 'list' ? "md:flex-row md:items-start" : ""
        )}>
          {/* Top Metadata Row */}
          <div className="flex items-center justify-between w-full md:absolute md:top-6 md:left-6 md:right-6 md:z-10">
            <div className="flex items-center gap-2">
              <Checkbox 
                id={`compare-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="border-zinc-300"
              />
              <label htmlFor={`compare-${laptop.id}`} className="text-[11px] font-bold text-zinc-500 cursor-pointer hover:text-primary">
                Compare
              </label>
            </div>
            <div className="flex items-center gap-2">
               {laptop.salePercentage && (
                  <Badge className="bg-[#f2e8f5] text-[#8e44ad] border-none font-bold text-[10px] px-3">
                    {laptop.salePercentage}% off
                  </Badge>
               )}
               <List className="h-4 w-4 text-zinc-300" />
            </div>
          </div>

          {/* Visual Section */}
          <div className={cn(
            "relative flex items-center justify-center p-4 transition-transform group-hover:scale-105 duration-500",
            viewMode === 'list' ? "w-full md:w-64 aspect-square" : "w-full aspect-square"
          )}>
            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              )}
            </Link>
            {laptop.status && (
               <Badge className="absolute bottom-0 left-0 bg-[#fff1f2] text-[#e11d48] border-none font-bold text-[9px] uppercase tracking-wider px-3 py-1">
                  {laptop.status}
               </Badge>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-4">
            <div>
              <Link href={`/laptops/${laptop.id}`}>
                <h3 className="text-sm font-medium leading-relaxed text-zinc-800 hover:text-primary transition-colors line-clamp-2">
                  {laptop.name}, {laptop.specifications?.processor}, {laptop.specifications?.ram} Memory, {laptop.specifications?.storage} SSD, Windows 11
                </h3>
              </Link>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-3 w-3", i < 4 ? "fill-amber-400 text-amber-400" : "text-zinc-200")} />
                ))}
                <span className="text-xs font-bold text-zinc-400 ml-2">2 Reviews</span>
              </div>
            </div>

            {/* Hardware Summary Hub */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 py-2 border-t border-b border-zinc-50">
              {[
                { label: 'CPU', value: laptop.specifications.processor },
                { label: 'RAM', value: laptop.specifications.ram },
                { label: 'SSD', value: laptop.specifications.storage },
                { label: 'LCD', value: laptop.specifications.display }
              ].map((spec) => (
                <div key={spec.label} className="flex flex-col">
                  <span className="text-[9px] font-black text-zinc-300 uppercase">{spec.label}</span>
                  <span className="text-[10px] font-bold text-zinc-600 truncate">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-black">KES {laptop.price.toLocaleString()}</span>
                {laptop.oldPrice && (
                  <span className="text-sm text-zinc-300 line-through">KES {laptop.oldPrice.toLocaleString()}</span>
                )}
              </div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-600 uppercase tracking-wide">
                <Truck className="h-3 w-3" />
                Free 1-2 day delivery
              </p>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-2 pt-2">
              <Input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 h-12 rounded-xl border-zinc-200 text-center font-bold"
                min="1"
              />
              <Button 
                onClick={() => addToCart({ ...laptop, quantity } as any)}
                className="flex-grow h-12 rounded-full bg-red-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-md"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
