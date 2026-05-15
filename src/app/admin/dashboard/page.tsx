'use client';

import { useUser, useCollection, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { collection, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, ShoppingBag, AlertTriangle, TrendingUp, Plus, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const db = useFirestore();

  const productsQuery = useMemo(() => (db ? query(collection(db, 'products')) : null), [db]);
  const { data: products, loading: productsLoading } = useCollection(productsQuery);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || productsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="text-center font-black uppercase tracking-widest animate-pulse">
          Synchronizing Data...
        </div>
      </div>
    );
  }

  const stats = {
    totalProducts: products?.length || 0,
    outOfStock: products?.filter(p => !p.inStock).length || 0,
    categories: [...new Set(products?.map(p => p.category))].length,
    newArrivals: products?.filter(p => p.status === 'New').length || 0,
  };

  return (
    <div className="space-y-8 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black">Hub Overview</h1>
          <p className="font-bold text-muted-foreground uppercase tracking-widest text-xs mt-1">
            Real-time status of Benace Tech Hub
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild className="bg-primary text-black font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> New Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Stock', value: stats.totalProducts, icon: Laptop, shadow: 'rgba(0,0,0,1)', desc: 'Live Listings' },
          { label: 'Out of Stock', value: stats.outOfStock, icon: AlertTriangle, shadow: 'rgba(239,68,68,1)', color: 'text-red-500', desc: 'Needs Attention' },
          { label: 'Active Categories', value: stats.categories, icon: TrendingUp, shadow: 'rgba(0,186,242,1)', desc: 'Product Groups' },
          { label: 'Fresh Stock', value: stats.newArrivals, icon: ShoppingBag, shadow: 'rgba(0,0,0,1)', bg: 'bg-black text-white', color: 'text-primary', desc: 'Brand New Items' }
        ].map((stat, i) => (
          <Card key={i} className={`border-4 border-black shadow-[6px_6px_0px_0px_${stat.shadow}] transition-all hover:-translate-y-1 ${stat.bg || 'bg-white'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color || 'text-primary'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-5xl font-black ${stat.color}`}>{stat.value}</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8">Management Shortcuts</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Inventory Hub', href: '/admin/products', icon: Laptop, color: 'hover:bg-primary/10' },
                { label: 'System Settings', href: '/admin/settings', icon: Settings, color: 'hover:bg-zinc-100' },
                { label: 'Customer Base', href: '/admin/customers', icon: Users, color: 'hover:bg-zinc-100' },
                { label: 'Add Laptop', href: '/admin/products/new', icon: Plus, color: 'hover:bg-primary/10' }
              ].map((link, i) => (
                <Button key={i} variant="outline" asChild className={`h-20 border-2 border-black font-black uppercase flex items-center justify-start gap-4 px-6 transition-all ${link.color}`}>
                  <Link href={link.href}>
                    <link.icon className="h-6 w-6" />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border-4 border-black bg-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-black font-black uppercase tracking-tight mb-2">Need Help?</h3>
            <p className="text-sm font-bold text-black/70 mb-6 leading-tight">Access technical support or view your website analytics directly.</p>
            <Button className="w-full bg-black text-white font-black uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors">
              Contact Tech
            </Button>
          </div>
          
          <div className="rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,186,242,1)]">
             <div className="flex items-center justify-between mb-4">
               <span className="text-xs font-black uppercase tracking-widest">Server Status</span>
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
             </div>
             <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Synced with Firebase Live</p>
          </div>
        </div>
      </div>
    </div>
  );
}
