'use client';

import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Laptop, ShoppingCart, LogOut, Settings, Menu, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [user, loading, pathname, router]);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8f9fa]">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-pulse">
          Initializing Hub OS...
        </div>
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Inventory', href: '/admin/products', icon: Laptop },
    { label: 'Order Hub', href: '/admin/orders', icon: ShoppingCart },
    { label: 'System', href: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white border-r border-zinc-100 p-5">
      <div className="mb-10 px-2">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-tighter text-black">Benace</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Admin OS</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-2.5 transition-all group",
                isActive 
                  ? "bg-primary/5 text-primary shadow-sm" 
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-black"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-zinc-400 group-hover:text-black")} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-3 w-3" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-6">
        <div className="px-4 py-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Active Session</p>
          <p className="text-[10px] font-bold truncate text-black">{user?.email}</p>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 rounded-xl font-black uppercase text-[10px] tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <aside className="hidden w-64 lg:block flex-shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-100 px-6 py-3 lg:hidden">
          <Link href="/admin/dashboard" className="font-black uppercase tracking-tighter text-sm">Benace Hub</Link>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-64">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
