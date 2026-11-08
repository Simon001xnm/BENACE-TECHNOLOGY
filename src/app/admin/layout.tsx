'use client';

import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Laptop, 
  ShoppingCart, 
  LogOut, 
  Settings, 
  Menu, 
  Globe, 
  ChevronRight,
  Search,
  Bell,
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <div className="flex h-screen items-center justify-center bg-[#1e1e2d]">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white animate-pulse">
          Loading DashboardKit...
        </div>
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Inventory', href: '/admin/products', icon: Laptop },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#1e1e2d] text-zinc-400 p-0">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg">
          <Globe className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-black tracking-tighter text-white uppercase">Benace Hub</span>
      </div>
      
      <div className="p-4 uppercase text-[10px] font-bold tracking-[0.2em] text-zinc-500 mt-4">Navigation</div>
      <nav className="flex-grow px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-all",
                isActive 
                  ? "bg-white/5 text-white" 
                  : "hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-indigo-400" : "text-zinc-500")} />
              <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 border-t border-white/5 space-y-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 rounded-xl font-bold uppercase text-[10px] tracking-widest text-zinc-500 hover:bg-white/5 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f3f6f9]">
      <aside className="hidden w-[240px] lg:block flex-shrink-0 sticky top-0 h-screen z-50">
        <SidebarContent />
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        <header className="flex h-16 items-center justify-between bg-white border-b px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileOpen(true)}>
                <Menu className="h-5 w-5" />
             </Button>
             <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                {pathname.split('/').filter(Boolean).map((part, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <ChevronRight className="h-3 w-3" />}
                    <span className={i === pathname.split('/').filter(Boolean).length - 1 ? "text-zinc-900" : ""}>{part}</span>
                  </span>
                ))}
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="h-9 w-64 bg-zinc-100 border-none rounded-lg pl-10 text-[11px] font-bold focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative text-zinc-400">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 h-2 w-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            </Button>
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black uppercase text-zinc-900 leading-none">Admin Hub</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase mt-1">System Controller</p>
              </div>
              <Avatar className="h-9 w-9 rounded-lg border">
                <AvatarFallback className="bg-indigo-50 text-indigo-500 font-bold text-xs">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>
      </div>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 border-none w-[240px]">
            <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}
