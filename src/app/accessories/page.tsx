'use client';

import { useState, useMemo } from 'react';
import { AccessoryCard } from '@/components/accessories/accessory-card';
import { accessories } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const categories = ['all', ...new Set(accessories.map(a => a.category))];

export default function AccessoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAccessories = useMemo(() => {
    return accessories
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item =>
        selectedCategory === 'all' ? true : item.category === selectedCategory
      );
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Computer Accessories & Peripherals
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Everything from printers and scanners to monitors and backup power solutions.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-lg border bg-card p-4">
        <div className="flex-grow max-w-md">
          <Input
            placeholder="Search accessories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
            Reset
          </Button>
        </div>
      </div>

      {filteredAccessories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAccessories.map(accessory => (
            <AccessoryCard key={accessory.id} accessory={accessory} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h3 className="text-xl font-medium">No accessories found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
