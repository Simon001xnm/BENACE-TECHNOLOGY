'use client';

import { useState, useMemo } from 'react';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { useCollection, useFirestore } from '@/firebase';
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
import { SlidersHorizontal, Loader2, DatabaseBackup, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LaptopsGrid() {
  const db = useFirestore();
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 mb-8">
          Laptop and Notebook Computers
        </h1>
        
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" className="h-12 rounded-full px-6 border-zinc-200 shadow-sm font-medium flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Sort by</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12 border-none bg-transparent shadow-none font-bold text-zinc-700 w-fit gap-2">
                <SelectValue placeholder="Best Match" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-xl">
                <SelectItem value="relevance">Best Match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

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
    </div>
  );
}
