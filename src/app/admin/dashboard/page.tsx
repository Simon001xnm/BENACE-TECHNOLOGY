'use client';

import { useUser, useCollection, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { collection, query } from 'firebase/firestore';
import { Laptop, AlertTriangle, TrendingUp, Plus, DollarSign, Users, ArrowUpRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ImportDataButton } from '@/components/admin/import-data-button';

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
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Syncing Matrix...</span>
        </div>
      </div>
    );
  }

  const stats = {
    totalProducts: products?.length || 0,
    outOfStock: products?.filter(p => !p.inStock).length || 0,
    categories: [...new Set(products?.map(p => p.category))].length,
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-px border-zinc-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Live</span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-zinc-900 leading-none">Hub Intelligence</h1>
          <p className="font-bold text-zinc-400 uppercase tracking-widest text-[10px] mt-2">Unified Storefront Analytics & Management</p>
        </div>
        <div className="flex items-center gap-3">
          <ImportDataButton />
          <Button asChild className="rounded-xl h-11 bg-primary text-white font-black uppercase text-[10px] tracking-widest px-6 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> New Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Inventory', value: stats.totalProducts, icon: Laptop, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Shortage Alert', value: stats.outOfStock, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Catalog Groups', value: stats.categories, icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Customer Trust', value: '4.9', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50' }
        ].map((stat, i) => (
          <div key={i} className="group bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-2.5 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-200 group-hover:text-zinc-400 transition-colors" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{stat.label}</p>
              <div className="text-4xl font-black tracking-tight text-zinc-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">Command Modules</h2>
              <Link href="/admin/products" className="text-[10px] font-black uppercase text-primary hover:underline">Full Inventory</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Control Registry', sub: 'Update & manage live stock in real-time', href: '/admin/products', icon: Laptop, accent: 'bg-zinc-900 text-white' },
                { label: 'Communications', sub: 'Monitor customer WhatsApp inquiries', href: '/admin/orders', icon: TrendingUp, accent: 'bg-zinc-50 text-zinc-900' },
                { label: 'Global Configurations', sub: 'Adjust storefront system preferences', href: '/admin/settings', icon: Users, accent: 'bg-zinc-50 text-zinc-900' },
                { label: 'Instant Launch', sub: 'Deploy new product profiles instantly', href: '/admin/products/new', icon: Plus, accent: 'bg-primary text-white' }
              ].map((link, i) => (
                <Link key={i} href={link.href} className={`flex flex-col p-6 rounded-3xl border border-zinc-100 transition-all hover:shadow-lg hover:bg-zinc-50 group`}>
                   <div className={`h-10 w-10 flex items-center justify-center rounded-2xl mb-4 transition-transform group-hover:scale-110 ${link.accent}`}>
                     <link.icon className="h-5 w-5" />
                   </div>
                   <h3 className="text-xs font-black uppercase tracking-tight mb-1">{link.label}</h3>
                   <p className="text-[10px] font-bold text-zinc-400 leading-tight uppercase tracking-wide">{link.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 blur-[80px] group-hover:blur-[100px] transition-all"></div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Frontier Mode</h3>
            <p className="text-[11px] font-bold text-zinc-400 mb-8 uppercase leading-relaxed tracking-wider">Your changes are deployed to the global storefront with zero latency.</p>
            <Button asChild className="w-full h-12 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all">
              <Link href="/" target="_blank">Access Live Site</Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm flex items-center justify-between">
             <div className="space-y-1">
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Database Core</span>
               <p className="text-xs font-bold uppercase tracking-tight">Sync Integrity 100%</p>
             </div>
             <Activity className="h-6 w-6 text-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
