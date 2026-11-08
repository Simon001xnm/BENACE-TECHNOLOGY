'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Mail, Lock, LogIn, AlertCircle, UserPlus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from '@/lib/utils';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
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

  const handleGoogleLogin = async () => {
    if (!auth || configError) return;

    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      toast({ title: 'Authorized', description: 'Access granted via Google Secure Hub.' });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Login Error', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || configError) return;
    
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Account Created', description: 'Admin credentials established successfully.' });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Welcome Back', description: 'Synchronizing admin session...' });
      }
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: isSignUp ? 'Registration Failed' : 'Login Failed',
        description: error.message || 'Please check your credentials.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-12 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-[440px]">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 shadow-xl ring-4 ring-white">
            <ShieldCheck className="h-7 w-7 text-indigo-500" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900">
            Benace <span className="text-indigo-500">Admin</span>
          </h1>
          <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Secure Infrastructure Command
          </p>
        </div>

        {configError && (
          <Alert variant="destructive" className="mb-8 border-2 border-red-100 bg-red-50/50 text-red-900">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-[10px] font-black uppercase tracking-widest">System Configuration Required</AlertTitle>
            <AlertDescription className="text-xs font-bold">
              Please initialize your Firebase environment variables.
            </AlertDescription>
          </Alert>
        )}

        <Card className={cn("border-none bg-white shadow-2xl rounded-3xl overflow-hidden transition-all duration-500", configError && "opacity-50 pointer-events-none")}>
          <CardHeader className="space-y-1 pb-8 pt-10 text-center">
            <CardTitle className="text-2xl font-black tracking-tight uppercase text-zinc-900">
              {isSignUp ? 'Establish Credentials' : 'Administrator Login'}
            </CardTitle>
            <CardDescription className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              {isSignUp ? 'Create your secure hub access' : 'Identify yourself to manage inventory'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 px-10 pb-10">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading || configError}
              className="flex w-full h-12 items-center justify-center gap-3 border border-zinc-200 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all hover:bg-zinc-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Fast Access with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-100" />
              </div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300">
                <span className="bg-white px-4">Direct Link</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Registry Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-4 w-4 text-zinc-300" />
                  <Input
                    type="email"
                    placeholder="admin@benacetechhub.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-zinc-100 bg-zinc-50/50 rounded-xl pl-11 font-bold text-xs focus-visible:ring-indigo-500/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Security Phrase</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-zinc-300" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-zinc-100 bg-zinc-50/50 rounded-xl pl-11 font-bold text-xs focus-visible:ring-indigo-500/20"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading || configError}
                className="w-full h-13 bg-zinc-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-zinc-900/10"
              >
                {loading ? 'Processing...' : (
                  isSignUp ? <><UserPlus className="mr-2 h-4 w-4" /> Create Admin Account</> : <><LogIn className="mr-2 h-4 w-4" /> Connect to Hub</>
                )}
              </Button>
            </form>

            <div className="text-center pt-2">
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                {isSignUp ? 'Already have an account? Log In' : 'Need credentials? Create Account'}
              </button>
            </div>
          </CardContent>

          <CardFooter className="bg-zinc-50/50 p-6 flex justify-center border-t border-zinc-100">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 text-center">
                Restricted Terminal Access • Level 1 Auth Required
             </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
