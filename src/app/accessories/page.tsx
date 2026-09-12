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
import { accessories as staticAccessories } from '@/lib/data';

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
    if (dbAccessories && dbAccessories.length > 0) return dbAccessories;
    return staticAccessories.map(a => ({ ...a, type: 'accessory' }));
  }, [dbAccessories]);

  const categories = useMemo(() => ['all', ...new Set(allAccessories.map(a => a.category || 'Gear'))], [allAccessories]);

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

  if (loading && dbAccessories === null) {
    return (
      <div className="flex h-[40vh] items-center justify-center bg-[#f4f4f4]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f4] min-h-screen w-full pb-20">
      <div className="w-full bg-white p-4 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tighter text-zinc-900 uppercase">
              Tech Peripherals & Gear
            </h1>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
              Original hardware components, network storage, and power solutions.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search gear..."
              value={searchTerm}
              className="h-8 rounded-none border-zinc-200 font-bold uppercase text-[8px] tracking-widest bg-zinc-50 w-full sm:w-48"
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-8 rounded-none border-zinc-200 w-full sm:w-36 text-[8px] font-black uppercase tracking-widest bg-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-zinc-200 font-bold text-[8px]">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="text-[8px]">
                    {cat === 'all' ? 'ALL GEAR' : cat.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="w-full">
        {filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full border-l border-zinc-200">
            {filteredAccessories.map(accessory => (
              <div key={accessory.id} className="border-r border-b border-zinc-200 bg-white">
                <AccessoryCard accessory={accessory} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border-b border-zinc-200">
            <DatabaseBackup className="mx-auto h-6 w-6 text-zinc-200 mb-2" />
            <p className="font-black text-zinc-400 uppercase tracking-widest text-[8px]">No components found</p>
          </div>
        )}
      </div>
    </div>
  );
}
