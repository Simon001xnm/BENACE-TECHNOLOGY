'use client';

import { useState, useMemo } from 'react';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { ComparisonOverlay } from './comparison-overlay';
import { useCollection, useFirestore } from '@/firebase';
import { useCompare } from '@/lib/compare-context';
import { collection, query, orderBy } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, DatabaseBackup, BarChart2, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function LaptopsGrid() {
  const db = useFirestore();
  const { compareItems, setIsComparing, clearCompare } = useCompare();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const laptopsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbLaptops, loading } = useCollection(laptopsQuery);

  const filteredLaptops = useMemo(() => {
    const all = dbLaptops?.filter(p => p.type === 'laptop') || [];
    let filtered = all.filter(laptop =>
      laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [searchTerm, dbLaptops, sortBy]);

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="rounded-none border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-bold text-black mb-6">Filter Results</h2>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 pb-2 border-b">Shipping & Delivery</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Free 2-Day Delivery', count: 16 },
                    { label: 'Ships Within 5 Days', count: 28 },
                    { label: 'Ships Within 10 Days', count: 39 }
                  ].map((filter, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`ship-${i}`} className="h-4 w-4 border-zinc-300" />
                        <label htmlFor={`ship-${i}`} className="text-xs font-medium text-zinc-600 group-hover:text-black">{filter.label}</label>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold">({filter.count})</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 pb-2 border-b">Processor</h3>
                <div className="space-y-3">
                  {[
                    { label: 'All Intel Processors', count: 26 },
                    { label: 'Intel Core i9', count: 4 },
                    { label: 'Intel Core i7', count: 13 },
                    { label: 'Intel Core i5', count: 9 }
                  ].map((filter, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`proc-${i}`} className="h-4 w-4 border-zinc-300" />
                        <label htmlFor={`proc-${i}`} className="text-xs font-medium text-zinc-600 group-hover:text-black">{filter.label}</label>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold">({filter.count})</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 pb-2 border-b">Screen Size</h3>
                <div className="space-y-3">
                  {[
                    { label: '17 inch', count: 18 },
                    { label: '15 inch', count: 17 },
                    { label: '14 inch', count: 5 }
                  ].map((filter, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`screen-${i}`} className="h-4 w-4 border-zinc-300" />
                        <label htmlFor={`screen-${i}`} className="text-xs font-medium text-zinc-600 group-hover:text-black">{filter.label}</label>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold">({filter.count})</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </aside>

        {/* Main Product Feed */}
        <main className="flex-grow space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-zinc-200">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Showing 1 to {filteredLaptops.length} of {filteredLaptops.length} Results
            </p>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 rounded-none border-zinc-200 w-full sm:w-48 text-xs font-bold uppercase">
                  <span className="mr-2 opacity-50">Sort by:</span>
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-zinc-200">
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison Bar */}
          {compareItems.length > 0 && (
            <div className="sticky top-20 z-40 flex items-center justify-between bg-black px-6 py-4 text-white animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest">Selected for Comparison ({compareItems.length}/4)</span>
                <div className="flex -space-x-2">
                  {compareItems.map((item) => (
                    <div key={item.id} className="h-8 w-8 border border-white/20 bg-white overflow-hidden p-1">
                       {item.imageId && (
                          <Image 
                            src={PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl || '/use.png'} 
                            alt={item.name} 
                            width={32} 
                            height={32} 
                            className="object-contain"
                          />
                       )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" onClick={clearCompare} className="text-white hover:text-red-400 font-bold uppercase text-[10px]">
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Clear
                </Button>
                <Button size="sm" onClick={() => setIsComparing(true)} className="bg-primary text-white font-bold uppercase text-[10px] rounded-none px-6">
                  <BarChart2 className="mr-2 h-3.5 w-3.5" /> Compare Now
                </Button>
              </div>
            </div>
          )}

          {filteredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white border border-zinc-200">
              <DatabaseBackup className="mx-auto h-12 w-12 text-zinc-100 mb-4" />
              <p className="font-bold text-zinc-400 uppercase tracking-widest text-xs">No technical matches found</p>
            </div>
          )}
        </main>
      </div>

      <ComparisonOverlay />
    </div>
  );
}
