'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';

export default function GardenersPage() {
  const router = useRouter();
  const { sellers, loading } = useAppContext();

  const featured = useMemo(() => sellers.filter(g => g.featuredStatus).slice(0, 10), [sellers]);
  const nonFeatured = useMemo(() => sellers.filter(g => !g.featuredStatus).slice(0, 5), [sellers]);

  if (loading) return null;

  return (
    <div className="bg-white min-h-screen pb-24">
      <header className="px-6 pt-6 flex items-center gap-4 mb-6 sticky top-0 bg-white z-40 pb-2 shadow-sm">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Local Gardeners</h1>
      </header>

      <main className="px-6">
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
            Featured Gardeners
            <span className="text-xs font-normal text-gray-400">{featured.length} verified</span>
          </h2>
          <div className="flex flex-col gap-4">
            {featured.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GardenerCard gardener={g} />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Other Gardeners</h2>
          <div className="flex flex-col gap-4">
            {nonFeatured.map((g) => (
              <GardenerCard key={g.id} gardener={g} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function GardenerCard({ gardener }: { gardener: any }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden flex h-32">
      <Link href={`/gardener/${gardener.id}`} className="w-1/3 relative h-full">
        <img src={gardener.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"} alt={gardener.name} className="w-full h-full object-cover" />
        {gardener.featuredStatus && (
          <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
            Featured
          </div>
        )}
      </Link>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <Link href={`/gardener/${gardener.id}`}>
          <div>
            <h3 className="font-bold text-sm leading-tight mb-1">{gardener.name}</h3>
            <p className="text-xs text-gray-400 mb-1">Verified Gardener</p>
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <MapPin size={10} /> {gardener.location}
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div className="text-[10px] font-bold text-primary">
            Fresh Produce
          </div>
          <a
            href={`https://wa.me/${gardener.whatsappNumber?.replace('+', '').replace(' ', '')}`}
            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
