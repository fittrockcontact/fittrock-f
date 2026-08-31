'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  LogOut,
  ShieldCheck,
  Mail,
  Lock,
  KeyRound,
  Loader2,
  Phone,
  Building2,
  FileText,
  Save,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';
import { useAuth } from '@/lib/firebase/auth-context';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api-client';

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

  // Customer Profile & Orders State from Database
  const [profile, setProfile] = useState<any>(null);
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Editable Profile Form
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    isBusiness: false,
    businessName: '',
    gstNumber: '',
  });

  // Load real profile and orders from database
  useEffect(() => {
    async function loadCustomerData() {
      if (!user) return;
      setLoadingData(true);
      try {
        // Sync & fetch customer profile
        const syncRes = await apiFetch<{ success: boolean; profile: any }>('/api/customers/sync', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            fullName: user.displayName || user.email?.split('@')[0],
            avatarUrl: user.photoURL,
            phone: user.phoneNumber,
          }),
        });

        const customerProfile = syncRes?.profile;
        if (customerProfile) {
          setProfile(customerProfile);
          setProfileForm({
            fullName: customerProfile.full_name || user.displayName || '',
            phone: customerProfile.phone || '',
            isBusiness: !!customerProfile.is_business,
            businessName: customerProfile.business_name || '',
            gstNumber: customerProfile.gst_number || '',
          });

          // Fetch customer's real orders
          const ordersRes = await apiFetch<{ orders: any[] }>(
            `/api/customers/orders?userId=${customerProfile.id}&phone=${customerProfile.phone || ''}`
          );
          setOrdersList(ordersRes?.orders || []);
        }
      } catch (err) {
        console.error('Error fetching customer database data:', err);
      } finally {
        setLoadingData(false);
      }
    }

    loadCustomerData();
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
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
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
      setProfile(null);
      setOrdersList([]);
      toast.info('Signed out');
    } catch (err: any) {
      toast.error('Failed to sign out');
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;
    setSavingProfile(true);

    try {
      const res = await apiFetch<{ success: boolean; profile: any }>('/api/customers/profile', {
        method: 'PUT',
        body: JSON.stringify({
          id: profile.id,
          fullName: profileForm.fullName.trim(),
          phone: profileForm.phone.trim(),
          isBusiness: profileForm.isBusiness,
          businessName: profileForm.businessName.trim(),
          gstNumber: profileForm.gstNumber.trim().toUpperCase(),
        }),
      });

      if (res?.success) {
        setProfile(res.profile);
        toast.success('Profile and tax details updated in database!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (err) {
      toast.error('Error saving profile changes');
    } finally {
      setSavingProfile(false);
    }
  };

  if (authLoading) {
    return (
      <div className="py-24 text-center bg-white text-zinc-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#a32222] animate-spin" />
          <p className="text-sm font-medium text-zinc-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-16 sm:py-24 bg-white text-zinc-900 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full mx-auto bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#a32222]/10 text-[#a32222] border border-[#a32222]/20 flex items-center justify-center mx-auto">
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
                : 'Access your orders, active deliveries, and customer profile.'}
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
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
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
                  placeholder="customer@company.com"
                  className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
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
                      className="text-xs text-[#a32222] hover:underline font-semibold"
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
                    className="w-full bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#a32222] hover:bg-[#851622] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2 active:scale-98"
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
                  className="text-[#a32222] font-bold underline"
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
                  className="text-[#a32222] font-bold underline"
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
                  className="text-[#a32222] font-bold underline"
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
    <div className="py-12 sm:py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Account Header */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#a32222]/10 border border-[#a32222]/30 text-[#a32222] flex items-center justify-center font-black text-2xl overflow-hidden">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
              ) : (
                (profileForm.fullName?.charAt(0) || user.displayName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900">
                {profileForm.fullName || user.displayName || user.email}
              </h1>
              <p className="text-xs text-zinc-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Fittrock Verified Member</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account/addresses"
              className="bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-[#a32222]" />
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

        {/* Two Columns: Customer Profile & Order History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Editable Customer Profile & GST */}
          <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                <User className="w-4 h-4 text-[#a32222]" />
                <span>Customer Profile Details</span>
              </h2>
              <p className="text-xs text-zinc-500">
                Update your contact info and B2B GST details for tax-deductible invoicing.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#a32222] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                  Contact Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#a32222] focus:outline-none"
                  />
                </div>
              </div>

              {/* B2B GST Switch */}
              <div className="pt-2 border-t border-zinc-200 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-800">
                  <input
                    type="checkbox"
                    checked={profileForm.isBusiness}
                    onChange={(e) => setProfileForm({ ...profileForm, isBusiness: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a32222] focus:ring-[#a32222] border-zinc-300"
                  />
                  <span>I am purchasing for a Registered Business / Company</span>
                </label>

                {profileForm.isBusiness && (
                  <div className="space-y-3 p-3.5 bg-white border border-zinc-200 rounded-xl animate-in fade-in duration-200">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                        Company / Business Name
                      </label>
                      <div className="relative">
                        <Building2 className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={profileForm.businessName}
                          onChange={(e) => setProfileForm({ ...profileForm, businessName: e.target.value })}
                          placeholder="e.g. Acme Tech Solutions Pvt Ltd"
                          className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-900 focus:border-[#a32222] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                        15-Digit GSTIN
                      </label>
                      <div className="relative">
                        <FileText className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          maxLength={15}
                          value={profileForm.gstNumber}
                          onChange={(e) => setProfileForm({ ...profileForm, gstNumber: e.target.value })}
                          placeholder="e.g. 27AAAAA0000A1Z5"
                          className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-900 uppercase focus:border-[#a32222] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full bg-zinc-900 hover:bg-black disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
              >
                {savingProfile ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile &amp; GST</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order History from Supabase Database */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900">
                <Package className="w-5 h-5 text-[#a32222]" />
                <span>Your Order History</span>
              </h2>
              {ordersList.length > 0 && (
                <span className="text-xs text-zinc-500 font-medium">
                  {ordersList.length} {ordersList.length === 1 ? 'Order' : 'Orders'}
                </span>
              )}
            </div>

            {loadingData ? (
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-12 text-center">
                <Loader2 className="w-6 h-6 text-[#a32222] animate-spin mx-auto mb-2" />
                <p className="text-xs text-zinc-500">Loading order records from database...</p>
              </div>
            ) : ordersList.length === 0 ? (
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-10 sm:p-12 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-zinc-400 mx-auto" />
                <h3 className="text-sm font-bold text-zinc-800">No Orders Yet</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  When you place an order on Fittrock, your tracking ID, GST invoice, and warranty status will appear here.
                </p>
                <div className="pt-2">
                  <Link
                    href="/collections/standing-desks"
                    className="inline-flex items-center gap-2 bg-[#a32222] hover:bg-[#851622] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
                  >
                    Explore Standing Desks
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {ordersList.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-xs sm:text-sm text-zinc-900">
                          {ord.order_number || `#${ord.id?.slice(0, 8)}`}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            ord.status === 'completed' || ord.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : ord.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {ord.status || 'Processing'}
                        </span>
                      </div>

                      {/* Items */}
                      {ord.items && ord.items.length > 0 ? (
                        <div className="space-y-0.5">
                          {ord.items.map((item: any) => (
                            <p key={item.id} className="text-xs text-zinc-700 font-medium">
                              {item.product_title} {item.variant_title ? `(${item.variant_title})` : ''} × {item.quantity}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-zinc-600">Fittrock Ergonomics Order</p>
                      )}

                      <p className="text-[11px] text-zinc-400">
                        Placed on {ord.placed_at ? new Date(ord.placed_at).toLocaleDateString('en-IN') : 'Recent'}
                      </p>
                    </div>

                    <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-200">
                      <div className="text-base sm:text-lg font-black text-zinc-950">
                        {formatPrice(ord.total_amount || 0)}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium flex items-center sm:justify-end gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Free Express Shipping Included</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
