'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Play, Info, HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HelpSupportPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'How do I place an order?', a: 'Browse the market, add items to your cart, and proceed to checkout. You can choose to pay with Cash, Wave, or AfriMoney at delivery.' },
    { q: 'Is delivery available in my area?', a: 'Currently, we deliver in Banjul, Serrekunda, Brikama, and Bakau. We are expanding to other regions soon!' },
    { q: 'How can I become a seller?', a: 'Go to your profile and click "Become a Seller" to submit an application. Our team will review it and contact you.' },
    { q: 'What are Recipe Bundles?', a: 'Recipe Bundles contain all the fresh ingredients needed to cook a specific local meal (like Domoda or Benachin), pre-portioned for your convenience.' }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Help & Support</h1>
      </header>

      <main className="px-6 flex flex-col gap-10">
        {/* Onboarding Video Placeholder */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Intro Tutorial</h2>
          <div className="relative aspect-video bg-gray-900 rounded-[32px] overflow-hidden group cursor-pointer shadow-xl shadow-gray-200">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
              alt="How it works"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                <Play size={32} fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-black text-lg tracking-tight">How Dugama Works</p>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">2 min video tour</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">The Process</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Browse', desc: 'Find fresh garden products.' },
              { title: 'Order', desc: 'Place your order in seconds.' },
              { title: 'Source', desc: 'We source from local gardens.' },
              { title: 'Deliver', desc: 'Delivered to your doorstep.' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center text-[10px] font-black mb-2">{i+1}</div>
                <h4 className="font-bold text-sm text-gray-800">{item.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Common Questions</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-soft">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 flex items-center justify-between text-left active:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-sm text-gray-700 pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-xl">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="flex flex-col gap-4 mb-8">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Support</h2>
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/2207000000" className="flex items-center gap-4 p-5 bg-green-50 rounded-[24px] border border-green-100 shadow-sm active:scale-[0.98] transition-all">
              <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <MessageCircle size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-gray-800 text-sm">WhatsApp Support</h4>
                <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest">Instant Chat</p>
              </div>
            </a>
            <a href="tel:+2207000000" className="flex items-center gap-4 p-5 bg-blue-50 rounded-[24px] border border-blue-100 shadow-sm active:scale-[0.98] transition-all">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-gray-800 text-sm">Call Center</h4>
                <p className="text-[10px] text-blue-700 font-bold uppercase tracking-widest">+220 700 0000</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-[24px] border border-gray-100">
              <div className="w-12 h-12 bg-gray-400 text-white rounded-2xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-gray-800 text-sm">Email Us</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">support@dugama.gm</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
