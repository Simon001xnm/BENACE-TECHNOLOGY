'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useCompare } from '@/lib/compare-context';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ShoppingCart, Info, Loader2 } from 'lucide-react';
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
    { label: 'Processor', key: 'specifications.processor' },
    { label: 'RAM', key: 'specifications.ram' },
    { label: 'Storage', key: 'specifications.storage' },
    { label: 'Display', key: 'specifications.display' },
  ];

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const filteredSpecs = specsToCompare.filter((spec) => {
    if (!onlyDifferences) return true;
    const values = compareItems.map((item) => getNestedValue(item, spec.key));
    return new Set(values).size > 1;
  });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-in slide-in-from-bottom duration-500">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold tracking-tight">Technical Comparison</h2>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="differences"
              checked={onlyDifferences}
              onCheckedChange={(val) => setOnlyDifferences(!!val)}
            />
            <label htmlFor="differences" className="text-sm font-medium leading-none cursor-pointer">
              Only show differences
            </label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={clearCompare} className="text-xs font-bold uppercase tracking-widest">
            Clear All
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsComparing(false)} className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-grow">
        <div className="min-w-[1000px] p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-48 border-b pb-8"></th>
                {compareItems.map((item) => {
                  const displayImage = item.imageUrls?.[0] || PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl;
                  return (
                    <th key={item.id} className="relative border-b px-4 pb-8 align-top text-left">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCompare(item.id)}
                        className="absolute right-2 top-0 h-6 w-6 text-zinc-300 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="mb-4 aspect-square h-32 w-full overflow-hidden rounded-xl bg-zinc-50 border">
                        {displayImage && (
                          <Image
                            src={displayImage}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="h-full w-full object-contain p-4"
                          />
                        )}
                      </div>
                      <h3 className="mb-1 text-sm font-bold leading-tight">{item.name}</h3>
                      <p className="mb-4 text-xs font-bold text-primary">KES {item.price.toLocaleString()}</p>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(item as any)}
                        className="w-full h-9 rounded-full bg-red-600 text-white font-bold text-xs uppercase hover:bg-red-700"
                      >
                        Add to cart
                      </Button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredSpecs.map((spec, i) => (
                <tr key={spec.key} className={cn(i % 2 === 0 ? "bg-zinc-50/50" : "bg-white")}>
                  <td className="py-4 pl-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                    {spec.label}
                  </td>
                  {compareItems.map((item) => {
                    const rawValue = getNestedValue(item, spec.key);
                    const displayValue = spec.format ? spec.format(rawValue) : rawValue;
                    return (
                      <td key={item.id} className="px-4 py-4 text-sm font-medium text-zinc-600">
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
