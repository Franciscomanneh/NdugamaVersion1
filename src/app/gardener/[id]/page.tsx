'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, MessageCircle, ShoppingBag, Info, Phone } from 'lucide-react';
import { gardeners } from '@/data/mock';
import { motion } from 'framer-motion';

export default function GardenerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const gardener = gardeners.find(g => g.id === id);

  if (!gardener) return <div>Gardener not found</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative h-72 w-full">
        <img src={gardener.image} alt={gardener.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-2xl font-bold mb-1">{gardener.garden}</h1>
          <p className="text-white/80 flex items-center gap-1 text-sm">
            <MapPin size={14} /> {gardener.location}
          </p>
        </div>
      </div>

      <main className="px-6 -mt-4 relative z-10 bg-white rounded-t-[32px] pt-8 flex flex-col gap-8">
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
              <img src={gardener.image} alt={gardener.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-bold">{gardener.name}</h2>
              <p className="text-xs text-gray-500">Verified Gardener</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:${gardener.whatsapp}`}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
            >
              <Phone size={18} />
            </a>
            <a
              href={`https://wa.me/${gardener.whatsapp.replace('+', '')}`}
              className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <Info size={18} />
            <h3 className="font-bold">About the Garden</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {gardener.about}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <ShoppingBag size={18} />
            <h3 className="font-bold">Bulk Products Available</h3>
          </div>
          <div className="flex flex-col gap-3">
            {gardener.bulkProducts.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-sm">{p.name}</h4>
                  <p className="text-[10px] text-gray-400">Sold by {p.unit}</p>
                </div>
                <div className="text-primary font-bold">
                  D{p.price}
                </div>
              </div>
            ))}
          </div>
        </section>

        <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-4">
          Contact for Bulk Order <MessageCircle size={20} />
        </button>
      </main>
    </div>
  );
}
