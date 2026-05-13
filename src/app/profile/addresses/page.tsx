'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Plus, Trash2, Home, Briefcase, Navigation } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddressesPage() {
  const router = useRouter();
  const { addresses, isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-[24px] flex items-center justify-center text-gray-400 mb-6">
          <MapPin size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Sign in required</h2>
        <p className="text-sm text-gray-500 mb-8">Please sign in to manage your saved addresses.</p>
        <button onClick={() => router.push('/auth')} className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Sign In</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">My Addresses</h1>
      </header>

      <main className="px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-5 rounded-3xl border border-gray-100 shadow-soft bg-white flex gap-4 items-start relative group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {addr.label === 'Home' ? <Home size={20} /> : addr.label === 'Work' ? <Briefcase size={20} /> : <Navigation size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-gray-800 text-sm tracking-tight">{addr.label}</h3>
                  {addr.isDefault && <span className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Default</span>}
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{addr.address}</p>
              </div>
              <button className="text-gray-300 group-hover:text-red-400 transition-colors p-1">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full py-5 border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center gap-3 text-gray-400 font-bold text-sm hover:border-primary/20 hover:text-primary transition-all active:scale-[0.98]">
          <Plus size={20} /> Add New Address
        </button>
      </main>
    </div>
  );
}
