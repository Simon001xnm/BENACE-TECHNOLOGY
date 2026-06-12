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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  LayoutGrid, 
  List, 
  Search, 
  Loader2, 
  Filter,
  ChevronLeft,
  ChevronRight,
  DatabaseBackup
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ITEMS_PER_PAGE = 12;

export function LaptopsGrid() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  const laptopsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbLaptops, loading } = useCollection(laptopsQuery);

  const allLaptops = useMemo(() => {
    return dbLaptops?.filter(p => p.type === 'laptop') || [];
  }, [dbLaptops]);

  const brands = useMemo(() => [...new Set(allLaptops.map(l => l.brand))].sort(), [allLaptops]);
  const statuses = ['New', 'Boxed', 'Ex-UK'];

  const filteredLaptops = useMemo(() => {
    let filtered = allLaptops.filter(laptop =>
      laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(l => selectedBrands.includes(l.brand));
    }

    if (selectedStatus.length > 0) {
      filtered = filtered.filter(l => selectedStatus.includes(l.status || ''));
    }

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [searchTerm, selectedBrands, selectedStatus, allLaptops, sortBy]);
  
  const totalPages = Math.ceil(filteredLaptops.length / ITEMS_PER_PAGE);
  const paginatedLaptops = useMemo(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      return filteredLaptops.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredLaptops, currentPage]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
    setCurrentPage(1);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="bg-white p-4 border border-zinc-200 rounded-sm">
        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 border-b pb-2">Filters</h3>
        <Accordion type="multiple" defaultValue={["brand", "status"]}>
          <AccordionItem value="brand">
            <AccordionTrigger className="text-xs font-bold uppercase hover:no-underline">Brand</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="status">
            <AccordionTrigger className="text-xs font-bold uppercase hover:no-underline">Condition</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {statuses.map(status => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={selectedStatus.includes(status)}
                      onCheckedChange={() => toggleStatus(status)}
                    />
                    <label htmlFor={`status-${status}`} className="text-sm font-medium leading-none cursor-pointer">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm font-medium text-muted-foreground">Loading catalog...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <FilterSidebar />
      </aside>

      <main className="lg:col-span-3 space-y-4">
        {/* Toolbar */}
        <div className="bg-white border border-zinc-200 p-4 rounded-sm flex flex-col sm:flex-row gap-4 items-center justify-between shadow-soft">
          <div className="flex items-center gap-4 w-full sm:w-auto">
             <Sheet>
               <SheetTrigger asChild>
                 <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2">
                   <Filter className="h-4 w-4" /> Filters
                 </Button>
               </SheetTrigger>
               <SheetContent side="left" className="w-[300px]">
                 <SheetHeader>
                   <SheetTitle>Filters</SheetTitle>
                 </SheetHeader>
                 <div className="mt-6">
                   <FilterSidebar />
                 </div>
               </SheetContent>
             </Sheet>
             
             <div className="relative flex-grow sm:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
               <Input 
                 placeholder="Search products..." 
                 className="pl-9 h-9 text-xs"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
             </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 w-40 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center border border-zinc-200 rounded-md overflow-hidden bg-zinc-50">
              <Button 
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                size="icon" 
                className={cn("h-9 w-9 rounded-none", viewMode === 'grid' && "bg-white border-r")}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="icon" 
                className={cn("h-9 w-9 rounded-none", viewMode === 'list' && "bg-white border-l")}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase px-1">
          <span>{filteredLaptops.length} Results Found</span>
          {currentPage > 1 && <span>Page {currentPage} of {totalPages}</span>}
        </div>

        {/* Grid/List Container */}
        {paginatedLaptops.length > 0 ? (
          <div className={cn(
            "gap-4",
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
              : "flex flex-col"
          )}>
            {paginatedLaptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-zinc-200 rounded-lg py-20 text-center">
            <DatabaseBackup className="mx-auto h-10 w-10 text-zinc-100 mb-4" />
            <p className="text-zinc-400 text-sm font-medium">No products match your filters.</p>
            <Button variant="link" className="text-primary text-xs" onClick={() => { setSelectedBrands([]); setSelectedStatus([]); setSearchTerm(''); }}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 py-4">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4"
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'ghost'}
                  size="sm"
                  className="w-9 h-9"
                  onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4"
              disabled={currentPage === totalPages}
              onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}