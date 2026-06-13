'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { useCompare } from '@/lib/compare-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, ShoppingCart, Truck, CheckCircle2, Cpu, HardDrive, Monitor, Layers, ShieldCheck, Battery, Zap } from 'lucide-react';
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
      "group overflow-hidden border border-zinc-200 bg-white transition-all duration-200 rounded-xl hover:shadow-lg",
      viewMode === 'list' ? "w-full" : "h-full"
    )}>
      <CardContent className="p-6 md:p-8">
        <div className={cn(
          "flex flex-col gap-8",
          viewMode === 'list' ? "md:flex-row" : ""
        )}>
          {/* Top Control Bar */}
          <div className="flex items-center justify-between w-full md:absolute md:top-6 md:left-6 md:right-6 md:z-10 px-1">
            <div className="flex items-center gap-3">
              <Checkbox 
                id={`compare-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-5 w-5 border-zinc-300 data-[state=checked]:bg-primary"
              />
              <label htmlFor={`compare-${laptop.id}`} className="text-[11px] font-bold text-zinc-500 cursor-pointer hover:text-primary uppercase tracking-wider">
                Compare Gear
              </label>
            </div>
            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Item #{laptop.id.split('-').pop()}</span>
          </div>

          {/* Visual Engine Container */}
          <div className={cn(
            "relative flex items-center justify-center p-4 bg-zinc-50/50 rounded-lg",
            viewMode === 'list' ? "w-full md:w-72 aspect-square shrink-0" : "w-full aspect-square"
          )}>
            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105 duration-700"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              )}
            </Link>
            {laptop.status && (
               <Badge className="absolute bottom-4 left-4 bg-black text-white border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1.5">
                  {laptop.status}
               </Badge>
            )}
          </div>

          {/* Data Interface Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <Link href={`/laptops/${laptop.id}`}>
                  <h3 className="text-lg font-black leading-tight text-zinc-900 hover:text-primary transition-colors">
                    {laptop.brand} {laptop.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-3 w-3", i < 4 ? "fill-amber-400 text-amber-400" : "text-zinc-200")} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2">Verified Hardware</span>
                </div>
              </div>

              {/* High-Density Specification Stack */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl border border-zinc-100 bg-zinc-50/30">
                {[
                  { label: 'PROCESSOR', value: laptop.specifications.processor, icon: Cpu },
                  { label: 'MEMORY', value: laptop.specifications.ram, icon: Layers },
                  { label: 'STORAGE', value: laptop.specifications.storage, icon: HardDrive },
                  { label: 'GRAPHICS', value: laptop.specifications.graphics || 'Integrated', icon: Zap },
                  { label: 'DISPLAY', value: laptop.specifications.display, icon: Monitor },
                  { label: 'BATTERY', value: laptop.specifications.battery || 'Long-Life', icon: Battery },
                  { label: 'WEIGHT', value: laptop.specifications.weight || 'Lightweight', icon: ShieldCheck }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 opacity-40">
                      <spec.icon className="h-3 w-3" />
                      <span className="text-[9px] font-black uppercase tracking-[0.1em]">{spec.label}</span>
                    </div>
                    <span className="text-[11px] font-bold text-zinc-700 truncate">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-6 pt-6 border-t border-zinc-100">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-black">KES {laptop.price.toLocaleString()}</span>
                  {laptop.oldPrice && (
                    <span className="text-sm font-bold text-zinc-300 line-through">KES {laptop.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    <CheckCircle2 className="h-3 w-3" /> In Stock & Ready
                  </p>
                  <p className="flex items-center gap-1.5 text-[10px] font-black text-cyan-600 uppercase tracking-widest">
                    <Truck className="h-3 w-3" /> Free Delivery
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <Input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 h-12 rounded-lg border-zinc-200 text-center font-black"
                  min="1"
                />
                <Button 
                  onClick={() => addToCart({ ...laptop, quantity } as any)}
                  className="flex-grow lg:flex-none px-10 h-12 rounded-lg bg-red-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all"
                >
                  <ShoppingCart className="mr-3 h-4 w-4" /> Add to Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
