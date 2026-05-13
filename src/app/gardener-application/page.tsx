'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShieldCheck, Upload, Info, MessageCircle, MapPin, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GardenerApplicationPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    location: '',
    about: '',
    products: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/profile');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-100 text-primary rounded-[32px] flex items-center justify-center mb-8"
        >
          <ShieldCheck size={48} />
        </motion.div>
        <h2 className="text-3xl font-black text-gray-800 mb-4">Application Received!</h2>
        <p className="text-gray-500 mb-2 leading-relaxed">
          Thank you for applying to be a Dugama Gardener.
        </p>
        <p className="text-sm text-gray-400">
          Our admin team will review your application and contact you on WhatsApp within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Become a Gardener</h1>
      </header>

      <main className="px-6 flex flex-col gap-8">
        <section className="bg-primary/10 p-8 rounded-[40px] flex flex-col gap-4">
          <div className="flex items-center gap-3 text-primary">
            <Info size={24} />
            <h2 className="text-xl font-black">Join the Community</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Sell your fresh garden products directly to customers across The Gambia.
          </p>
          <div className="bg-white/50 p-4 rounded-2xl border border-primary/10">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Commission Policy</p>
            <p className="text-xs text-gray-500 font-medium italic">
              Dugama takes a small <span className="text-primary font-bold">5% commission</span> only from completed sales. No registration fees!
            </p>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">Personal Information</h3>
            <div className="relative">
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="tel"
                placeholder="WhatsApp Number"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="text"
                placeholder="Garden Location"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">Garden Details</h3>
            <textarea
              required
              placeholder="Tell us about your garden (Experience, methods, etc.)"
              rows={4}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20"
              value={formData.about}
              onChange={(e) => setFormData({...formData, about: e.target.value})}
            />
            <textarea
              required
              placeholder="Main Products Sold (e.g. Tomatoes, Onions, etc.)"
              rows={2}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/20"
              value={formData.products}
              onChange={(e) => setFormData({...formData, products: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">Verification Photos</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 group hover:border-primary/30 transition-colors cursor-pointer">
                <Upload size={24} />
                <span className="text-[10px] font-bold uppercase">Profile Photo</span>
              </div>
              <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 group hover:border-primary/30 transition-colors cursor-pointer">
                <Upload size={24} />
                <span className="text-[10px] font-bold uppercase">Garden Photo</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-medium italic">Upload 4–5 gallery photos of your products and garden area.</p>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all mt-4"
          >
            Submit Application
          </button>
        </form>
      </main>
    </div>
  );
}
