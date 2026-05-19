'use client';

import { useState, useMemo } from 'react';
import { AccessoryCard } from '@/components/accessories/accessory-card';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, DatabaseBackup } from 'lucide-react';

export default function AccessoriesPage() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const accessoriesQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), where('type', '==', 'accessory'));
  }, [db]);

  const { data: dbAccessories, loading } = useCollection(accessoriesQuery);

  const allAccessories = useMemo(() => {
    return dbAccessories || [];
  }, [dbAccessories]);

  const categories = useMemo(() => ['all', ...new Set(allAccessories.map(a => a.category))], [allAccessories]);

  const filteredAccessories = useMemo(() => {
    return allAccessories
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item =>
        selectedCategory === 'all' ? true : item.category === selectedCategory
      );
  }, [searchTerm, selectedCategory, allAccessories]);

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center font-black">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
        <p className="uppercase tracking-widest">Loading specialized gear...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-black tracking-tight text-primary uppercase italic">
          Tech Peripherals
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg font-medium text-muted-foreground">
          Printers, scanners, monitors, and backup power solutions.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex-grow max-w-md">
          <Input
            placeholder="Search accessories..."
            value={searchTerm}
            className="border-2 border-black font-bold h-12"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] border-2 border-black font-bold h-12">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="font-bold">
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" className="font-black uppercase text-xs" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
            Reset
          </Button>
        </div>
      </div>

      {filteredAccessories.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAccessories.map(accessory => (
            <AccessoryCard key={accessory.id} accessory={accessory} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border-4 border-dashed border-zinc-100 rounded-3xl">
          <DatabaseBackup className="mx-auto h-12 w-12 text-zinc-200 mb-4" />
          <h3 className="text-2xl font-black uppercase">No gear found</h3>
          <p className="text-muted-foreground mt-2 font-medium">Your specialized inventory is currently empty.</p>
        </div>
      )}
    </div>
  );
}
