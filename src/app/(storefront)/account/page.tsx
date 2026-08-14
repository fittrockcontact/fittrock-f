'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, LogOut, ShieldCheck, Mail, Lock, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/firebase/auth-context';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function AccountPage() {
  const {
    user,
    loading: authLoading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
    resetPassword,
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [submitting, setSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Sample order history
  const [ordersList, setOrdersList] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      // Mock orders view for demonstration
      setOrdersList([
        {
          id: 'ord-8f921a4e',
          createdAt: new Date().toLocaleDateString('en-IN'),
          status: 'paid',
          total: '34999.00',
          itemsCount: 1,
          itemName: 'Fittrock Pro Dual-Motor Standing Desk (Natural Oak)',
        },
      ]);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, displayName || undefined);
        toast.success('Account created successfully! Welcome to Fittrock.');
      } else if (mode === 'signin') {
        await signInWithEmail(email, password);
        toast.success('Signed in successfully!');
      } else if (mode === 'forgot') {
        await resetPassword(email);
        toast.success('Password reset link sent to your email.');
        setMode('signin');
      }
    } catch (err: any) {
      console.error('Auth action failed:', err);
      let errMsg = err.message || 'Authentication failed. Please try again.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        errMsg = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = 'An account already exists with this email address.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'Please enter a valid email address.';
      }
      setAuthError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast.info('Signed out');
    } catch (err: any) {
      toast.error('Failed to sign out');
    }
  };

  if (authLoading) {
    return (
      <div className="py-24 text-center bg-white text-zinc-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-sm font-medium text-zinc-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 bg-white text-zinc-900 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full mx-auto bg-zinc-50 border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mx-auto">
              {mode === 'forgot' ? <KeyRound className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
              {mode === 'signup' && 'Create Customer Account'}
              {mode === 'signin' && 'Sign In to Fittrock'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h1>
            <p className="text-xs text-zinc-600">
              {mode === 'forgot'
                ? 'Enter your registered email to receive a password reset link.'
                : 'Access your orders, active deliveries, and account profile.'}
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold">
              {authError}
            </div>
          )}

          {/* Social Sign In (Google) */}
          {mode !== 'forgot' && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 font-bold py-3 rounded-xl text-sm transition-colors shadow-sm disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-zinc-200 w-full" />
                <span className="bg-zinc-50 px-3 text-[11px] font-bold tracking-wider uppercase text-zinc-400">
                  Or with email
                </span>
                <div className="border-t border-zinc-200 w-full" />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>
                {mode === 'signup' && 'Create Account'}
                {mode === 'signin' && 'Sign In'}
                {mode === 'forgot' && 'Send Reset Link'}
              </span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-zinc-200 text-xs text-zinc-600">
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-amber-600 font-bold underline"
                >
                  Sign In
                </button>
              </p>
            )}
            {mode === 'signin' && (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-amber-600 font-bold underline"
                >
                  Create One
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p>
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-amber-600 font-bold underline"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Account Header */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 flex items-center justify-center font-black text-2xl overflow-hidden">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
              ) : (
                (user.displayName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-2xl font-black text-zinc-900">{user.displayName || user.email}</h1>
              {user.displayName && <p className="text-xs text-zinc-500">{user.email}</p>}
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Fittrock Verified Member</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/account/addresses"
              className="bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Saved Addresses</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-white border border-zinc-200 hover:bg-red-50 hover:text-red-700 text-zinc-600 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900">
            <Package className="w-5 h-5 text-amber-600" />
            <span>Order History</span>
          </h2>

          {ordersList.length === 0 ? (
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 text-sm">
              You have no past orders yet.
            </div>
          ) : (
            <div className="space-y-4">
              {ordersList.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-zinc-900">#{ord.id}</span>
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600">{ord.itemName}</p>
                    <p className="text-xs text-zinc-400">Ordered on {ord.createdAt}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-amber-700">{formatPrice(ord.total)}</div>
                    <div className="text-xs text-zinc-500">Includes Free Express Shipping</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
