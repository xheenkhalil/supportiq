'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 1. Handle Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // 2. Handle Email Logic
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null); // Clear previous messages

    try {
      if (isSignUp) {
        // --- SIGN UP ---
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;

        // Check if auto-confirmed (Dev mode) or Email Sent (Prod mode)
        if (data.user && !data.session) {
          setSuccessMessage(`Account created successfully! We sent a confirmation link to ${email}.`);
          setIsSignUp(false); // Redirect to Sign In view
          setEmail(''); // Clear sensitive fields
          setPassword('');
        } else if (data.session) {
          toast.success('Account created! Logging in...');
          router.push('/dashboard');
        }

      } else {
        // --- LOGIN ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        toast.success('Welcome back!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-zinc-200">
        <CardHeader className="text-center space-y-1">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
            <Logo className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Enter your email below to create your account' 
              : 'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          
          {/* Success Message Alert */}
          {successMessage && (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <CheckCircle2 className="h-4 w-4" color="#166534" />
              <AlertTitle className="text-green-800 font-semibold">Check your email</AlertTitle>
              <AlertDescription className="text-green-700">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <Link href="/forgot-password" className="text-xs text-indigo-600 hover:underline">Forgot password?</Link>
                )}
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="bg-white"
              />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? 'Sign Up with Email' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-50 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          {/* Google Button (Fixed Style) */}
          <Button 
            onClick={handleGoogleLogin} 
            variant="outline" 
            className="w-full bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50 font-medium h-11" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              // Multi-colored Google "G" Logo
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Sign in with Google
          </Button>
        </CardContent>

        <CardFooter>
          <div className="text-sm text-zinc-500 text-center w-full">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setSuccessMessage(null); // Clear success message when toggling
              }} 
              className="text-indigo-600 hover:underline font-semibold focus:outline-none"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}