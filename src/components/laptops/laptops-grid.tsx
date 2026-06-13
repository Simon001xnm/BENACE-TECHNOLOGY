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
  DatabaseBackup,
  SlidersHorizontal
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to list for better comparison
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
      <div className="bg-white p-6 border border-zinc-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h3 className="font-black text-xs uppercase tracking-widest text-black">Technical Filters</h3>
        </div>
        <Accordion type="multiple" defaultValue={["brand", "status"]} className="w-full">
          <AccordionItem value="brand" className="border-none">
            <AccordionTrigger className="text-[10px] font-black uppercase tracking-widest py-3 hover:no-underline">Brand</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-3 group cursor-pointer">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                      className="border-zinc-300 data-[state=checked]:bg-black"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none cursor-pointer text-zinc-600 group-hover:text-black transition-colors">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <div className="h-px bg-zinc-100 my-2" />
          <AccordionItem value="status" className="border-none">
            <AccordionTrigger className="text-[10px] font-black uppercase tracking-widest py-3 hover:no-underline">Condition</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {statuses.map(status => (
                  <div key={status} className="flex items-center space-x-3 group cursor-pointer">
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={selectedStatus.includes(status)}
                      onCheckedChange={() => toggleStatus(status)}
                      className="border-zinc-300 data-[state=checked]:bg-black"
                    />
                    <label htmlFor={`status-${status}`} className="text-sm font-medium leading-none cursor-pointer text-zinc-600 group-hover:text-black transition-colors">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button 
          variant="ghost" 
          className="w-full mt-8 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-500"
          onClick={() => { setSelectedBrands([]); setSelectedStatus([]); setSearchTerm(''); }}
        >
          Reset All
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Syncing Catalog...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-24 h-fit">
        <FilterSidebar />
      </aside>

      <main className="lg:col-span-3 space-y-6">
        {/* Toolbar */}
        <div className="bg-white border border-zinc-200 p-4 rounded-xl flex flex-col sm:flex-row gap-6 items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 w-full sm:w-auto">
             <Sheet>
               <SheetTrigger asChild>
                 <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2 h-10 px-4 border-zinc-300">
                   <Filter className="h-4 w-4" /> Filters
                 </Button>
               </SheetTrigger>
               <SheetContent side="left" className="w-[300px] border-r-4 border-black">
                 <SheetHeader className="mb-8">
                   <SheetTitle className="text-left font-black uppercase text-xl">Catalog Filters</SheetTitle>
                 </SheetHeader>
                 <FilterSidebar />
               </SheetContent>
             </Sheet>
             
             <div className="relative flex-grow sm:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
               <Input 
                 placeholder="Search by model or brand..." 
                 className="pl-11 h-11 border-zinc-200 focus:ring-primary rounded-lg text-sm font-medium"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
             </div>
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Sort:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 w-48 border-zinc-200 font-bold text-xs rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-bold">
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-8 w-8 rounded-md transition-all", viewMode === 'grid' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-black")}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-8 w-8 rounded-md transition-all", viewMode === 'list' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-black")}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] px-2">
          <span>Displaying {filteredLaptops.length} Master Units</span>
          {totalPages > 1 && <span>Page {currentPage} / {totalPages}</span>}
        </div>

        {/* Container */}
        {paginatedLaptops.length > 0 ? (
          <div className={cn(
            "gap-6",
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
              : "flex flex-col"
          )}>
            {paginatedLaptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-zinc-100 rounded-2xl py-24 text-center">
            <DatabaseBackup className="mx-auto h-12 w-12 text-zinc-100 mb-6" />
            <p className="text-black font-black uppercase tracking-widest text-sm">No Hardware Found</p>
            <p className="text-zinc-400 text-xs mt-2 font-medium">Try adjusting your filters or search terms.</p>
            <Button variant="link" className="text-primary font-bold mt-4" onClick={() => { setSelectedBrands([]); setSelectedStatus([]); setSearchTerm(''); }}>
              Clear Search Parameters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12 py-8">
            <Button
              variant="outline"
              className="h-10 px-6 border-zinc-200 font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'ghost'}
                  className={cn("w-10 h-10 font-black", currentPage === i + 1 ? "bg-black text-white" : "text-zinc-400 hover:text-black")}
                  onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              className="h-10 px-6 border-zinc-200 font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
              disabled={currentPage === totalPages}
              onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
