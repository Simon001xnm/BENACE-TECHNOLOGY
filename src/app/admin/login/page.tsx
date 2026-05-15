'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, FlaskConical as FlaskIcon, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [configError, setConfigError] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Detect if Firebase is using placeholder values from src/firebase/config.ts
    if (auth?.app.options.apiKey?.includes('placeholder')) {
      setConfigError(true);
    }
  }, [auth]);

  const handleGoogleLogin = async () => {
    if (!auth || configError) {
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'You are using placeholder credentials. Please update src/firebase/config.ts with your actual project keys.',
      });
      return;
    }

    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      toast({ title: 'Access Granted', description: 'Welcome to the Benace Admin Hub.' });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Authentication Failed', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || configError) return;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Access Granted', description: 'Redirecting to dashboard...' });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials or user not found. Ensure Email/Password is enabled in Firebase.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestModeLogin = async () => {
    if (!auth || configError) {
      toast({
        variant: 'destructive',
        title: 'Config Error',
        description: 'Update src/firebase/config.ts to enable test mode connectivity.',
      });
      return;
    }
    
    setLoading(true);
    try {
      await signInAnonymously(auth);
      toast({ title: 'Test Mode Active', description: 'Logged in as guest admin.' });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Test Mode Failed',
        description: 'Enable Anonymous Auth in your Firebase Console (Authentication > Sign-in method).',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-black">Benace Admin</h1>
          <p className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Authorized Access Only</p>
        </div>

        {configError && (
          <Alert variant="destructive" className="mb-6 border-2 border-red-600 bg-red-50 text-red-900">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-black uppercase text-xs">Action Required</AlertTitle>
            <AlertDescription className="text-xs font-bold">
              Your Firebase API key is currently a placeholder. Update <code className="bg-red-100 px-1 font-mono">src/firebase/config.ts</code> with your project credentials to enable authentication.
            </AlertDescription>
          </Alert>
        )}

        <Card className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
          <CardHeader className="bg-zinc-50 border-b-4 border-black text-center">
            <CardTitle className="text-xl font-black uppercase tracking-tight">Admin Gateway</CardTitle>
            <CardDescription className="font-bold text-zinc-500 text-xs">Manage inventory and hub services.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-10">
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 border-2 border-black bg-zinc-100 p-1 mb-8">
                <TabsTrigger value="email" className="font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-black data-[state=active]:text-white">Email</TabsTrigger>
                <TabsTrigger value="google" className="font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-black data-[state=active]:text-white">Google</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-6">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                      <Input
                        type="email"
                        placeholder="admin@benace.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 border-2 border-black pl-10 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 border-2 border-black pl-10 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || configError}
                    className="w-full h-12 bg-black text-white font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,186,242,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {loading ? 'Verifying...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="google" className="space-y-4">
                <Button
                  onClick={handleGoogleLogin}
                  disabled={loading || configError}
                  className="group relative flex w-full h-16 items-center justify-center gap-4 bg-white text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-black uppercase tracking-widest">
                    {loading ? 'Connecting...' : 'Continue with Google'}
                  </span>
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-10 flex w-full items-center gap-2 px-4 py-2">
              <div className="h-px flex-1 bg-zinc-200"></div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Dev Access</span>
              <div className="h-px flex-1 bg-zinc-200"></div>
            </div>

            <Button
              variant="outline"
              onClick={handleTestModeLogin}
              disabled={loading || configError}
              className="mt-4 flex w-full h-12 items-center justify-center gap-3 border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
            >
              <FlaskIcon className="h-4 w-4" />
              Bypass to Dashboard
            </Button>
            
            <p className="mt-8 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center max-w-[250px] mx-auto leading-tight">
              Test mode requires Anonymous Auth enabled in your Firebase Console.
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