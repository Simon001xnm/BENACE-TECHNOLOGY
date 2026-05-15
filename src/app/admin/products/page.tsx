
'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
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
import { MoreHorizontal, Plus, Search, Edit2, Trash2, ExternalLink } from 'lucide-react';
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

export default function AdminProductsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const productsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: products, loading } = useCollection(productsQuery);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleDelete = async () => {
    if (!db || !productToDelete) return;

    try {
      await deleteDoc(doc(db, 'products', productToDelete));
      toast({
        title: 'Product Deleted',
        description: 'The product has been removed from inventory.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete product.',
      });
    } finally {
      setProductToDelete(null);
    }
  };

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">Inventory Management</h1>
          <p className="text-muted-foreground font-medium">Manage your laptops and accessories</p>
        </div>
        <Button asChild className="bg-primary text-black font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search inventory..."
          className="border-none bg-transparent focus-visible:ring-0 font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50 border-b-2 border-black">
            <TableRow>
              <TableHead className="font-black uppercase text-xs">Product</TableHead>
              <TableHead className="font-black uppercase text-xs">Category</TableHead>
              <TableHead className="font-black uppercase text-xs">Price</TableHead>
              <TableHead className="font-black uppercase text-xs">Status</TableHead>
              <TableHead className="font-black uppercase text-xs">Stock</TableHead>
              <TableHead className="text-right font-black uppercase text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-black text-sm">{product.name}</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.brand}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-black font-bold uppercase text-[10px]">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold">
                  KES {product.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={`font-bold uppercase text-[10px] ${product.status === 'New' ? 'bg-emerald-500' : product.status === 'Ex-UK' ? 'bg-black' : 'bg-primary'}`}>
                    {product.status || 'Standard'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? 'secondary' : 'destructive'} className="font-black uppercase text-[9px]">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-2 border-black font-bold">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}/edit`} className="flex items-center">
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/laptops/${product.id}`} target="_blank" className="flex items-center">
                          <ExternalLink className="mr-2 h-4 w-4" /> View Live
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => setProductToDelete(product.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center font-bold text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black uppercase">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="font-medium">
              This action cannot be undone. This will permanently delete the product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-2 border-black font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white font-black uppercase border-2 border-black hover:bg-red-700">
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
