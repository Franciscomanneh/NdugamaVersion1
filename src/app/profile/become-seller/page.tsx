'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Flower, Store, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BecomeSellerPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Become a Seller</h1>
      </header>

      <main className="px-6 flex flex-col gap-8">
        <section className="bg-primary/10 p-8 rounded-[40px] text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-800">Grow with Dugama</h2>
          <p className="text-sm text-gray-600">
            Join the largest network of local gardeners and vendors in The Gambia. Reach thousands of customers directly.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h3 className="text-lg font-bold">Choose your role</h3>

          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-3xl border-2 border-gray-100 hover:border-primary/30 transition-colors flex items-center gap-5 group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Truck size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">I am a Gardener</h4>
                <p className="text-[10px] text-gray-500">I have a local garden and want to sell fresh produce.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl border-2 border-gray-100 hover:border-primary/30 transition-colors flex items-center gap-5 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                <Store size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">I am a Vendor</h4>
                <p className="text-[10px] text-gray-500">I want to buy in bulk from gardeners to resell or use in my business.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Registration Form</h3>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20" />
            <input type="tel" placeholder="WhatsApp Number" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20" />
            <input type="text" placeholder="Garden/Business Location" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20" />
            <textarea placeholder="Tell us about your products..." rows={4} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20"></textarea>
          </div>
        </section>

        <button className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all">
          Submit Application
        </button>
      </main>
    </div>
  );
}
