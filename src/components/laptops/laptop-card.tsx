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
      <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:border-primary hover:shadow-xl">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container - Top 75% height visually */}
          <div className="relative flex items-center justify-center bg-white overflow-hidden w-full aspect-square shrink-0">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <Checkbox 
                id={`compare-grid-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-5 w-5 rounded-md"
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

          {/* Info Section - Bottom 25% height visually */}
          <div className="flex-1 flex flex-col p-6 space-y-4 border-t bg-zinc-50/30">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{laptop.brand}</span>
              <Link href={`/laptops/${laptop.id}`}>
                <h3 className="text-base font-bold leading-tight text-black hover:text-primary transition-all line-clamp-2 uppercase tracking-tight">
                  {laptop.name}
                </h3>
              </Link>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-black">KES {laptop.price.toLocaleString()}</span>
              {laptop.oldPrice && (
                <span className="text-xs font-bold text-zinc-400 line-through">KES {laptop.oldPrice.toLocaleString()}</span>
              )}
            </div>

            <div className="mt-auto flex items-center gap-3">
              <Button 
                onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
                className="flex-grow h-11 rounded-full bg-black text-white font-bold uppercase text-[10px] tracking-widest hover:bg-primary transition-all"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button asChild variant="outline" className="h-11 w-11 rounded-full p-0 shrink-0 border-zinc-200 hover:border-primary transition-all">
                  <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                    <MessageSquare className="h-4 w-4" />
                  </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:border-primary hover:shadow-xl">
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
                className="h-5 w-5 rounded-md"
              />
              <label htmlFor={`compare-list-${laptop.id}`} className="text-[10px] font-bold text-zinc-400 cursor-pointer hover:text-primary uppercase tracking-widest">
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

          <div className="flex-1 flex flex-col justify-between p-8 md:p-10 border-t md:border-t-0 md:border-l">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <Link href={`/laptops/${laptop.id}`}>
                  <h3 className="text-2xl font-black leading-tight text-black hover:text-primary transition-all uppercase tracking-tight">
                    {laptop.brand} {laptop.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-3 w-3", i < 4 ? "fill-primary text-primary" : "text-zinc-200")} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-l pl-3">Clean & Tested</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-black">KES {laptop.price.toLocaleString()}</span>
                  {laptop.oldPrice && (
                    <span className="text-sm font-bold text-zinc-400 line-through">KES {laptop.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                  <Truck className="h-4 w-4" /> Fast Delivery in Nairobi
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t">
                <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Technical Specs</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { label: 'Processor', value: laptop.specifications.processor, icon: Cpu },
                    { label: 'RAM', value: laptop.specifications.ram, icon: Layers },
                    { label: 'Storage', value: laptop.specifications.storage, icon: HardDrive },
                    { label: 'Display', value: laptop.specifications.display, icon: Monitor }
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-medium text-zinc-600">
                      <spec.icon className="h-4 w-4 text-primary shrink-0 opacity-70" />
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <Button 
                onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
                className="flex-grow h-14 rounded-full bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-primary transition-all"
              >
                <ShoppingCart className="mr-3 h-5 w-5" /> Buy this Laptop
              </Button>
              <Button asChild variant="outline" className="h-14 w-14 rounded-full border-zinc-200 hover:border-primary transition-all">
                  <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                    <MessageSquare className="h-6 w-6" />
                  </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
