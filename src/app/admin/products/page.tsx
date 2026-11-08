'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, deleteDoc, doc, query, orderBy, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  LayoutGrid, 
  List, 
  Filter,
  MoreVertical,
  CheckCircle2,
  Package,
  ArrowUpDown,
  FileDown
} from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AdminProductsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbProducts, loading } = useCollection(productsQuery);

  const filteredProducts = useMemo(() => {
    const products = dbProducts || [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dbProducts, searchTerm]);

  const handleBulkDelete = async () => {
    if (!db || selectedProducts.length === 0) return;
    try {
      await Promise.all(selectedProducts.map(id => deleteDoc(doc(db, 'products', id))));
      toast({ title: 'Bulk Purge Complete', description: `${selectedProducts.length} items removed.` });
      setSelectedProducts([]);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Bulk deletion failed.' });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="bg-white border-b px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight text-zinc-900">Product Collection</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Inventory Management</span>
            <ChevronRight className="h-2 w-2 text-zinc-300" />
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Active Stock</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedProducts.length > 0 && (
             <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="rounded-lg text-[10px] font-bold uppercase">
               Delete Selected ({selectedProducts.length})
             </Button>
          )}
          <div className="flex bg-zinc-100 rounded-lg p-1">
            <Button 
              variant={viewMode === 'grid' ? 'white' : 'ghost'} 
              size="icon" 
              className={cn("h-8 w-8 rounded-md shadow-none", viewMode === 'grid' && "bg-white shadow-sm")}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'table' ? 'white' : 'ghost'} 
              size="icon" 
              className={cn("h-8 w-8 rounded-md shadow-none", viewMode === 'table' && "bg-white shadow-sm")}
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button asChild className="rounded-lg h-9 bg-indigo-500 hover:bg-indigo-600 text-white font-bold uppercase text-[10px] tracking-widest px-5">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Filter Sidebar */}
        <aside className="w-64 border-r bg-white hidden xl:flex flex-col p-6 space-y-8 overflow-y-auto">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center justify-between">
              Filters <Filter className="h-3 w-3" />
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-zinc-500">Search Model</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <Input 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9 text-[11px] pl-9 bg-zinc-50 border-none rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase text-zinc-500">Categories</label>
                 {['Laptops', 'Accessories', 'Monitors', 'Printers'].map(cat => (
                   <div key={cat} className="flex items-center gap-2 px-1">
                     <Checkbox id={cat} className="h-3 w-3" />
                     <label htmlFor={cat} className="text-[11px] font-medium text-zinc-600 cursor-pointer">{cat}</label>
                   </div>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <Button variant="outline" className="w-full h-9 rounded-lg text-[10px] font-bold uppercase text-zinc-500" onClick={() => setSearchTerm('')}>
              Clear Filters
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 bg-zinc-50/50 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 cursor-pointer group">
                   <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-900 transition-colors">By Date</span>
                   <ArrowUpDown className="h-3 w-3 text-zinc-300" />
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                   <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-900 transition-colors">By Price</span>
                   <ArrowUpDown className="h-3 w-3 text-zinc-300" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-zinc-400">
                <span className="text-[11px] font-bold uppercase tracking-widest">Showing {filteredProducts.length} items</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white hover:text-indigo-500">
                  <FileDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {filteredProducts.map((product) => {
                   const displayImage = product.imageUrls?.[0] || PlaceHolderImages.find(img => img.id === product.imageId)?.imageUrl;
                   const isSelected = selectedProducts.includes(product.id);
                   return (
                    <div 
                      key={product.id} 
                      className={cn(
                        "group bg-white rounded-xl border p-4 transition-all hover:shadow-xl hover:-translate-y-1 relative",
                        isSelected && "border-indigo-500 ring-1 ring-indigo-500/20"
                      )}
                    >
                      <div className="absolute top-4 left-4 z-10">
                        <Checkbox 
                          checked={isSelected} 
                          onCheckedChange={(checked) => {
                            setSelectedProducts(prev => checked ? [...prev, product.id] : prev.filter(id => id !== product.id))
                          }}
                        />
                      </div>
                      <div className="relative aspect-square w-full mb-4 bg-zinc-50 rounded-lg overflow-hidden flex items-center justify-center">
                        {displayImage ? (
                          <Image src={displayImage} alt={product.name} fill className="object-contain p-4 transition-transform group-hover:scale-110" />
                        ) : (
                          <Package className="h-8 w-8 text-zinc-200" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">{product.brand}</p>
                        <h3 className="text-[11px] font-black uppercase text-zinc-900 line-clamp-1">{product.name}</h3>
                        <div className="flex items-center justify-between pt-2">
                           <p className="text-[12px] font-black text-zinc-900">KES {product.price.toLocaleString()}</p>
                           <Badge variant="outline" className={cn("rounded-full font-bold text-[8px] uppercase tracking-widest px-2", product.status === 'New' ? 'text-emerald-500 border-emerald-100' : 'text-zinc-500 border-zinc-100')}>
                             {product.status}
                           </Badge>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                        <Button asChild size="icon" variant="white" className="h-8 w-8 rounded-lg shadow-sm">
                          <Link href={`/admin/products/${product.id}/edit`}><Edit2 className="h-3.5 w-3.5 text-zinc-600" /></Link>
                        </Button>
                        <Button asChild size="icon" variant="white" className="h-8 w-8 rounded-lg shadow-sm">
                          <Link href={`/laptops/${product.id}`} target="_blank"><ExternalLink className="h-3.5 w-3.5 text-zinc-600" /></Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-zinc-50/50 border-b">
                    <TableRow>
                      <TableHead className="w-12"><Checkbox onCheckedChange={(checked) => setSelectedProducts(checked ? filteredProducts.map(p => p.id) : [])} /></TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-6">Model</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-6">Category</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-6">Price</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 px-6">Status</TableHead>
                      <TableHead className="text-right py-4 px-6"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id} className="hover:bg-zinc-50 transition-colors">
                        <TableCell><Checkbox checked={selectedProducts.includes(product.id)} onCheckedChange={(checked) => setSelectedProducts(prev => checked ? [...prev, product.id] : prev.filter(id => id !== product.id))} /></TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-zinc-50 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                               <Package className="h-4 w-4 text-zinc-300" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-xs uppercase">{product.name}</span>
                              <span className="text-[9px] font-bold text-zinc-400 uppercase mt-0.5">{product.brand}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">{product.category}</span>
                        </TableCell>
                        <TableCell className="py-4 px-6 font-bold text-xs">KES {product.price.toLocaleString()}</TableCell>
                        <TableCell className="py-4 px-6">
                           <Badge variant="outline" className="rounded-full font-bold text-[8px] uppercase px-2">{product.status}</Badge>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl p-2 border-none shadow-xl">
                              <DropdownMenuItem asChild><Link href={`/admin/products/${product.id}/edit`} className="text-[10px] font-bold uppercase">Edit Profile</Link></DropdownMenuItem>
                              <DropdownMenuItem asChild><Link href={`/laptops/${product.id}`} target="_blank" className="text-[10px] font-bold uppercase">View Live</Link></DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500 text-[10px] font-bold uppercase" onClick={async () => {
                                if (!db) return;
                                await deleteDoc(doc(db, 'products', product.id));
                                toast({ title: 'Removed' });
                              }}>Delete Permanently</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {filteredProducts.length === 0 && !loading && (
              <div className="py-32 flex flex-col items-center text-center">
                <div className="h-20 w-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="h-8 w-8 text-zinc-300" />
                </div>
                <h3 className="text-sm font-black uppercase text-zinc-900">Zero matches in current vault</h3>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">Adjust your search or filter matrix</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
