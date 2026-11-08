'use client';

import { useUser, useCollection, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { collection, query } from 'firebase/firestore';
import { Laptop, ShoppingCart, DollarSign, Activity, ArrowUpRight, Plus, Package, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ImportDataButton } from '@/components/admin/import-data-button';
import { cn } from '@/lib/utils';

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
      <div className="flex h-screen items-center justify-center bg-[#f3f6f9]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Synchronizing Hub...</span>
        </div>
      </div>
    );
  }

  const stats = {
    totalProducts: products?.length || 0,
    outOfStock: products?.filter(p => !p.inStock).length || 0,
    inventoryValue: products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0,
    categories: [...new Set(products?.map(p => p.category))].length,
  };

  return (
    <div className="p-8 space-y-10 bg-[#f3f6f9] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900 leading-none">Intelligence Command</h1>
            <p className="font-bold text-zinc-400 uppercase tracking-widest text-[10px] mt-2">Global Storefront Monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <ImportDataButton />
            <Button asChild className="rounded-lg h-10 bg-indigo-500 hover:bg-indigo-600 text-white font-bold uppercase text-[10px] tracking-widest px-6 shadow-xl shadow-indigo-500/20">
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" /> Quick Entry
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: 'Total Catalog', value: stats.totalProducts, icon: Package, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Out of Stock', value: stats.outOfStock, icon: Laptop, color: 'text-rose-500', bg: 'bg-rose-50' },
            { label: 'Asset Valuation', value: `KES ${(stats.inventoryValue / 1000).toFixed(1)}k`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Inquiries', value: '12 Active', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border transition-all hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <ArrowUpRight className="h-3 w-3 text-zinc-300" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{stat.label}</p>
                <div className="text-2xl font-black tracking-tight text-zinc-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white rounded-2xl border p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[12px] font-black uppercase tracking-widest text-zinc-900">Recent System Activity</h2>
              <Link href="/admin/products" className="text-[10px] font-bold text-indigo-500 uppercase hover:underline">Full Registry</Link>
            </div>
            
            <div className="space-y-6">
               {products?.slice(0, 5).map((p, i) => (
                 <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 border-zinc-50">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-300">
                          <Package className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-xs font-bold uppercase tracking-tight text-zinc-900">{p.name}</p>
                          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{p.brand} • {p.status}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-zinc-900">KES {p.price.toLocaleString()}</p>
                       <p className="text-[8px] font-bold text-emerald-500 uppercase mt-0.5">Synced</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 blur-[60px] group-hover:blur-[80px] transition-all"></div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-2">Live Storefront</h3>
                <p className="text-[10px] font-bold text-indigo-100 mb-8 uppercase leading-relaxed tracking-wider">Monitor real-time changes across the global infrastructure.</p>
                <Button asChild className="w-full h-11 rounded-lg bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:bg-zinc-100 transition-all">
                  <Link href="/" target="_blank">Access Portal</Link>
                </Button>
             </div>

             <div className="bg-white rounded-xl border p-6 space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Database Core</span>
                   <Activity className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-50">
                   <span className="text-[11px] font-bold text-zinc-600 uppercase">Uptime</span>
                   <span className="text-[11px] font-black text-zinc-900">99.99%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-50">
                   <span className="text-[11px] font-bold text-zinc-600 uppercase">Latency</span>
                   <span className="text-[11px] font-black text-zinc-900">24ms</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
