'use client';

import { useState, useMemo } from 'react';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { ComparisonOverlay } from './comparison-overlay';
import { useCollection, useFirestore } from '@/firebase';
import { useCompare } from '@/lib/compare-context';
import { collection, query } from 'firebase/firestore';
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
import { Loader2, DatabaseBackup, BarChart2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { laptops as staticLaptops } from '@/lib/data';

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
    return query(collection(db, 'products'));
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

  const allLaptops = useMemo(() => {
    const fromDb = dbLaptops?.filter(p => p.type === 'laptop') || [];
    if (fromDb.length > 0) return fromDb;
    return staticLaptops.map(l => ({ ...l, type: 'laptop' }));
  }, [dbLaptops]);

  const filteredLaptops = useMemo(() => {
    let filtered = [...allLaptops].filter(laptop => {
      const matchesSearch = 
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStock = inStockOnly ? laptop.inStock : true;
      
      const matchesProcessor = selectedProcessors.length === 0 || 
        selectedProcessors.some(proc => 
          laptop.specifications?.processor?.toLowerCase().includes(proc.toLowerCase())
        );

      return matchesSearch && matchesStock && matchesProcessor;
    });

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [searchTerm, allLaptops, sortBy, inStockOnly, selectedProcessors]);

  if (loading && dbLaptops === null) {
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
        <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-zinc-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-primary">Filters</h2>
            {(searchTerm || inStockOnly || selectedProcessors.length > 0) && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2 text-[8px] font-black uppercase text-zinc-400">
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-[9px] font-black uppercase tracking-widest mb-3">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="in-stock" 
                    className="h-3.5 w-3.5 border-zinc-300" 
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(!!checked)}
                  />
                  <label htmlFor="in-stock" className="text-[10px] font-bold uppercase tracking-tight cursor-pointer">In Stock</label>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[9px] font-black uppercase tracking-widest mb-3">Processor</h3>
              <div className="space-y-2">
                {availableProcessors.map((proc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Checkbox 
                      id={`proc-${i}`} 
                      className="h-3.5 w-3.5 border-zinc-300" 
                      checked={selectedProcessors.includes(proc)}
                      onCheckedChange={() => handleProcessorToggle(proc)}
                    />
                    <label htmlFor={`proc-${i}`} className="text-[10px] font-bold uppercase tracking-tight cursor-pointer">{proc}</label>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* Main Product Feed */}
        <main className="flex-grow">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 border-b border-zinc-200">
            <div className="flex-grow max-w-md w-full">
              <Input 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 rounded-none border-zinc-200 font-bold uppercase text-[9px] tracking-widest"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 rounded-none border-zinc-200 w-full sm:w-40 text-[9px] font-black uppercase tracking-widest">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-zinc-200">
                  <SelectItem value="relevance">Recent</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison Bar */}
          {compareItems.length > 0 && (
            <div className="sticky top-0 z-40 flex items-center justify-between bg-black px-4 py-2 text-white">
              <span className="text-[9px] font-black uppercase tracking-widest">Comparing {compareItems.length} items</span>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setIsComparing(true)} className="bg-primary text-black font-black uppercase text-[8px] rounded-none px-4 h-7">
                  Compare Now
                </Button>
              </div>
            </div>
          )}

          {/* Grid Container - TOUCHING EDGES */}
          {filteredLaptops.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full border-l border-zinc-200">
              {filteredLaptops.map(laptop => (
                <div key={laptop.id} className="border-r border-b border-zinc-200">
                  <LaptopCard laptop={laptop} variant="grid" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white">
              <DatabaseBackup className="mx-auto h-8 w-8 text-zinc-100 mb-2" />
              <p className="font-black text-zinc-400 uppercase tracking-widest text-[9px]">No models found</p>
            </div>
          )}
        </main>
      </div>

      <ComparisonOverlay />
    </div>
  );
}
