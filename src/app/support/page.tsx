'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Users, TrendingUp, HandHeart, Briefcase, Globe, Landmark, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SupportPage() {
  const router = useRouter();

  const impactPoints = [
    {
      icon: Users,
      label: 'Empower Local Women',
      desc: 'Most gardens in The Gambia are managed by women. Your support provides them with consistent income and financial independence.',
      color: 'bg-blue-50 text-blue-500'
    },
    {
      icon: TrendingUp,
      label: 'Scale Community Farming',
      desc: 'Donations help purchase solar-powered irrigation systems, high-quality seeds, and modern tools to increase garden yields.',
      color: 'bg-green-50 text-green-500'
    },
    {
      icon: Briefcase,
      label: 'Create Delivery Jobs',
      desc: 'We employ local students and community members for deliveries, providing flexible jobs that support education and families.',
      color: 'bg-purple-50 text-purple-500'
    },
    {
      icon: Globe,
      label: 'Sustainable Economy',
      desc: 'By reducing reliance on imported produce, we keep money within The Gambia and build a more resilient local food system.',
      color: 'bg-orange-50 text-orange-500'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <header className="bg-white px-6 pt-6 pb-4 flex items-center gap-4 sticky top-0 z-40 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Our Community Impact</h1>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Support Local Farmers</p>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="px-6 py-8 bg-white mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[40px] overflow-hidden shadow-2xl relative h-64 mb-8"
          >
            <img
              src="https://images.unsplash.com/photo-1590779033100-9f60705a453d?auto=format&fit=crop&q=80&w=800"
              alt="Support Farmers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-white text-2xl font-black leading-tight tracking-tight">Support Our <br />Local Economy</h2>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 px-2">
            <h3 className="text-xl font-black text-gray-800 tracking-tight">How Your Support Works</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Dugama is more than a marketplace. We are a community-driven initiative dedicated to modernizing Gambian agriculture and empowering local producers.
            </p>
          </div>
        </section>

        {/* Impact List */}
        <section className="px-6 flex flex-col gap-4 mb-10">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Impact Matters</h4>
          <div className="flex flex-col gap-4">
            {impactPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-soft flex gap-5"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center", point.color)}>
                  <point.icon size={28} />
                </div>
                <div>
                  <h5 className="font-black text-gray-800 mb-1">{point.label}</h5>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Transparency Report */}
        <section className="px-6 mb-10">
          <div className="bg-primary p-8 rounded-[40px] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Landmark size={24} className="text-white/80" />
                <h4 className="text-lg font-black tracking-tight">Transparency Reporting</h4>
              </div>
              <p className="text-white/80 text-xs leading-relaxed font-medium mb-6">
                100% of your donations are recorded in our donation management system and allocated directly to community garden infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">Modernized</p>
                  <p className="text-xl font-black">12 Gardens</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">Empowered</p>
                  <p className="text-xl font-black">150+ Women</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          </div>
        </section>

        <section className="px-6 mb-8 flex flex-col items-center gap-4 text-center">
          <ShieldCheck className="text-primary" size={32} />
          <h4 className="font-black text-gray-800">Dugama Community Promise</h4>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[280px]">We ensure that every transaction and donation benefits the local ecosystem first.</p>
        </section>
      </main>
    </div>
  );
}
