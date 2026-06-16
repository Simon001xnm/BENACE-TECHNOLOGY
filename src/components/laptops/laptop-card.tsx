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
      <Card className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-zinc-100 bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container - Image fills the space with full bleed look */}
          <div className="relative flex h-72 items-center justify-center bg-zinc-50 overflow-hidden w-full shrink-0">
            <div className="absolute top-4 right-4 z-20">
              <Checkbox 
                id={`compare-grid-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-6 w-6 rounded-lg border-white/50 bg-black/20"
              />
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-1000"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              )}
            </Link>
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col p-6 space-y-4 bg-white">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">{laptop.brand}</span>
              <Link href={`/laptops/${laptop.id}`}>
                <h3 className="text-lg font-black leading-tight text-black hover:text-primary transition-all line-clamp-1 uppercase tracking-tight">
                  {laptop.name}
                </h3>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-black">KES {laptop.price.toLocaleString()}</span>
            </div>

            <div className="mt-auto flex items-center gap-3">
              <Button 
                onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
                className="flex-grow h-14 rounded-2xl bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-primary transition-all shadow-lg"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
              </Button>
              <Button asChild variant="outline" className="h-14 w-14 rounded-2xl p-0 shrink-0 border-zinc-100 bg-zinc-50 hover:bg-zinc-100">
                  <Link href={`https://wa.me/254714210957?text=Hi, I want to buy ${laptop.name}`} target="_blank">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative flex items-center justify-center bg-zinc-50 overflow-hidden w-full md:w-[45%] aspect-square md:aspect-auto shrink-0">
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <Checkbox 
                id={`compare-list-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-6 w-6 rounded-lg border-zinc-200"
              />
              <label htmlFor={`compare-list-${laptop.id}`} className="text-[10px] font-black text-zinc-400 cursor-pointer uppercase tracking-widest">
                Compare
              </label>
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-1000"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              )}
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-between p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <Link href={`/laptops/${laptop.id}`}>
                  <h3 className="text-3xl font-black leading-tight text-black hover:text-primary transition-all uppercase tracking-tighter">
                    {laptop.brand} {laptop.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-4 w-4", i < 4 ? "fill-primary text-primary" : "text-zinc-200")} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-l border-zinc-200 pl-4 italic">Reliable Choice</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-primary">KES {laptop.price.toLocaleString()}</span>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-2">
                  <Truck className="h-4 w-4" /> Delivered fast in Nairobi
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-zinc-100">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Specifications</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: 'Chip', value: laptop.specifications.processor, icon: Cpu },
                    { label: 'RAM', value: laptop.specifications.ram, icon: Layers },
                    { label: 'Disk', value: laptop.specifications.storage, icon: HardDrive },
                    { label: 'Screen', value: laptop.specifications.display, icon: Monitor }
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-zinc-600">
                      <spec.icon className="h-4 w-4 text-primary shrink-0 opacity-60" />
                      <span className="truncate">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Button 
                onClick={() => addToCart({ ...laptop, quantity: 1 } as any)}
                className="w-full sm:flex-grow h-16 rounded-[1.5rem] bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-primary transition-all shadow-xl"
              >
                <ShoppingCart className="mr-3 h-5 w-5" /> Buy this laptop
              </Button>
              <Button asChild variant="outline" className="h-16 w-full sm:w-16 rounded-[1.5rem] border-zinc-200 bg-zinc-50 hover:bg-zinc-100">
                  <Link href={`https://wa.me/254714210957?text=I want to ask about ${laptop.name}`} target="_blank" className="flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
