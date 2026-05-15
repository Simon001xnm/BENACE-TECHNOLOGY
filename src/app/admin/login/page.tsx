'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, flaskConical as FlaskIcon } from 'lucide-react';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'Firebase Auth is not initialized. Please check your config.',
      });
      return;
    }

    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Access Granted',
        description: 'Welcome to the Benace Admin Portal.',
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error("Google Login Error:", error);
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'Please check if Google Sign-In is enabled in Firebase Console.',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * TEST MODE: Allows anonymous login for development purposes.
   * Ensure "Anonymous" provider is enabled in Firebase Console for this to work.
   */
  const handleTestModeLogin = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      await signInAnonymously(auth);
      toast({
        title: 'Test Mode Active',
        description: 'Logged in as a temporary guest admin.',
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Test Mode Failed',
        description: 'Please enable Anonymous Auth in Firebase Console to use Test Mode.',
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
          <CardHeader className="bg-zinc-50 border-b-4 border-black text-center">
            <CardTitle className="text-xl font-black uppercase tracking-tight">Admin Gateway</CardTitle>
            <CardDescription className="font-bold text-zinc-500">Sign in to manage inventory and shop services.</CardDescription>
          </CardHeader>
          <CardContent className="pt-10 pb-12 flex flex-col items-center gap-4">
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative flex w-full h-16 items-center justify-center gap-4 bg-white text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-black uppercase tracking-widest">
                {loading ? 'Authorizing...' : 'Continue with Google'}
              </span>
            </Button>

            <div className="flex w-full items-center gap-2 px-4 py-2">
              <div className="h-px flex-1 bg-zinc-200"></div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Or Use Test Mode</span>
              <div className="h-px flex-1 bg-zinc-200"></div>
            </div>

            <Button
              variant="outline"
              onClick={handleTestModeLogin}
              disabled={loading}
              className="flex w-full h-12 items-center justify-center gap-3 border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <FlaskIcon className="h-4 w-4" />
              Bypass to Dashboard
            </Button>
            
            <p className="mt-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center max-w-[250px]">
              Use your official @benace.com account or enable Test Mode for development.
            </p>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          Benace Tech Hub &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
