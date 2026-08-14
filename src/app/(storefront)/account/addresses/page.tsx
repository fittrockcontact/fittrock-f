'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      line1: 'Flat 402, Highrise Heights, M.G. Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43210',
      isDefault: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    line1: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([
      ...addresses,
      { ...newAddr, id: `addr-${Date.now()}`, isDefault: addresses.length === 0 },
    ]);
    setShowAddForm(false);
    setNewAddr({ line1: '', city: '', state: '', pincode: '', phone: '' });
    toast.success('Address saved!');
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.info('Address removed');
  };

  return (
    <div className="py-12 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
          <div className="flex items-center gap-3">
            <Link href="/account" className="p-2 text-zinc-600 hover:text-zinc-900 bg-zinc-100 rounded-xl border border-zinc-200">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-extrabold flex items-center gap-2 text-zinc-900">
              <MapPin className="w-6 h-6 text-amber-600" />
              <span>Saved Delivery Addresses</span>
            </h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAdd} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-zinc-900">Add New Shipping Address</h3>
            <input
              type="text"
              placeholder="Flat / Building / Street"
              required
              value={newAddr.line1}
              onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
              className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="City"
                required
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="State"
                required
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Pincode"
                required
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={newAddr.phone}
              onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
              className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs text-zinc-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-amber-500 text-zinc-950 font-bold px-6 py-2 rounded-xl text-xs"
              >
                Save Address
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-3 relative shadow-sm">
              {addr.isDefault && (
                <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  Default Address
                </span>
              )}
              <p className="text-sm font-semibold text-zinc-900">{addr.line1}</p>
              <p className="text-xs text-zinc-600">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-xs text-zinc-500">Phone: {addr.phone}</p>
              <button
                onClick={() => handleDelete(addr.id)}
                className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-red-600"
                title="Remove address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
