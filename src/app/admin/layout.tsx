
'use client';

import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Laptop, ShoppingCart, LogOut, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/admin/login');
    }
  };

  if (loading) return null;
  if (!user && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Laptop },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-black text-white p-6">
      <div className="mb-10">
        <span className="text-2xl font-black uppercase tracking-tighter text-primary">Benace</span>
        <span className="text-2xl font-black uppercase tracking-tighter ml-1">Admin</span>
      </div>
      
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 font-bold transition-all ${
                isActive ? 'bg-primary text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 font-bold text-red-400 hover:text-red-300 hover:bg-red-950/20"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      <div className="flex-grow">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b bg-white p-4 lg:hidden">
          <span className="font-black uppercase tracking-tighter">Benace Admin</span>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none">
                <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
