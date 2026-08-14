'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Thank you! Our ergonomic support team will respond within 2 hours.');
  };

  return (
    <div className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
            Customer Support
          </span>
          <h1 className="text-4xl font-extrabold text-zinc-900">Get In Touch</h1>
          <p className="text-zinc-600 text-sm">
            Need help selecting desk dimensions, frame assembly guidance, or bulk office orders?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="bg-zinc-50 border border-zinc-200 shadow-sm p-6 rounded-2xl space-y-2 text-center">
            <Mail className="w-6 h-6 text-amber-600 mx-auto" />
            <h3 className="font-bold text-sm text-zinc-900">Email Us</h3>
            <p className="text-xs text-zinc-600">support@fittrock.com</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 shadow-sm p-6 rounded-2xl space-y-2 text-center">
            <Phone className="w-6 h-6 text-amber-600 mx-auto" />
            <h3 className="font-bold text-sm text-zinc-900">Call Toll Free</h3>
            <p className="text-xs text-zinc-600">+91 (800) 425-3488</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 shadow-sm p-6 rounded-2xl space-y-2 text-center">
            <MapPin className="w-6 h-6 text-amber-600 mx-auto" />
            <h3 className="font-bold text-sm text-zinc-900">Experience Center</h3>
            <p className="text-xs text-zinc-600">Indiranagar 100ft Rd, Bengaluru</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-zinc-50 border border-zinc-200 shadow-sm rounded-3xl p-8 max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <h3 className="text-xl font-bold text-amber-600">Message Received!</h3>
              <p className="text-xs text-zinc-600">We will reach out to your email address shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Rahul Sharma"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                  Message / Inquiry *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist with your standing desk setup?"
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
