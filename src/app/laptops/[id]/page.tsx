'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDoc, useFirestore, useCollection } from '@/firebase';
import { doc, collection, query, limit, where } from 'firebase/firestore';
import { laptops as staticLaptops } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { ShoppingCart, ArrowLeft, Cpu, HardDrive, Monitor, Layers, Info, Loader2, MessageSquare } from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function LaptopDetailPage() {
  const params = useParams();
  const laptopId = params.id as string;
  const { addToCart } = useCart();
  const db = useFirestore();

  const productRef = db ? doc(db, 'products', laptopId) : null;
  const { data: dbLaptop, loading } = useDoc(productRef);

  // Fetch related products
  const relatedQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), limit(6));
  }, [db]);
  const { data: relatedProducts } = useCollection(relatedQuery);

  const laptop = useMemo(() => {
    if (dbLaptop) return dbLaptop;
    return staticLaptops.find((l) => l.id === laptopId);
  }, [dbLaptop, laptopId]);

  if (loading) {
    return (
      <div className="container mx-auto flex h-[40vh] flex-col items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="mt-2 text-[7px] font-black uppercase tracking-widest text-zinc-400">Loading Specifications...</p>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-[9px] font-black uppercase text-black tracking-widest">Model Not Found</h1>
        <Button asChild className="mt-4 h-7 rounded-none text-[7px] font-black uppercase tracking-widest px-6" variant="outline">
          <Link href="/laptops">Back to Collection</Link>
        </Button>
      </div>
    );
  }

  const laptopImage = laptop.imageUrls?.[0] || (laptop.imageId ? PlaceHolderImages.find((img) => img.id === laptop.imageId)?.imageUrl : null);
  const otherModels = relatedProducts?.filter(p => p.id !== laptopId) || [];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-8">
        <div className="mb-4">
          <Button asChild variant="ghost" className="h-5 pl-0 text-zinc-400 hover:text-primary text-[7px] font-black uppercase tracking-widest">
            <Link href="/laptops" className="flex items-center">
              <ArrowLeft className="mr-1 h-2.5 w-2.5" /> Back to Catalog
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100">
            {laptopImage && (
              <Image
                src={laptopImage}
                alt={laptop.name}
                fill
                className="object-contain p-4 transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
            {laptop.status && (
              <Badge className="absolute left-3 top-3 px-2 py-0.5 text-[6px] font-black uppercase tracking-widest bg-black text-white rounded-none">
                {laptop.status}
              </Badge>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-[7px] font-black uppercase tracking-[0.2em] text-primary mb-1">{laptop.brand} Official Gear</p>
              <h1 className="text-sm font-black tracking-tight text-black uppercase leading-tight">
                {laptop.name}
              </h1>
            </div>

            <div className="border-b border-zinc-100 pb-2">
              <p className="text-base font-black text-black tracking-tighter">KES {laptop.price.toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1">
                <Info className="h-2.5 w-2.5" /> Technical Overview
              </h2>
              <div className="text-[8px] font-bold text-zinc-500 leading-normal border-l-2 border-primary pl-3 whitespace-pre-wrap max-w-lg">
                {laptop.description || "High-performance unit optimized for professional workloads and efficiency."}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 max-w-md">
              {[
                { label: 'CPU', value: laptop.specifications?.processor, icon: Cpu },
                { label: 'Memory', value: laptop.specifications?.ram, icon: Layers },
                { label: 'Storage', value: laptop.specifications?.storage, icon: HardDrive },
                { label: 'Screen', value: laptop.specifications?.display, icon: Monitor }
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-zinc-50 p-2 border border-zinc-100">
                  <spec.icon className="h-2.5 w-2.5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[6px] font-black uppercase text-zinc-400 tracking-widest leading-none mb-0.5">{spec.label}</p>
                    <p className="truncate text-[7px] font-black text-black uppercase">{spec.value || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2 max-w-md">
              <Button 
                size="sm" 
                className="flex-1 h-9 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground border border-primary font-black uppercase text-[8px] tracking-widest shadow-sm" 
                onClick={() => addToCart(laptop as any)}
              >
                <ShoppingCart className="mr-2 h-3 w-3" /> Add to Cart
              </Button>
              <Button asChild size="sm" variant="outline" className="h-9 w-full sm:w-9 rounded-none border-zinc-200 hover:border-primary flex items-center justify-center transition-all bg-white">
                  <Link href={`https://wa.me/254714210957?text=I am interested in ${laptop.name}`} target="_blank">
                    <MessageSquare className="h-3 w-3" />
                  </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Other models section */}
        <div className="mt-16 border-t pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-black">Recommended Technical Models</h2>
            <Link href="/laptops" className="text-[7px] font-black text-primary hover:underline uppercase tracking-widest">View Full Catalog</Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-zinc-200">
            {otherModels.map(model => (
              <div key={model.id} className="border-r border-b border-zinc-200">
                <LaptopCard laptop={model} variant="deal" />
              </div>
            ))}
            {otherModels.length === 0 && staticLaptops.filter(l => l.id !== laptopId).map(model => (
              <div key={model.id} className="border-r border-b border-zinc-200">
                <LaptopCard laptop={model} variant="deal" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
