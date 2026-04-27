'use client';

import { useState, useMemo } from 'react';
import { LaptopCard } from '@/components/laptops/laptop-card';
import { laptops as allLaptops } from '@/lib/data';
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

const brands = [...new Set(allLaptops.map(l => l.brand))];
const maxPrice = Math.ceil(Math.max(...allLaptops.map(l => l.price)));

export function LaptopsGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([15000, 40000]);

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
  }, [searchTerm, selectedBrand, priceRange]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setPriceRange([0, maxPrice]);
  };

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 rounded-lg border bg-card p-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <Input
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price Range:</span>
            <span className="font-medium">KSH {priceRange[0]} - KSH {priceRange[1]}</span>
          </div>
          <Slider
            min={0}
            max={maxPrice}
            step={1000}
            value={priceRange}
            onValueChange={setPriceRange}
          />
        </div>
        <div className="md:col-span-4 flex justify-end">
            <Button variant="ghost" onClick={resetFilters}>Reset Filters</Button>
        </div>
      </div>
      {filteredLaptops.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLaptops.map(laptop => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
            <h3 className="text-xl font-medium">No Laptops Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
