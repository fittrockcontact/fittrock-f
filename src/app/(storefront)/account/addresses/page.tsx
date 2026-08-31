'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Plus, ArrowLeft, Trash2, Loader2, CheckCircle2, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/firebase/auth-context';
import { apiFetch } from '@/lib/api-client';

interface SavedAddress {
  id: string;
  user_id?: string;
  type?: string;
  full_name?: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  is_default: boolean;
}

export default function AddressesPage() {
  const { user, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: false,
  });

  const loadAddresses = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch<{ addresses: SavedAddress[] }>(
        `/api/customers/addresses?email=${encodeURIComponent(user.email || '')}`
      );
      setAddresses(res?.addresses || []);
    } catch (err) {
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setNewAddr((prev) => ({
        ...prev,
        fullName: user.displayName || '',
        phone: user.phoneNumber || '',
      }));
      loadAddresses();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to save an address.');
      return;
    }
    if (!newAddr.line1 || !newAddr.city || !newAddr.state || !newAddr.postalCode || !newAddr.phone) {
      toast.error('Please fill in all required address fields.');
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch<{ success: boolean; address: SavedAddress; message: string }>(
        '/api/customers/addresses',
        {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            fullName: newAddr.fullName.trim() || user.displayName || 'Customer',
            phone: newAddr.phone.trim(),
            line1: newAddr.line1.trim(),
            line2: newAddr.line2 ? newAddr.line2.trim() : null,
            city: newAddr.city.trim(),
            state: newAddr.state.trim(),
            postalCode: newAddr.postalCode.trim(),
            country: 'India',
            type: 'shipping',
            isDefault: newAddr.isDefault || addresses.length === 0,
          }),
        }
      );

      if (res?.success && res.address) {
        toast.success('Delivery address saved to database!');
        setAddresses((prev) => [res.address, ...prev]);
        setShowAddForm(false);
        setNewAddr({
          fullName: user.displayName || '',
          phone: '',
          line1: '',
          line2: '',
          city: '',
          state: '',
          postalCode: '',
          isDefault: false,
        });
      } else {
        toast.error('Could not save address. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save address';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await apiFetch<{ success: boolean }>(`/api/customers/addresses/${id}`, {
        method: 'DELETE',
      });

      if (res?.success) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        toast.info('Address removed from database');
      } else {
        toast.error('Could not delete address');
      }
    } catch (err) {
      toast.error('Failed to remove address');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="p-2.5 text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-xl border border-zinc-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black flex items-center gap-2 text-zinc-900">
                <MapPin className="w-6 h-6 text-[#a32222]" />
                <span>Saved Delivery Addresses</span>
              </h1>
              <p className="text-xs text-zinc-500">
                Manage your primary shipping locations for fast 1-click checkout.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#a32222] hover:bg-[#851622] text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all self-start sm:self-auto active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Add New Address'}</span>
          </button>
        </div>

        {/* Add Address Form */}
        {showAddForm && (
          <form
            onSubmit={handleAdd}
            className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm animate-in fade-in duration-200"
          >
            <div className="border-b border-zinc-200 pb-3 mb-2">
              <h3 className="font-bold text-sm text-zinc-900">Add New Shipping Address</h3>
              <p className="text-xs text-zinc-500">Address will be stored securely in your Fittrock profile.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trishul Nirmala"
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                  Delivery Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98811 20025"
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                Flat, House no., Building, Company, Apartment *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Office 610, 6th Floor, Park Plaza"
                value={newAddr.line1}
                onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                Area, Street, Sector, Village (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Porwal Road, Lohegaon"
                value={newAddr.line2}
                onChange={(e) => setNewAddr({ ...newAddr, line2: e.target.value })}
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                  Town / City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharashtra"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                  6-Digit PIN Code *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="e.g. 411047"
                  value={newAddr.postalCode}
                  onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700 pt-1 font-medium">
              <input
                type="checkbox"
                checked={newAddr.isDefault}
                onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
                className="w-4 h-4 rounded text-[#a32222] focus:ring-[#a32222] border-zinc-300"
              />
              <span>Set as default shipping address</span>
            </label>

            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 text-xs text-zinc-600 hover:text-zinc-900 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-[#a32222] hover:bg-[#851622] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm active:scale-98 transition-all"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <span>Save Address</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Addresses Grid */}
        {loading ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-12 text-center">
            <Loader2 className="w-6 h-6 text-[#a32222] animate-spin mx-auto mb-2" />
            <p className="text-xs text-zinc-500">Loading saved addresses from database...</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-10 sm:p-12 text-center space-y-3">
            <Home className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-800">No Saved Addresses Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Add your home or office address for fast delivery of Fittrock standing desks and ergonomics accessories.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 bg-[#a32222] hover:bg-[#851622] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Address</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-3 relative shadow-sm hover:border-zinc-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  {addr.is_default ? (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Default Delivery Address</span>
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                      {addr.type || 'Shipping'} Address
                    </span>
                  )}

                  <button
                    onClick={() => handleDelete(addr.id)}
                    disabled={deletingId === addr.id}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Remove address"
                  >
                    {deletingId === addr.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  {addr.full_name && (
                    <h4 className="text-sm font-bold text-zinc-950">{addr.full_name}</h4>
                  )}
                  <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                    {addr.line1}
                    {addr.line2 ? `, ${addr.line2}` : ''}
                  </p>
                  <p className="text-xs text-zinc-600">
                    {addr.city}, {addr.state} — <span className="font-mono font-bold">{addr.postal_code}</span>
                  </p>
                  <p className="text-xs text-zinc-500 pt-1">
                    Phone: <span className="text-zinc-800 font-semibold">{addr.phone}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
