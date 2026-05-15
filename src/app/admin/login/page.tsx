'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, FlaskConical as FlaskIcon, Mail, Lock, LogIn, AlertCircle, UserPlus, ArrowRight } from 'lucide-react';
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
    if (!auth || configError) {
      toast({
        variant: 'destructive',
        title: 'Configuration Required',
        description: 'Please update src/firebase/config.ts with your actual Firebase API keys.',
      });
      return;
    }

    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      toast({ title: 'Access Granted', description: 'Redirecting to Benace Hub...' });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: error.message });
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
        toast({ title: 'Account Created', description: 'Welcome to the Benace Admin team.' });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Welcome Back', description: 'Authenticated successfully.' });
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

  const handleTestModeLogin = async () => {
    if (!auth || configError) return;
    
    setLoading(true);
    try {
      await signInAnonymously(auth);
      toast({ title: 'Test Mode Active', description: 'Logged in as guest admin.' });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Bypass Failed',
        description: 'Ensure Anonymous Auth is enabled in Firebase Console.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-12 selection:bg-primary selection:text-white">
      <div className="w-full max-w-[440px]">
        {/* Branding */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20 ring-4 ring-white">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">
            Benace <span className="text-primary">Admin</span>
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Internal Operations Portal
          </p>
        </div>

        {/* Config Warning */}
        {configError && (
          <Alert variant="destructive" className="mb-8 border-2 border-red-100 bg-red-50/50 text-red-900 animate-in fade-in slide-in-from-top-4 duration-500">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-[10px] font-black uppercase tracking-widest">Setup Required</AlertTitle>
            <AlertDescription className="text-xs font-bold leading-relaxed">
              Firebase placeholders detected. Update <code className="rounded bg-red-100 px-1 font-mono text-red-700">src/firebase/config.ts</code> with your production keys to enable live services.
            </AlertDescription>
          </Alert>
        )}

        <Card className={cn(
          "border-2 border-zinc-100 bg-white shadow-2xl transition-all duration-500",
          configError && "opacity-80 grayscale-[0.5]"
        )}>
          <CardHeader className="space-y-1 pb-8 pt-8 text-center">
            <CardTitle className="text-2xl font-black tracking-tight">
              {isSignUp ? 'Create Workspace' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {isSignUp ? 'Register for admin privileges' : 'Enter your credentials to manage hub'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Social Login */}
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading || configError}
              className="flex w-full h-12 items-center justify-center gap-3 border-2 border-zinc-100 font-bold transition-all hover:bg-zinc-50 hover:border-zinc-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-100" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
                <span className="bg-white px-2">Or continue with</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-300" />
                  <Input
                    type="email"
                    placeholder="name@benace.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-2 border-zinc-100 bg-zinc-50/30 pl-10 font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-300" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-2 border-zinc-100 bg-zinc-50/30 pl-10 font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading || configError}
                className="w-full h-12 bg-black text-white font-black uppercase tracking-widest shadow-lg shadow-black/10 transition-all hover:bg-primary hover:text-black hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Processing...' : isSignUp ? (
                  <><UserPlus className="mr-2 h-4 w-4" /> Create Account</>
                ) : (
                  <><LogIn className="mr-2 h-4 w-4" /> Secure Login</>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 bg-zinc-50/50 p-8">
            <div className="text-center">
              <p className="text-sm font-bold text-zinc-500">
                {isSignUp ? 'Already have an account?' : "Don't have access yet?"}
              </p>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-1 text-sm font-black text-primary hover:underline"
              >
                {isSignUp ? 'Sign in to existing account' : 'Register a new admin profile'}
              </button>
            </div>

            <div className="h-px w-full bg-zinc-100" />

            <div className="w-full">
              <Button
                variant="ghost"
                onClick={handleTestModeLogin}
                disabled={loading || configError}
                className="flex w-full h-10 items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors"
              >
                <FlaskIcon className="h-3 w-3" />
                Dev Bypass to Dashboard
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
          Benace Tech Hub Hub &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
