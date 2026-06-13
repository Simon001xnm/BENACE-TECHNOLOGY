'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { useCompare } from '@/lib/compare-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, ShoppingCart, Truck, Cpu, HardDrive, Monitor, Layers, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface LaptopCardProps {
  laptop: Laptop;
  variant?: 'grid' | 'list';
}

export function LaptopCard({ laptop, variant = 'list' }: LaptopCardProps) {
  const { addToCart } = useCart();
  const { compareItems, addToCompare, removeFromCompare } = useCompare();
  
  const isSelectedForCompare = compareItems.some((item) => item.id === laptop.id);
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  if (variant === 'grid') {
    return (
      <Card className="group overflow-hidden border border-zinc-200 bg-white transition-all duration-300 rounded-none hover:shadow-lg flex flex-col h-full">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container - Top 75% of card height visually */}
          <div className="relative flex items-center justify-center bg-white overflow-hidden w-full aspect-square shrink-0">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <Checkbox 
                id={`compare-grid-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-4 w-4 border-zinc-300"
              />
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105 duration-700 p-6"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              )}
            </Link>
          </div>

          {/* Metadata Interface - Bottom Section */}
          <div className="flex-1 flex flex-col p-6 space-y-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{laptop.brand}</span>
              <Link href={`/laptops/${laptop.id}`}>
                <h3 className="text-lg font-bold leading-tight text-primary hover:underline transition-all line-clamp-2">
                  {laptop.name}
                </h3>
              </Link>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-black">KES {laptop.price.toLocaleString()}</span>
              {laptop.oldPrice && (
                <span className="text-xs font-medium text-zinc-400 line-through">KES {laptop.oldPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Scannable Spec Summary */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-2 border-t border-zinc-50">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-500">
                  <Cpu className="h-3 w-3 opacity-40 shrink-0" />
                  <span className="truncate">{laptop.specifications.processor.split(' ').slice(0, 2).join(' ')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-500">
                  <Layers className="h-3 w-3 opacity-40 shrink-0" />
                  <span>{laptop.specifications.ram}</span>
                </div>
            </div>

            <div className="mt-auto pt-4 flex items-center gap-2">
              <Button 
                onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
                className="flex-grow h-9 rounded-none bg-black text-white font-bold uppercase text-[9px] tracking-widest hover:bg-primary transition-all"
              >
                <ShoppingCart className="mr-2 h-3.5 w-3.5" /> Add
              </Button>
              <Button asChild variant="outline" className="h-9 w-9 rounded-none border-zinc-200 p-0 shrink-0">
                  <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border border-zinc-200 bg-white transition-all duration-300 rounded-none hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative flex items-center justify-center bg-white overflow-hidden w-full md:w-[45%] aspect-[4/3] shrink-0">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <Checkbox 
                id={`compare-list-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-4 w-4 border-zinc-300"
              />
              <label htmlFor={`compare-list-${laptop.id}`} className="text-[10px] font-bold text-zinc-500 cursor-pointer hover:text-black uppercase tracking-widest">
                Compare
              </label>
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105 duration-700 p-8"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              )}
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-between p-6 md:p-8 border-l border-zinc-100">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <Link href={`/laptops/${laptop.id}`}>
                  <h3 className="text-xl font-bold leading-tight text-primary hover:underline transition-all">
                    {laptop.brand} {laptop.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-3 w-3", i < 4 ? "fill-amber-400 text-amber-400" : "text-zinc-200")} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">4.2 (1038)</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-black">KES {laptop.price.toLocaleString()}</span>
                  {laptop.oldPrice && (
                    <span className="text-sm font-medium text-zinc-400 line-through">KES {laptop.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                  <Truck className="h-3.5 w-3.5" /> Free delivery by Tuesday
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-50">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-1">
                  Hardware Engine <span className="text-primary hover:underline cursor-pointer">Specs →</span>
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Processor', value: laptop.specifications.processor, icon: Cpu },
                    { label: 'RAM', value: laptop.specifications.ram, icon: Layers },
                    { label: 'Storage', value: laptop.specifications.storage, icon: HardDrive },
                    { label: 'Display', value: laptop.specifications.display, icon: Monitor }
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-zinc-600">
                      <spec.icon className="h-3.5 w-3.5 opacity-40 shrink-0" />
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button 
                onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
                className="flex-grow h-10 rounded-none bg-primary text-white font-bold uppercase text-[10px] tracking-widest hover:bg-black transition-all"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-none border-zinc-200 px-3">
                  <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                    <MessageSquare className="h-4 w-4" />
                  </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
