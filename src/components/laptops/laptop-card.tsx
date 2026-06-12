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
import { ShoppingCart, Cpu, Layers, HardDrive, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LaptopCardProps {
  laptop: Laptop;
  viewMode?: 'grid' | 'list';
}

export function LaptopCard({ laptop, viewMode = 'grid' }: LaptopCardProps) {
  const { addToCart } = useCart();
  
  const displayImage = laptop.imageUrls && laptop.imageUrls.length > 0 
    ? laptop.imageUrls[0] 
    : PlaceHolderImages.find(img => img.id === laptop.imageId)?.imageUrl;

  const getStatusColor = () => {
    switch (laptop.status) {
      case 'New': return 'bg-emerald-500';
      case 'Boxed': return 'bg-blue-600';
      case 'Ex-UK': return 'bg-zinc-900';
      default: return 'bg-zinc-500';
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="group flex flex-col md:flex-row overflow-hidden rounded-3xl border-2 border-zinc-100 bg-white transition-all hover:border-primary/50 hover:shadow-xl">
        <div className="relative aspect-video w-full md:w-64 overflow-hidden bg-zinc-50">
          <Link href={`/laptops/${laptop.id}`} className="block h-full w-full">
            {displayImage && (
              <Image
                src={displayImage}
                alt={laptop.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            )}
          </Link>
          {laptop.status && (
            <Badge className={cn("absolute left-3 top-3 text-[9px] font-black uppercase tracking-widest", getStatusColor())}>
              {laptop.status}
            </Badge>
          )}
        </div>

        <CardContent className="flex flex-grow flex-col p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">{laptop.brand}</p>
              <Link href={`/laptops/${laptop.id}`}>
                <CardTitle className="text-xl font-black tracking-tight">{laptop.name}</CardTitle>
              </Link>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-primary">KES {laptop.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500">
              <Cpu className="h-3 w-3 text-primary" /> {laptop.specifications?.processor}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500">
              <Layers className="h-3 w-3 text-primary" /> {laptop.specifications?.ram}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500">
              <HardDrive className="h-3 w-3 text-primary" /> {laptop.specifications?.storage}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-end gap-3">
             <Button variant="outline" size="icon" onClick={() => addToCart(laptop as any)} className="rounded-xl border-zinc-200">
                <ShoppingCart className="h-4 w-4" />
             </Button>
             <Button asChild className="rounded-xl bg-black px-6 font-bold uppercase tracking-widest text-xs">
                <Link href={`/laptops/${laptop.id}`}>View Details</Link>
             </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-zinc-100 bg-white transition-all hover:border-primary/50 hover:shadow-2xl">
      <CardHeader className="relative aspect-[4/3] p-0 overflow-hidden bg-zinc-50">
        <Link href={`/laptops/${laptop.id}`} className="block h-full w-full">
          {displayImage && (
            <Image
              src={displayImage}
              alt={laptop.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, 30vw"
            />
          )}
        </Link>
        {laptop.status && (
          <Badge className={cn("absolute left-4 top-4 text-[9px] font-black uppercase tracking-widest px-3 py-1", getStatusColor())}>
            {laptop.status}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-6">
        <div className="mb-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">{laptop.brand}</p>
          <Link href={`/laptops/${laptop.id}`}>
            <CardTitle className="text-lg font-black leading-tight tracking-tight group-hover:text-primary transition-colors">
              {laptop.name}
            </CardTitle>
          </Link>
        </div>

        <div className="mt-2 space-y-1">
          <p className="text-xs font-bold text-zinc-500 line-clamp-1 truncate">{laptop.specifications?.processor} • {laptop.specifications?.ram} • {laptop.specifications?.storage}</p>
        </div>

        <div className="mt-auto pt-6 flex items-end justify-between">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Hub Price</p>
              <p className="text-xl font-black text-primary">KES {laptop.price.toLocaleString()}</p>
           </div>
           <Link href={`/laptops/${laptop.id}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-300 hover:bg-black hover:text-white transition-all">
              <ArrowRight className="h-5 w-5" />
           </Link>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => addToCart(laptop as any)} 
          className="flex-1 rounded-xl border-zinc-200 font-bold uppercase text-[10px] tracking-widest h-12"
        >
          Add to Cart
        </Button>
        <Button 
          asChild 
          className="flex-1 rounded-xl bg-black font-bold uppercase text-[10px] tracking-widest text-white h-12 hover:bg-primary"
        >
          <Link href={`/laptops/${laptop.id}`}>Specs</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
