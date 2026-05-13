'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Store, Users, ShoppingBag, Bell, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function VendorInfoPage() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">For Vendors</h1>
      </header>

      <main className="px-6 flex flex-col gap-10">
        <section className="bg-orange-500 p-8 rounded-[40px] text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-4">Bulk Sourcing Made Easy</h2>
            <p className="text-sm font-medium text-orange-50/80 leading-relaxed mb-6">
              Connect directly with gardeners across The Gambia. Source fresh products in bulk for your restaurant, shop, or stall.
            </p>
            <button
              onClick={() => router.push('/gardeners')}
              className="px-8 py-4 bg-white text-orange-500 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2"
            >
              Browse Gardeners <ArrowRight size={16} />
            </button>
          </div>
          <Store className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
        </section>

        <section className="flex flex-col gap-6">
          <h3 className="text-lg font-black text-gray-800 tracking-tight">How it works for Vendors</h3>
          <div className="flex flex-col gap-4">
            {[
              { icon: Users, title: 'Browse Gardeners', desc: 'Find verified local gardeners in your area.' },
              { icon: ShoppingBag, title: 'Buy in Bulk', desc: 'Access exclusive bulk prices for large orders.' },
              { icon: Bell, title: 'Get Updates', desc: 'Receive notifications when new products are harvested.' }
            ].map((step, i) => (
              <div key={i} className="flex gap-5 p-5 rounded-3xl bg-gray-50 border border-gray-100 items-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm border border-gray-100">
                  <step.icon size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">{step.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Bell className="text-orange-500" size={20} />
              <h4 className="font-black text-gray-800 tracking-tight">Vendor Notifications</h4>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={cn(
                "w-12 h-6 rounded-full transition-all flex items-center px-1",
                notificationsEnabled ? "bg-primary" : "bg-gray-300"
              )}
            >
              <div className={cn(
                "w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                notificationsEnabled ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
          </div>
          <p className="text-[10px] text-gray-500 font-medium">Get notified via WhatsApp when new gardeners or bulk products are added in your location.</p>
        </section>

        <div className="flex items-center gap-3 px-2 py-4 bg-green-50 rounded-2xl border border-green-100">
          <ShieldCheck className="text-primary" size={20} />
          <p className="text-[10px] font-bold text-green-700">All gardeners are verified by Dugama Quality Team.</p>
        </div>
      </main>
    </div>
  );
}
