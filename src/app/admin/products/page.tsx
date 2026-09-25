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
import { MoreHorizontal, Plus, Search, Edit2, Trash2, ExternalLink, DatabaseBackup, Loader2 } from 'lucide-react';
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
import { laptops as staticLaptops } from '@/lib/data';

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

  const combinedProducts = useMemo(() => {
    const liveItems = dbProducts || [];
    const staticItems = staticLaptops.map(l => ({ ...l, type: 'laptop' as const }));
    
    // Merge by ID ensuring live items override static templates
    const registry = new Map();
    staticItems.forEach(item => registry.set(item.id, item));
    liveItems.forEach(item => registry.set(item.id, item));
    
    return Array.from(registry.values());
  }, [dbProducts]);

  const filteredProducts = useMemo(() => {
    return combinedProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      'laptops'.includes(searchTerm.toLowerCase())
    );
  }, [combinedProducts, searchTerm]);

  const handleDelete = async () => {
    if (!db || !productToDelete) return;

    try {
      await deleteDoc(doc(db, 'products', productToDelete));
      toast({
        title: 'Product Deleted',
        description: 'The product configuration was updated.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not complete modification.',
      });
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
      toast({ variant: 'destructive', title: 'Clear Failed', description: 'Could not empty the repository.' });
    } finally {
      setIsClearingAll(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">Inventory Management</h1>
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mt-1">Manage your active stock registry</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="destructive" 
            onClick={handleClearAll} 
            disabled={isClearingAll || !combinedProducts.length}
            className="border-2 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-xs h-10 px-4"
          >
            {isClearingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            Clear All
          </Button>
          <ImportDataButton />
          <Button asChild className="bg-primary text-primary-foreground font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-xs h-10 px-4">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-11">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items by keyword, processor or brand..."
          className="border-none bg-transparent focus-visible:ring-0 font-bold text-xs uppercase"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50 border-b-2 border-black">
            <TableRow>
              <TableHead className="font-black uppercase text-[10px] tracking-wider text-black">Product Model</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-wider text-black">Category</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-wider text-black">Price</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-wider text-black">Condition</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-wider text-black">Stock Status</TableHead>
              <TableHead className="text-right font-black uppercase text-[10px] tracking-wider text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-black text-xs text-black uppercase">{product.name}</span>
                    <span className="text-[9px] font-black text-[#0070ba] uppercase tracking-widest mt-0.5">{product.brand} • {product.specifications?.processor || 'Standard Specs'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-black font-black uppercase text-[9px] tracking-wider bg-zinc-50 rounded-none">
                    {product.category || 'Laptops'}
                  </Badge>
                </TableCell>
                <TableCell className="font-black text-xs text-zinc-900">
                  KES {product.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={`font-black uppercase text-[9px] tracking-widest rounded-none ${product.status === 'New' ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>
                    {product.status || 'New'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.inStock !== false ? 'secondary' : 'destructive'} className="font-black uppercase text-[9px] tracking-wider rounded-none">
                    {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-2 border-black font-black text-xs rounded-none uppercase tracking-wide bg-white">
                      <DropdownMenuLabel className="text-[9px] tracking-widest text-zinc-400">Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/admin/products/${product.id}/edit`} className="flex items-center">
                          <Edit2 className="mr-2 h-3.5 w-3.5" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/laptops/${product.id}`} target="_blank" className="flex items-center">
                          <ExternalLink className="mr-2 h-3.5 w-3.5" /> View Live
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer font-black"
                        onClick={() => setProductToDelete(product.id)}
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center font-bold text-muted-foreground">
                  <div className="flex flex-col items-center gap-4 justify-center">
                    <DatabaseBackup className="h-8 w-8 text-zinc-300" />
                    <div>
                      <p className="text-black uppercase font-black text-xs tracking-wider">No matching inventory records found</p>
                      <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">Add customized models manually or adjust search fields</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black uppercase tracking-tight">Confirm Stock Deletion</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-xs uppercase tracking-wide text-zinc-500">
              This action will remove the product profile from the public storefront and client order modules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-2 border-black font-black uppercase text-xs rounded-none">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white font-black uppercase border-2 border-black hover:bg-red-700 text-xs rounded-none">
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
