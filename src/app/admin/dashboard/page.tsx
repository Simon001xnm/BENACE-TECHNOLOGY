
'use client';

import { useUser, useCollection, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { collection, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, ShoppingBag, AlertTriangle, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const db = useFirestore();

  const productsQuery = db ? query(collection(db, 'products')) : null;
  const { data: products, loading: productsLoading } = useCollection(productsQuery);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || productsLoading) {
    return <div className="p-8">Loading stats...</div>;
  }

  const stats = {
    totalProducts: products?.length || 0,
    outOfStock: products?.filter(p => !p.inStock).length || 0,
    categories: [...new Set(products?.map(p => p.category))].length,
    newArrivals: products?.filter(p => p.status === 'New').length || 0,
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">Dashboard Overview</h1>
          <p className="text-muted-foreground font-medium">Welcome back, Admin</p>
        </div>
        <Button asChild className="bg-primary text-black font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest">Total Inventory</CardTitle>
            <Laptop className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{stats.totalProducts}</div>
            <p className="text-xs font-bold text-muted-foreground mt-1">Laptops & Accessories</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,186,242,1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest">Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-red-500">{stats.outOfStock}</div>
            <p className="text-xs font-bold text-muted-foreground mt-1">Items out of stock</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest">Categories</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{stats.categories}</div>
            <p className="text-xs font-bold text-muted-foreground mt-1">Live Product Groups</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,186,242,1)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest">Fresh Stock</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">{stats.newArrivals}</div>
            <p className="text-xs font-bold text-zinc-400 mt-1">New Arrivals this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 rounded-xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" asChild className="h-16 border-2 border-black font-black uppercase hover:bg-zinc-50">
            <Link href="/admin/products">Manage Inventory</Link>
          </Button>
          <Button variant="outline" className="h-16 border-2 border-black font-black uppercase hover:bg-zinc-50">
            Update Prices
          </Button>
          <Button variant="outline" className="h-16 border-2 border-black font-black uppercase hover:bg-zinc-50">
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
