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
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2, DatabaseBackup, LayoutGrid, List, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 12;

export function LaptopsGrid() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const laptopsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbLaptops, loading } = useCollection(laptopsQuery);

  const allLaptops = useMemo(() => {
    return dbLaptops?.filter(p => p.type === 'laptop') || [];
  }, [dbLaptops]);

  const brands = useMemo(() => [...new Set(allLaptops.map(l => l.brand))], [allLaptops]);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...allLaptops.map(l => l.price), 500000)), [allLaptops]);

  const filteredLaptops = useMemo(() => {
    return allLaptops
      .filter(laptop =>
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(laptop =>
        selectedBrand === 'all' ? true : laptop.brand === selectedBrand
      )
      .filter(
        laptop => laptop.price >= priceRange[0] && laptop.price <= priceRange[1]
      );
  }, [searchTerm, selectedBrand, priceRange, allLaptops]);
  
  const totalPages = Math.ceil(filteredLaptops.length / ITEMS_PER_PAGE);

  const paginatedLaptops = useMemo(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredLaptops.slice(startIndex, endIndex);
  }, [filteredLaptops, currentPage]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setPriceRange([0, maxPrice]);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center font-bold text-zinc-400 uppercase tracking-widest text-xs">
        <Loader2 className="mb-4 h-6 w-6 animate-spin text-primary" />
        Sourcing Technical Gear...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
            <Input
              placeholder="Search by name or brand..."
              className="h-12 border-zinc-100 bg-zinc-50 pl-11 text-sm font-medium focus-visible:ring-primary/20"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Select value={selectedBrand} onValueChange={(value) => {
              setSelectedBrand(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="h-12 w-48 border-zinc-100 font-bold uppercase tracking-widest text-[10px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent className="font-bold border-zinc-100">
                <SelectItem value="all">ALL BRANDS</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand} className="uppercase tracking-widest text-[10px]">{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 bg-zinc-50 p-1 rounded-xl border border-zinc-100">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('grid')}
                className={cn("h-10 w-10 rounded-lg", viewMode === 'grid' ? "bg-white shadow-sm text-black" : "text-zinc-400")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('list')}
                className={cn("h-10 w-10 rounded-lg", viewMode === 'list' ? "bg-white shadow-sm text-black" : "text-zinc-400")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {paginatedLaptops.length > 0 ? (
        <div className="space-y-12">
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          )}>
            {paginatedLaptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} viewMode={viewMode} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 py-10">
                <Button
                    variant="ghost"
                    className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-xs"
                    onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Prev
                </Button>
                <span className="text-sm font-black text-zinc-400">{currentPage} / {totalPages}</span>
                <Button
                    variant="ghost"
                    className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-xs"
                    onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-32 text-center rounded-[3rem] border-2 border-dashed border-zinc-100">
            <DatabaseBackup className="mx-auto h-12 w-12 text-zinc-100 mb-4" />
            <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-400">Inventory Empty</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-2">Adjust your search parameters.</p>
        </div>
      )}
    </div>
  );
}
