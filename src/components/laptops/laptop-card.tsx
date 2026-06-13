'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { useCompare } from '@/lib/compare-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, ShoppingCart, Truck, CheckCircle2, Cpu, HardDrive, Monitor, Layers, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LaptopCardProps {
  laptop: Laptop;
}

export function LaptopCard({ laptop }: { laptop: Laptop }) {
  const { addToCart } = useCart();
  const { compareItems, addToCompare, removeFromCompare } = useCompare();
  const [quantity, setQuantity] = useState(1);
  
  const isSelectedForCompare = compareItems.some((item) => item.id === laptop.id);
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  return (
    <Card className="group overflow-hidden border border-zinc-200 bg-white transition-all duration-300 rounded-none hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image Container - 75% dominant in visual weight */}
          <div className="relative flex items-center justify-center bg-white overflow-hidden w-full md:w-[45%] aspect-[4/3] shrink-0">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <Checkbox 
                id={`compare-${laptop.id}`}
                checked={isSelectedForCompare}
                onCheckedChange={(checked) => {
                  if (checked) addToCompare(laptop);
                  else removeFromCompare(laptop.id);
                }}
                className="h-4 w-4 border-zinc-300"
              />
              <label htmlFor={`compare-${laptop.id}`} className="text-[10px] font-bold text-zinc-500 cursor-pointer hover:text-black uppercase tracking-widest">
                Compare
              </label>
            </div>

            <Link href={`/laptops/${laptop.id}`} className="relative h-full w-full">
              {displayImage && (
                <Image
                  src={displayImage}
                  alt={laptop.name}
                  fill
                  className="object-contain transition-transform group-hover:scale-105 duration-700"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              )}
            </Link>
          </div>

          {/* Balanced Metadata Interface */}
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

              {/* High-Density Spec Stack */}
              <div className="space-y-2 pt-4 border-t border-zinc-50">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-1">
                  Specs <span className="text-primary hover:underline cursor-pointer">Customize →</span>
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
