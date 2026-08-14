import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold border-b border-zinc-200 pb-4 text-zinc-900">Terms of Service</h1>
        <div className="text-zinc-700 text-sm space-y-4 leading-relaxed">
          <p>
            Welcome to Fittrock Ergonomics. By accessing our website or purchasing products, you agree to bound by these terms.
          </p>
          <h3 className="text-lg font-bold text-zinc-900">Warranty Terms</h3>
          <p>
            The 10-Year Frame Warranty covers structural defects under normal home and office usage. Misuse or alterations void warranty coverage.
          </p>
        </div>
      </div>
    </div>
  );
}
