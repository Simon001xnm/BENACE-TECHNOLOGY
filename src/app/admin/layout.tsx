'use client';

import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Laptop, ShoppingCart, LogOut, Settings, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const AUTHORIZED_ADMIN_EMAIL = "benacetechnologies@gmail.com";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (user && user.email !== AUTHORIZED_ADMIN_EMAIL) {
        // Double check on every route change in the admin section
        signOut(auth!).then(() => {
           toast({
             variant: 'destructive',
             title: 'Unauthorized',
             description: 'You do not have access to this portal.',
           });
           router.push('/admin/login');
        });
      }
    }
  }, [user, loading, pathname, router, auth, toast]);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="text-center font-black uppercase tracking-widest animate-pulse">
          Authenticating Master Account...
        </div>
      </div>
    );
  }

  // If not logged in or wrong email and not on login page, don't render content
  if ((!user || user.email !== AUTHORIZED_ADMIN_EMAIL) && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Laptop },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-black text-white p-6">
      <div className="mb-10">
        <Link href="/" className="flex flex-col group transition-transform hover:scale-[1.02]">
          <span className="text-2xl font-black uppercase tracking-tighter text-primary">Benace</span>
          <span className="text-2xl font-black uppercase tracking-tighter">Admin Hub</span>
          <span className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-primary transition-colors">
            <Globe className="h-2 w-2" /> Back to Website
          </span>
        </Link>
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
        <div className="mb-4 px-4 py-2 bg-zinc-900 rounded-lg">
          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Signed in as</p>
          <p className="text-[10px] font-bold truncate text-primary">{user?.email}</p>
        </div>
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
      <aside className="hidden w-64 lg:block flex-shrink-0">
        <SidebarContent />
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b bg-white p-4 lg:hidden">
          <Link href="/" className="font-black uppercase tracking-tighter">Benace Admin</Link>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
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