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
import { ChevronLeft, ChevronRight, Loader2, DatabaseBackup, LayoutGrid, List } from 'lucide-react';
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

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center font-black">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
        Sourcing technical gear...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Search & Filter Control Center */}
      <div className="rounded-[2.5rem] border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search hardware by name or brand..."
              className="h-14 border-2 border-black font-black uppercase tracking-widest text-xs shadow-none focus-visible:ring-0"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div>
            <Select value={selectedBrand} onValueChange={(value) => {
              setSelectedBrand(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="h-14 border-2 border-black font-black uppercase tracking-widest text-xs">
                <SelectValue placeholder="All Manufacturers" />
              </SelectTrigger>
              <SelectContent className="font-black border-2 border-black">
                <SelectItem value="all">ALL BRANDS</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand} className="uppercase tracking-widest text-[10px]">
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4 px-2 flex flex-col justify-center">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <span>Min: {priceRange[0].toLocaleString()}</span>
              <span>Max: {priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              min={0}
              max={maxPrice}
              step={5000}
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value);
                setCurrentPage(1);
              }}
              className="py-2"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-zinc-100 pt-8">
            <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-2xl border-2 border-black">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('grid')}
                className={cn("h-10 w-10 rounded-xl", viewMode === 'grid' ? "bg-black text-white" : "text-zinc-400 hover:bg-zinc-200")}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('list')}
                className={cn("h-10 w-10 rounded-xl", viewMode === 'list' ? "bg-black text-white" : "text-zinc-400 hover:bg-zinc-200")}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  {filteredLaptops.length} Results Found
               </span>
               <Button variant="ghost" onClick={resetFilters} className="font-black uppercase text-[10px] tracking-widest text-primary hover:bg-primary/5">
                  Reset Global Filters
               </Button>
            </div>
        </div>
      </div>

      {paginatedLaptops.length > 0 ? (
        <div className="space-y-12">
          <div className={cn(
            "grid gap-8",
            viewMode === 'grid' 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          )}>
            {paginatedLaptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} viewMode={viewMode} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-8 py-12">
                <Button
                    variant="outline"
                    className="h-14 rounded-2xl border-4 border-black font-black uppercase tracking-widest hover:bg-zinc-50 disabled:opacity-30"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Prev
                </Button>
                <div className="flex items-center gap-2">
                   <span className="text-xl font-black">{currentPage}</span>
                   <span className="text-zinc-300 font-bold">/</span>
                   <span className="text-zinc-400 font-bold">{totalPages}</span>
                </div>
                <Button
                    variant="outline"
                    className="h-14 rounded-2xl border-4 border-black font-black uppercase tracking-widest hover:bg-zinc-50 disabled:opacity-30"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-32 text-center rounded-[3rem] border-4 border-dashed border-zinc-200 bg-zinc-50/50">
            <DatabaseBackup className="mx-auto h-20 w-20 text-zinc-200 mb-6" />
            <h3 className="text-4xl font-black uppercase tracking-tighter text-black italic">No Match Found</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest mt-2">Adjust your technical parameters or reset filters.</p>
            <Button onClick={resetFilters} className="mt-8 h-12 rounded-full bg-black text-white font-black uppercase tracking-widest px-8 hover:bg-primary">
              Clear All Filters
            </Button>
        </div>
      )}
    </div>
  );
}
