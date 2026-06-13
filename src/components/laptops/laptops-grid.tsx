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
import { SlidersHorizontal, Loader2, DatabaseBackup, BarChart2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 mb-8">
          Technical Laptop Portfolio
        </h1>
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[2rem] shadow-soft">
          <div className="flex-grow w-full max-w-md">
            <Input 
              placeholder="Search by model or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 rounded-full border-zinc-100 bg-zinc-50 px-6 font-medium focus-visible:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12 rounded-full border-zinc-100 bg-zinc-50 px-6 font-bold text-zinc-600 w-full md:w-48">
                <SelectValue placeholder="Best Match" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-xl">
                <SelectItem value="relevance">Best Match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12 w-12 rounded-full border-zinc-100 bg-zinc-50 p-0 text-zinc-400">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Comparison Action Bar */}
      {compareItems.length > 0 && (
        <div className="sticky top-20 z-40 mb-8 flex items-center justify-between rounded-full bg-black px-6 py-4 shadow-2xl text-white animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest">Comparing {compareItems.length}/4</span>
            <div className="flex -space-x-2">
              {compareItems.map((item) => (
                <div key={item.id} className="h-8 w-8 rounded-full border-2 border-black bg-white overflow-hidden">
                   {item.imageId && (
                      <Image 
                        src={PlaceHolderImages.find(img => img.id === item.imageId)?.imageUrl || '/use.png'} 
                        alt={item.name} 
                        width={32} 
                        height={32} 
                        className="object-contain p-1"
                      />
                   )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCompare}
              className="text-white hover:text-red-400 font-bold uppercase text-[10px]"
            >
              <Trash2 className="mr-2 h-3 w-3" /> Clear
            </Button>
            <Button 
              size="sm" 
              onClick={() => setIsComparing(true)}
              className="bg-primary text-black font-black uppercase text-[10px] rounded-full px-6 hover:bg-white"
            >
              <BarChart2 className="mr-2 h-3 w-3" /> View Comparison
            </Button>
          </div>
        </div>
      )}

      {/* Results */}
      {filteredLaptops.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {filteredLaptops.map(laptop => (
            <LaptopCard key={laptop.id} laptop={laptop} viewMode="list" />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <DatabaseBackup className="mx-auto h-12 w-12 text-zinc-200 mb-4" />
          <p className="font-bold text-zinc-400 uppercase tracking-widest text-xs">No matching models found</p>
        </div>
      )}

      {/* Full Comparison Overlay */}
      <ComparisonOverlay />
    </div>
  );
}
