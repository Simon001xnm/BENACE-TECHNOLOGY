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
      "group overflow-hidden border-none bg-white transition-all duration-300 rounded-3xl hover:shadow-2xl",
      viewMode === 'list' ? "w-full" : "h-full"
    )}>
      <CardContent className="p-0">
        <div className={cn(
          "flex flex-col",
          viewMode === 'list' ? "md:flex-row" : ""
        )}>
          {/* Visual Engine Container - Takes 75% visual weight in grid, or large side in list */}
          <div className={cn(
            "relative flex items-center justify-center bg-transparent overflow-hidden",
            viewMode === 'list' ? "w-full md:w-[45%] aspect-[4/3] shrink-0" : "w-full aspect-square"
          )}>
             {/* Top Control Overlay */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
              <Checkbox 
                id={`compare-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-5 w-5 border-zinc-200 bg-white/80 backdrop-blur-sm data-[state=checked]:bg-primary"
              />
              <label htmlFor={`compare-${laptop.id}`} className="text-[10px] font-black text-zinc-500 cursor-pointer hover:text-primary uppercase tracking-widest bg-white/50 px-2 py-1 rounded-full backdrop-blur-sm">
                Compare
              </label>
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full p-4">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-110 duration-1000"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              )}
            </Link>
            
            {laptop.status && (
               <Badge className="absolute bottom-6 right-6 bg-black/90 text-white border-none font-black text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full backdrop-blur-sm">
                  {laptop.status}
               </Badge>
            )}
          </div>

          {/* Data Interface Section */}
          <div className="flex-1 flex flex-col justify-between p-8 md:p-10">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{laptop.brand}</span>
                   <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">SKU: {laptop.id.split('-').pop()}</span>
                </div>
                <Link href={`/laptops/${laptop.id}`}>
                  <h3 className="text-2xl font-black leading-tight text-zinc-900 hover:text-primary transition-colors tracking-tight">
                    {laptop.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-3 w-3", i < 4 ? "fill-amber-400 text-amber-400" : "text-zinc-100")} />
                    ))}
                  </div>
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-2">Premium Grade Hardware</span>
                </div>
              </div>

              {/* High-Density Specification Stack */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl border border-zinc-50 bg-zinc-50/50">
                {[
                  { label: 'CPU', value: laptop.specifications.processor, icon: Cpu },
                  { label: 'RAM', value: laptop.specifications.ram, icon: Layers },
                  { label: 'DISK', value: laptop.specifications.storage, icon: HardDrive },
                  { label: 'DISPLAY', value: laptop.specifications.display, icon: Monitor }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-1 opacity-50">
                      <spec.icon className="h-3 w-3 text-primary" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em]">{spec.label}</span>
                    </div>
                    <span className="text-[12px] font-bold text-zinc-800 truncate">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-8 pt-8 border-t border-zinc-100/50">
              <div className="flex flex-col gap-1 w-full lg:w-auto">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-black tracking-tighter">KES {laptop.price.toLocaleString()}</span>
                  {laptop.oldPrice && (
                    <span className="text-sm font-bold text-zinc-300 line-through">KES {laptop.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <p className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    <CheckCircle2 className="h-3.5 w-3.5" /> In Stock
                  </p>
                  <p className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    <Truck className="h-3.5 w-3.5" /> Priority Delivery
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto">
                <Input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 h-14 rounded-2xl border-zinc-100 bg-zinc-50 text-center font-black text-lg focus-visible:ring-primary/20"
                  min="1"
                />
                <Button 
                  onClick={() => addToCart({ ...laptop, quantity } as any)}
                  className="flex-grow lg:flex-none px-12 h-14 rounded-2xl bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-black transition-all shadow-xl hover:-translate-y-1"
                >
                  <ShoppingCart className="mr-3 h-5 w-5" /> Add to Hub Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
