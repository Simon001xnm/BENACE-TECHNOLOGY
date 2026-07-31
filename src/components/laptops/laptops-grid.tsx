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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2, DatabaseBackup, BarChart2, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function LaptopsGrid() {
  const db = useFirestore();
  const { compareItems, setIsComparing, clearCompare } = useCompare();
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);

  const laptopsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbLaptops, loading } = useCollection(laptopsQuery);

  const availableProcessors = ['Intel Core i7', 'Intel Core i5', 'Intel Ultra 7', 'Apple M2'];

  const handleProcessorToggle = (processor: string) => {
    setSelectedProcessors(prev => 
      prev.includes(processor) 
        ? prev.filter(p => p !== processor) 
        : [...prev, processor]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortBy('relevance');
    setInStockOnly(false);
    setSelectedProcessors([]);
  };

  const filteredLaptops = useMemo(() => {
    const all = dbLaptops?.filter(p => p.type === 'laptop') || [];
    
    let filtered = all.filter(laptop => {
      // Search term match
      const matchesSearch = 
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Stock match
      const matchesStock = inStockOnly ? laptop.inStock : true;
      
      // Processor match
      const matchesProcessor = selectedProcessors.length === 0 || 
        selectedProcessors.some(proc => 
          laptop.specifications?.processor?.toLowerCase().includes(proc.toLowerCase())
        );

      return matchesSearch && matchesStock && matchesProcessor;
    });

    // Sorting
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [searchTerm, dbLaptops, sortBy, inStockOnly, selectedProcessors]);

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 bg-white border-r border-zinc-100 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xs font-black uppercase tracking-widest text-primary">Refine Search</h2>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Filter by specs</p>
            </div>
            {(searchTerm || inStockOnly || selectedProcessors.length > 0) && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2 text-[8px] font-black uppercase text-zinc-400 hover:text-primary">
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="in-stock" 
                    className="h-4 w-4 border-zinc-300" 
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(!!checked)}
                  />
                  <label htmlFor="in-stock" className="text-xs font-bold uppercase tracking-tight cursor-pointer">Ready to ship</label>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4">Processor Type</h3>
              <div className="space-y-3">
                {availableProcessors.map((proc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Checkbox 
                      id={`proc-${i}`} 
                      className="h-4 w-4 border-zinc-300" 
                      checked={selectedProcessors.includes(proc)}
                      onCheckedChange={() => handleProcessorToggle(proc)}
                    />
                    <label htmlFor={`proc-${i}`} className="text-xs font-bold uppercase tracking-tight cursor-pointer">{proc}</label>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* Main Product Feed */}
        <main className="flex-grow">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border-b border-zinc-100">
            <div className="flex-grow max-w-md w-full">
              <Input 
                placeholder="Search by brand or model..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 rounded-none border-zinc-200 font-bold uppercase text-[10px] tracking-widest"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 rounded-none border-zinc-200 w-full sm:w-48 text-[10px] font-black uppercase tracking-widest">
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-zinc-200">
                  <SelectItem value="relevance">Recent First</SelectItem>
                  <SelectItem value="price-low">Cheapest First</SelectItem>
                  <SelectItem value="price-high">Highest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison Bar */}
          {compareItems.length > 0 && (
            <div className="sticky top-14 z-40 flex items-center justify-between bg-black px-6 py-3 text-white animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest">Selected: {compareItems.length}/4</span>
                <div className="flex -space-x-2">
                  {compareItems.map((item) => (
                    <div key={item.id} className="h-8 w-8 border border-white/20 bg-white overflow-hidden p-1">
                       {(item.imageUrls?.[0] || item.imageId) ? (
                          <Image 
                            src={item.imageUrls?.[0] || PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl || '/use.png'} 
                            alt={item.name} 
                            width={32} 
                            height={32} 
                            className="object-contain"
                          />
                       ) : <div className="h-full w-full bg-zinc-100" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={clearCompare} className="text-white hover:text-red-400 font-black uppercase text-[9px] h-8">
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Reset
                </Button>
                <Button size="sm" onClick={() => setIsComparing(true)} className="bg-primary text-white font-black uppercase text-[9px] rounded-none px-6 h-8">
                  <BarChart2 className="mr-2 h-3.5 w-3.5" /> Compare Now
                </Button>
              </div>
            </div>
          )}

          {/* Grid Container */}
          {filteredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 xl:grid-cols-3 w-full">
              {filteredLaptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white flex flex-col items-center justify-center">
              <DatabaseBackup className="mx-auto h-12 w-12 text-zinc-100 mb-4" />
              <p className="font-black text-zinc-400 uppercase tracking-[0.2em] text-[10px]">No technical matches found</p>
              <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4 border-zinc-200 text-[9px] font-black uppercase tracking-widest">
                Clear All Filters
              </Button>
            </div>
          )}
        </main>
      </div>

      <ComparisonOverlay />
    </div>
  );
}
