'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, Users, TrendingUp, HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportPage() {
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
        <h1 className="text-xl font-bold">Support Local Farmers</h1>
      </header>

      <main className="px-6 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1590779033100-9f60705a453d?auto=format&fit=crop&q=80&w=800"
            alt="Support Farmers"
            className="w-full h-56 object-cover"
          />
        </motion.div>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Why Support Local?</h2>
          <p className="text-gray-600 leading-relaxed">
            In The Gambia, gardens are the backbone of our communities, primarily managed by hardworking women. By buying through Dugama, you are directly empowering these gardeners and their families.
          </p>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Users size={20} />
            </div>
            <h3 className="font-bold text-sm">Community Empowerment</h3>
            <p className="text-[10px] text-gray-500">Strengthening local bonds and supporting village economies.</p>
          </div>
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-sm">Economic Growth</h3>
            <p className="text-[10px] text-gray-500">Helping small-scale farmers scale their production.</p>
          </div>
        </div>

        <section className="bg-gray-50 p-6 rounded-3xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <HandHeart className="text-primary" size={24} />
            <h2 className="text-lg font-bold">Donate to Garden Projects</h2>
          </div>
          <p className="text-sm text-gray-600">
            Contributions go towards better irrigation systems, seeds, and tools for our community gardens.
          </p>
          <div className="flex gap-2">
            {[100, 500, 1000].map((amount) => (
              <button
                key={amount}
                className="flex-1 py-2 rounded-xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors"
              >
                D{amount}
              </button>
            ))}
          </div>
          <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
            Donate Now
          </button>
        </section>

        <section className="flex flex-col gap-4 mb-8">
          <h2 className="text-lg font-bold">Our Impact</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Farmers Supported', value: '150+' },
              { label: 'Gardens Modernized', value: '12' },
              { label: 'Communities Impacted', value: '25' },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-soft">
                <span className="text-gray-500 font-medium">{stat.label}</span>
                <span className="text-primary font-bold text-lg">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
