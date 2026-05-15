
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
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { laptops as staticLaptops } from '@/lib/data';

const ITEMS_PER_PAGE = 12;

export function LaptopsGrid() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [currentPage, setCurrentPage] = useState(1);

  const laptopsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbLaptops, loading } = useCollection(laptopsQuery);

  // Fallback to static data if Firestore is empty or loading
  const allLaptops = useMemo(() => {
    if (dbLaptops && dbLaptops.length > 0) return dbLaptops;
    return staticLaptops;
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
        window.scrollTo(0, 0);
    }
  };

  if (loading && (!dbLaptops || dbLaptops.length === 0)) {
    return (
      <div className="flex h-64 flex-col items-center justify-center font-black">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
        Sourcing the best gear...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:grid-cols-4">
        <div className="md:col-span-2">
          <Input
            placeholder="Search by name or brand..."
            className="border-2 border-black font-bold h-12"
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
            <SelectTrigger className="border-2 border-black font-bold h-12">
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent className="font-bold">
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3 px-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span>Price: KES {priceRange[0].toLocaleString()}</span>
            <span>KES {priceRange[1].toLocaleString()}</span>
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
          />
        </div>
        <div className="md:col-span-4 flex justify-end">
            <Button variant="ghost" onClick={resetFilters} className="font-black uppercase text-[10px] tracking-widest">Reset Filters</Button>
        </div>
      </div>

      {paginatedLaptops.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedLaptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-6">
                <Button
                    variant="outline"
                    className="border-2 border-black font-black"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" /> Prev
                </Button>
                <span className="text-xs font-black uppercase tracking-widest">
                    {currentPage} / {totalPages}
                </span>
                <Button
                    variant="outline"
                    className="border-2 border-black font-black"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-24 text-center">
            <h3 className="text-3xl font-black uppercase tracking-tight">No Laptops Found</h3>
            <p className="text-zinc-500 font-medium mt-2">Try adjusting your search or filters.</p>
            <Button onClick={resetFilters} variant="link" className="mt-4 font-black uppercase text-primary">Clear all filters</Button>
        </div>
      )}
    </div>
  );
}
