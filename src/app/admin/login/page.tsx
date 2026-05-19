'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from '@/lib/utils';

const AUTHORIZED_ADMIN_EMAIL = "benacetechnologies@gmail.com";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [configError, setConfigError] = useState(false);
  
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (auth?.app.options.apiKey?.includes('placeholder')) {
      setConfigError(true);
    }
  }, [auth]);

  const validateUser = async (user: any) => {
    if (user.email !== AUTHORIZED_ADMIN_EMAIL) {
      await signOut(auth!);
      // Silent fail for unauthorized emails
      return false;
    }
    return true;
  };

  const handleGoogleLogin = async () => {
    if (!auth || configError) return;

    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const isAllowed = await validateUser(result.user);
      if (isAllowed) {
        toast({ title: 'God Mode Active', description: 'Welcome back, Administrator.' });
        router.push('/admin/dashboard');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Auth Error', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || configError) return;
    
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const isAllowed = await validateUser(result.user);
      if (isAllowed) {
        toast({ title: 'Welcome Back', description: 'Authenticated successfully.' });
        router.push('/admin/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials or unauthorized account.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-12 selection:bg-primary selection:text-white">
      <div className="w-full max-w-[440px]">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black shadow-xl ring-4 ring-white">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">
            Benace <span className="text-primary">Master</span>
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            God Account Privileges Only
          </p>
        </div>

        {configError && (
          <Alert variant="destructive" className="mb-8 border-2 border-red-100 bg-red-50/50 text-red-900">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-[10px] font-black uppercase tracking-widest">Setup Required</AlertTitle>
            <AlertDescription className="text-xs font-bold">
              Check Firebase Configuration.
            </AlertDescription>
          </Alert>
        )}

        <Card className={cn("border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]", configError && "opacity-50")}>
          <CardHeader className="space-y-1 pb-8 pt-8 text-center">
            <CardTitle className="text-2xl font-black tracking-tight uppercase">Admin Login</CardTitle>
            <CardDescription className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Only {AUTHORIZED_ADMIN_EMAIL} can enter
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading || configError}
              className="flex w-full h-12 items-center justify-center gap-3 border-2 border-black font-black uppercase transition-all hover:bg-zinc-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Master Google Access
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-zinc-100" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
                <span className="bg-white px-2">OR SECURE PASS</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-300" />
                  <Input
                    type="email"
                    placeholder="benacetechnologies@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-2 border-black bg-zinc-50/30 pl-10 font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Passphrase</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-300" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-2 border-black bg-zinc-50/30 pl-10 font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading || configError}
                className="w-full h-12 bg-black text-white font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
              >
                {loading ? 'Verifying...' : <><LogIn className="mr-2 h-4 w-4" /> Authorize Entry</>}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="bg-zinc-50/50 p-6 flex justify-center">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center">
                Security Enforced by Firebase Auth & Rules
             </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
