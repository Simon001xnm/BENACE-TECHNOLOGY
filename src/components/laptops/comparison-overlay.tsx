'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useCompare } from '@/lib/compare-context';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ShoppingCart, Info, Loader2, Cpu, HardDrive, Monitor, Layers, Zap, Battery, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ComparisonOverlay() {
  const { compareItems, removeFromCompare, clearCompare, isComparing, setIsComparing } = useCompare();
  const { addToCart } = useCart();
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  if (!isComparing) return null;

  const specsToCompare = [
    { label: 'Brand', key: 'brand' },
    { label: 'Price', key: 'price', format: (v: number) => `KES ${v.toLocaleString()}` },
    { label: 'Status', key: 'status' },
    { label: 'Processor', key: 'specifications.processor', icon: Cpu },
    { label: 'RAM', key: 'specifications.ram', icon: Layers },
    { label: 'Storage', key: 'specifications.storage', icon: HardDrive },
    { label: 'Display', key: 'specifications.display', icon: Monitor },
    { label: 'Graphics', key: 'specifications.graphics', icon: Zap },
    { label: 'Battery', key: 'specifications.battery', icon: Battery },
    { label: 'Weight', key: 'specifications.weight', icon: ShieldCheck },
    { label: 'Operating System', key: 'specifications.os' },
  ];

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const filteredSpecs = specsToCompare.filter((spec) => {
    if (!onlyDifferences) return true;
    const values = compareItems.map((item) => getNestedValue(item, spec.key) || '-');
    return new Set(values).size > 1;
  });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      <header className="flex items-center justify-between border-b px-10 py-6 bg-zinc-50/50">
        <div className="flex items-center gap-10">
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase text-black">Technical Command Center</h2>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Side-by-side performance analysis</p>
          </div>
          <div className="flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full border border-zinc-200 shadow-sm">
            <Checkbox
              id="differences"
              checked={onlyDifferences}
              onCheckedChange={(val) => setOnlyDifferences(!!val)}
              className="h-5 w-5 border-zinc-300"
            />
            <label htmlFor="differences" className="text-xs font-black uppercase tracking-widest leading-none cursor-pointer">
              Highlight Differences Only
            </label>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Button variant="ghost" onClick={clearCompare} className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-700 hover:bg-red-50 px-6">
            Purge All
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsComparing(false)} className="h-12 w-12 rounded-full border-zinc-200 hover:bg-black hover:text-white transition-all">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-grow">
        <div className="min-w-[1200px] p-10">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-64 sticky left-0 z-10 bg-white pr-10 pb-12"></th>
                {compareItems.map((item) => {
                  const displayImage = item.imageUrls?.[0] || PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl;
                  return (
                    <th key={item.id} className="relative px-8 pb-12 align-top text-left border-l border-zinc-100 first:border-l-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCompare(item.id)}
                        className="absolute right-4 top-0 h-8 w-8 text-zinc-300 hover:text-red-500 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="mb-6 aspect-square h-48 w-full overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100">
                        {displayImage && (
                          <Image
                            src={displayImage}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="h-full w-full object-contain p-8 transition-transform hover:scale-110 duration-500"
                          />
                        )}
                      </div>
                      <h3 className="mb-2 text-base font-black leading-tight text-zinc-900 uppercase tracking-tight">{item.brand} {item.name}</h3>
                      <p className="mb-6 text-2xl font-black text-primary tracking-tighter">KES {item.price.toLocaleString()}</p>
                      <Button 
                        onClick={() => addToCart(item as any)}
                        className="w-full h-12 rounded-lg bg-red-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-red-700 shadow-md"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Checkout Model
                      </Button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredSpecs.map((spec, i) => (
                <tr key={spec.key} className={cn(i % 2 === 0 ? "bg-zinc-50/50" : "bg-white", "transition-colors hover:bg-zinc-100/50")}>
                  <td className="sticky left-0 z-10 bg-inherit py-6 pl-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    <div className="flex items-center gap-3">
                       {spec.icon && <spec.icon className="h-4 w-4 opacity-30" />}
                       {spec.label}
                    </div>
                  </td>
                  {compareItems.map((item) => {
                    const rawValue = getNestedValue(item, spec.key);
                    const displayValue = spec.format ? spec.format(rawValue) : rawValue;
                    return (
                      <td key={item.id} className="px-8 py-6 text-sm font-bold text-zinc-700 border-l border-zinc-100 first:border-l-0">
                        {displayValue || '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
}
