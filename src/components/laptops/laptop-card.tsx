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
      <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white transition-all duration-300 shadow-sm hover:shadow-md">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container - Top 75% height, image fills the space */}
          <div className="relative flex h-[75%] items-center justify-center bg-white overflow-hidden w-full shrink-0">
            <div className="absolute top-3 right-3 z-20">
              <Checkbox 
                id={`compare-grid-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-5 w-5 rounded-md border-white/50 bg-black/20"
              />
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-700"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              )}
            </Link>
          </div>

          {/* Info Section - Bottom 25% */}
          <div className="flex-1 flex flex-col p-5 space-y-3 bg-white">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{laptop.brand}</span>
              <Link href={`/laptops/${laptop.id}`}>
                <h3 className="text-sm font-bold leading-tight text-black hover:text-primary transition-all line-clamp-1 uppercase">
                  {laptop.name}
                </h3>
              </Link>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-primary">KES {laptop.price.toLocaleString()}</span>
            </div>

            <div className="mt-auto flex items-center gap-2">
              <Button 
                onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
                className="flex-grow h-10 rounded-full bg-black text-white font-bold uppercase text-[9px] tracking-widest hover:bg-primary transition-all"
              >
                <ShoppingCart className="mr-2 h-3.5 w-3.5" /> Buy Now
              </Button>
              <Button asChild variant="outline" className="h-10 w-10 rounded-full p-0 shrink-0 border-zinc-200">
                  <Link href={`https://wa.me/254714210957?text=Hi, I want to buy ${laptop.name}`} target="_blank">
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
    <Card className="group overflow-hidden rounded-3xl border border-zinc-100 bg-white transition-all duration-300 shadow-sm hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative flex items-center justify-center bg-white overflow-hidden w-full md:w-[40%] aspect-[4/3] shrink-0">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <Checkbox 
                id={`compare-list-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-5 w-5 rounded-md border-zinc-200"
              />
              <label htmlFor={`compare-list-${laptop.id}`} className="text-[10px] font-bold text-zinc-400 cursor-pointer uppercase tracking-widest">
                Compare
              </label>
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-700"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              )}
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-between p-8 md:p-10">
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
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-l border-zinc-200 pl-3">Very Good Quality</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-primary">KES {laptop.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                  <Truck className="h-4 w-4" /> Quick delivery in Nairobi
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-zinc-100">
                <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">About this laptop</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { label: 'Chip', value: laptop.specifications.processor, icon: Cpu },
                    { label: 'RAM', value: laptop.specifications.ram, icon: Layers },
                    { label: 'Disk', value: laptop.specifications.storage, icon: HardDrive },
                    { label: 'Screen', value: laptop.specifications.display, icon: Monitor }
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
                <ShoppingCart className="mr-3 h-5 w-5" /> Buy this laptop
              </Button>
              <Button asChild variant="outline" className="h-14 w-14 rounded-full border-zinc-200">
                  <Link href={`https://wa.me/254714210957?text=I want to ask about ${laptop.name}`} target="_blank">
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
