'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import type { Laptop } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShoppingCart, Star, Info, ArrowRight, Cpu, Layers, HardDrive, Monitor, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LaptopCardProps {
  laptop: Laptop;
  viewMode?: 'grid' | 'list';
}

/**
 * Version 1255 Laptop Card
 * Optimized for spec-driven browsing. Supports Grid and List modes.
 * List mode provides immediate visibility into the hardware stack for rapid comparison.
 */
export function LaptopCard({ laptop, viewMode = 'grid' }: LaptopCardProps) {
  const { addToCart } = useCart();
  
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  const getStatusStyle = () => {
    switch (laptop.status) {
      case 'New': return 'bg-emerald-500 text-white border-black';
      case 'Boxed': return 'bg-primary text-white border-black';
      case 'Ex-UK': return 'bg-black text-white border-black';
      default: return 'bg-zinc-200 text-black border-black';
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="group relative flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] border-4 border-black bg-white transition-all duration-500 hover:shadow-[16px_16px_0px_0px_rgba(0,186,242,1)]">
        {/* Visual Node */}
        <div className="relative aspect-video w-full md:w-1/3 overflow-hidden bg-zinc-50 border-b-4 md:border-b-0 md:border-r-4 border-black">
          <Link href={`/laptops/${laptop.id}`} className="block h-full w-full">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={laptop.name}
                fill
                className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-100">
                <ShoppingCart className="h-12 w-12 text-zinc-300" />
              </div>
            )}
          </Link>
          <div className="absolute left-4 top-4">
             {laptop.status && (
              <Badge className={cn("font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 text-[8px] shadow-sm", getStatusStyle())}>
                {laptop.status}
              </Badge>
            )}
          </div>
        </div>

        {/* Data Architecture Node */}
        <CardContent className="flex flex-grow flex-col p-6 md:p-8">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                {laptop.brand} ARCHITECTURE
              </span>
              <Link href={`/laptops/${laptop.id}`}>
                <CardTitle className="text-2xl font-black leading-tight tracking-tight text-black transition-colors group-hover:text-primary mt-1">
                  {laptop.name}
                </CardTitle>
              </Link>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-3xl font-black text-primary tracking-tighter">
                KES {laptop.price.toLocaleString()}
              </span>
              {laptop.oldPrice && (
                <span className="text-xs font-bold text-zinc-300 line-through">
                  KES {laptop.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Detailed Hardware Stack - Optimized for scanning */}
          <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Cpu, label: 'CPU', value: laptop.specifications?.processor },
              { icon: Layers, label: 'RAM', value: laptop.specifications?.ram },
              { icon: HardDrive, label: 'Storage', value: laptop.specifications?.storage },
              { icon: Monitor, label: 'Display', value: laptop.specifications?.display }
            ].map((spec, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border-2 border-zinc-100 p-3 bg-zinc-50/50">
                <spec.icon className="h-4 w-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">{spec.label}</p>
                  <p className="truncate text-[10px] font-bold text-black uppercase">{spec.value || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              <CheckCircle2 className="h-4 w-4" /> Ready for Deployment
            </div>
            <div className="flex flex-1 items-center justify-end gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => addToCart(laptop as any)} 
                className="h-12 w-full sm:w-12 rounded-2xl border-2 border-black p-0 hover:bg-black hover:text-white"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button asChild className="h-12 flex-1 sm:flex-none sm:px-8 rounded-2xl bg-black font-black uppercase tracking-widest text-xs text-white border-2 border-black hover:bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Link href={`/laptops/${laptop.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid View (Existing Version 1255 Design)
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border-4 border-black bg-white transition-all duration-500 hover:-translate-y-4 hover:shadow-[16px_16px_0px_0px_rgba(0,136,204,1)]">
      {laptop.salePercentage && (
        <div className="absolute left-6 top-6 z-20">
          <Badge className="bg-red-600 font-black text-white px-4 py-1.5 rounded-full border-2 border-black text-xs shadow-lg">
            -{laptop.salePercentage}% OFF
          </Badge>
        </div>
      )}

      <CardHeader className="relative aspect-[5/4] p-0 overflow-hidden bg-zinc-50 border-b-4 border-black">
        <Link href={`/laptops/${laptop.id}`} className="block h-full w-full">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center bg-zinc-100">
                <ShoppingCart className="h-16 w-16 text-zinc-300" />
             </div>
          )}
          
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 p-6">
            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-black shadow-2xl ring-2 ring-black">
              Full Technical Specs <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </Link>
        <div className="absolute bottom-6 left-6">
          {laptop.status && (
            <Badge className={cn("font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 text-[10px] shadow-sm", getStatusStyle())}>
              {laptop.status}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {laptop.brand} ARCHITECTURE
          </span>
          <div className="flex gap-0.5 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>

        <Link href={`/laptops/${laptop.id}`} className="mb-6 block">
          <CardTitle className="text-2xl font-black leading-[1.1] tracking-tight text-black transition-colors group-hover:text-primary">
            {laptop.name}
          </CardTitle>
        </Link>

        <div className="mb-8 grid grid-cols-1 gap-2 border-l-4 border-zinc-100 pl-4">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <Cpu className="h-4 w-4 text-primary" /> {laptop.specifications?.processor || 'Standard Chip'}
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <Layers className="h-4 w-4 text-primary" /> {laptop.specifications?.ram || '8GB'} MEMORY
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <HardDrive className="h-4 w-4 text-primary" /> {laptop.specifications?.storage || '256GB'} SSD
            </div>
        </div>
        
        <div className="mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-zinc-400 mb-1">Price Analysis</span>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary leading-none tracking-tighter">
                  KES {laptop.price.toLocaleString()}
                </span>
                {laptop.oldPrice && (
                  <span className="mt-1 text-sm font-bold text-zinc-300 line-through">
                    KES {laptop.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <Link href={`/laptops/${laptop.id}`} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-300 transition-all hover:bg-black hover:text-white border-2 border-transparent hover:border-black shadow-sm">
               <Info className="h-6 w-6" />
            </Link>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-4 p-8 pt-0">
        <Button 
          variant="outline" 
          onClick={() => addToCart(laptop as any)} 
          className="h-16 rounded-3xl border-4 border-black font-black uppercase tracking-widest text-lg transition-all hover:bg-black hover:text-white active:scale-95"
          aria-label={`Add ${laptop.name} to cart`}
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>
        <Button 
          asChild 
          className="h-16 rounded-3xl bg-black font-black uppercase tracking-widest text-white border-4 border-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
            <Link href={`/laptops/${laptop.id}`}>
              Full Specs
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
