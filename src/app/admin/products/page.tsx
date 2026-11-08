'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, deleteDoc, doc, query, orderBy, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Search, Edit2, Trash2, ExternalLink, DatabaseBackup, Loader2, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ImportDataButton } from '@/components/admin/import-data-button';

export default function AdminProductsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

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

  const handleDelete = async () => {
    if (!db || !productToDelete) return;

    try {
      await deleteDoc(doc(db, 'products', productToDelete));
      toast({ title: 'Record Removed', description: 'Inventory has been synchronized.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update registry.' });
    } finally {
      setProductToDelete(null);
    }
  };

  const handleClearAll = async () => {
    if (!db) return;
    setIsClearingAll(true);
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const deletions = snapshot.docs.map(d => deleteDoc(doc(db, 'products', d.id)));
      await Promise.all(deletions);
      toast({ title: 'Inventory Purged', description: 'All records have been cleared.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Clear Failed', description: 'Process interrupted.' });
    } finally {
      setIsClearingAll(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 leading-none">Stock Registry</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-3">Advanced Inventory Control Module</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="ghost" 
            onClick={handleClearAll} 
            disabled={isClearingAll || !filteredProducts.length}
            className="rounded-xl font-black uppercase text-[10px] tracking-widest text-red-500 hover:bg-red-50 h-11 px-5"
          >
            {isClearingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            Purge Core
          </Button>
          <ImportDataButton />
          <Button asChild className="rounded-xl h-11 bg-primary text-white font-black uppercase text-[10px] tracking-widest px-6 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Create Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Search across brand, model, and processor matrix..."
            className="h-12 border-zinc-100 bg-white rounded-2xl pl-11 text-[11px] font-bold uppercase tracking-wide focus:ring-primary/20 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 px-6 rounded-2xl border-zinc-100 font-black uppercase text-[10px] tracking-widest">
           <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

      <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="border-b border-zinc-100">
              <TableHead className="font-black uppercase text-[9px] tracking-[0.2em] text-zinc-400 py-4 px-6">Specification</TableHead>
              <TableHead className="font-black uppercase text-[9px] tracking-[0.2em] text-zinc-400 py-4 px-6">Classification</TableHead>
              <TableHead className="font-black uppercase text-[9px] tracking-[0.2em] text-zinc-400 py-4 px-6">Valuation</TableHead>
              <TableHead className="font-black uppercase text-[9px] tracking-[0.2em] text-zinc-400 py-4 px-6">Status</TableHead>
              <TableHead className="font-black uppercase text-[9px] tracking-[0.2em] text-zinc-400 py-4 px-6">Stock</TableHead>
              <TableHead className="text-right py-4 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col">
                    <span className="font-black text-xs text-zinc-900 uppercase tracking-tight">{product.name}</span>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{product.brand}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">{product.category || 'Laptop'}</span>
                </TableCell>
                <TableCell className="py-4 px-6 font-black text-xs text-zinc-900">
                  KES {product.price.toLocaleString()}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <Badge variant="outline" className={cn("rounded-full font-black uppercase text-[8px] tracking-widest px-3", product.status === 'New' ? 'text-emerald-500 border-emerald-100' : 'text-zinc-500 border-zinc-100')}>
                    {product.status || 'New'}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-1.5 w-1.5 rounded-full", product.inStock !== false ? "bg-emerald-500" : "bg-red-500")}></div>
                    <span className="text-[10px] font-bold uppercase text-zinc-600">{product.inStock !== false ? 'Active' : 'Offline'}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-zinc-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-zinc-100 p-2 min-w-[140px] shadow-xl">
                      <DropdownMenuLabel className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                        <Link href={`/admin/products/${product.id}/edit`} className="flex items-center text-[10px] font-black uppercase py-2">
                          <Edit2 className="mr-2 h-3.5 w-3.5 text-zinc-400" /> Edit Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                        <Link href={`/laptops/${product.id}`} target="_blank" className="flex items-center text-[10px] font-black uppercase py-2">
                          <ExternalLink className="mr-2 h-3.5 w-3.5 text-zinc-400" /> Live View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="rounded-lg text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer text-[10px] font-black uppercase py-2"
                        onClick={() => setProductToDelete(product.id)}
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Erase
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredProducts.length === 0 && !loading && (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center">
              <DatabaseBackup className="h-8 w-8 text-zinc-200" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-zinc-900">Registry Empty</p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">No matching assets found in the current hub</p>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent className="rounded-[2rem] border-zinc-100 shadow-2xl p-8 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black uppercase tracking-tight">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-xs font-bold text-zinc-500 leading-relaxed uppercase tracking-wider mt-2">
              You are about to permanently erase this product profile from the global storefront. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 gap-3">
            <AlertDialogCancel className="rounded-2xl h-11 border-zinc-100 font-black uppercase text-[10px] tracking-widest">Abort</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-2xl h-11 bg-red-600 text-white hover:bg-red-700 font-black uppercase text-[10px] tracking-widest">
              Confirm Erasure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
