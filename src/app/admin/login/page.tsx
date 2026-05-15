'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Access Granted',
        description: 'Welcome to the Benace Admin Portal.',
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-black">Benace Admin</h1>
          <p className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Authorized Access Only</p>
        </div>

        <Card className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
          <CardHeader className="bg-zinc-50 border-b-4 border-black">
            <CardTitle className="text-xl font-black uppercase tracking-tight">Login</CardTitle>
            <CardDescription className="font-bold text-zinc-500">Manage your shop inventory and services.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Admin Email</label>
                <Input
                  type="email"
                  placeholder="admin@benace.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-2 border-black font-bold focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 border-2 border-black font-bold focus-visible:ring-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 bg-black font-black uppercase tracking-widest text-white hover:bg-primary hover:text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,186,242,1)] active:translate-y-1 active:shadow-none transition-all"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Sign Into Hub'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Benace Tech Hub &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
