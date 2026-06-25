'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, Plus, MapPin, Heart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { DonationModal } from '@/components/DonationModal';

// ⚡ Bolt: Hoisting constants to prevent recreation on every render
const LOCATIONS = ['Banjul', 'Serrekunda', 'Brikama', 'Bakau'];
const CATEGORIES = [
  { id: '1', name: 'Vegetables', icon: '🥕' },
  { id: '2', name: 'Fruits', icon: '🍎' },
  { id: '3', name: 'Fish', icon: '🐟' },
  { id: '4', name: 'Spices', icon: '🌶️' },
  { id: '5', name: 'Bread', icon: '🥖' },
];

export default function HomePage() {
  const { location, setLocation, addToCart, favorites, toggleFavorite, products, bundles, sellers } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  // ⚡ Bolt: Memoizing filtered lists to avoid expensive computations on every render
  const filteredBundles = useMemo(() =>
    bundles.filter(b =>
      b.bundleName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [bundles, searchQuery]
  );

  const filteredProducts = useMemo(() =>
    products.filter(p =>
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [products, searchQuery]
  );

  const featuredSellers = useMemo(() =>
    sellers.filter(s => s.featuredStatus),
    [sellers]
  );

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <header className="px-4 pt-6 flex items-center gap-2 sticky top-0 bg-white/90 backdrop-blur-md z-40 pb-2 border-b border-gray-50">
        {/* LEFT */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">D</div>
          <h1 className="text-xs font-black text-gray-800 hidden min-[360px]:block">Dugama</h1>
        </div>

        {/* CENTER */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-xl py-2 pl-8 pr-3 text-[10px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-0.5 bg-gray-100 px-2 py-1.5 rounded-xl flex-shrink-0 max-w-[100px]">
          <MapPin size={10} className="text-primary" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent text-[9px] font-black focus:outline-none appearance-none pr-3 cursor-pointer truncate uppercase tracking-tight"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%228%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }}
          >
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[200px] w-full rounded-3xl overflow-hidden bg-gray-900 group shadow-lg"
        >
          {/* ⚡ Bolt: Using Next.js Image with priority for better LCP */}
          <Image
            src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800"
            alt="Gambian Market"
            fill
            priority
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h2 className="text-white text-2xl font-bold leading-tight">
              Fresh Market Shopping <br />Made Easy in The Gambia
            </h2>
            <p className="text-white/80 text-sm mt-2 mb-4">
              Get fresh products from local gardens delivered to your door.
            </p>
            <div className="flex gap-3">
              <Link href="/market" className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold shadow-md active:scale-95 transition-transform">
                Shop Market
              </Link>
              <Link href="/market?tab=bundles" className="px-5 py-2.5 bg-white text-primary rounded-full text-sm font-semibold shadow-md active:scale-95 transition-transform">
                Bundles
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      {!searchQuery && (
        <section>
          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="text-lg font-bold">Categories</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto px-6 hide-scrollbar pb-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/market?category=${cat.name}`}
                className="flex flex-col items-center gap-2 min-w-[70px] active:scale-90 transition-transform"
              >
                <div className="w-16 h-16 rounded-2xl bg-beige flex items-center justify-center text-2xl shadow-soft">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-gray-600">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Gardeners */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Featured Gardeners</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {featuredSellers.slice(0, 4).map((s) => (
            <Link
              href={`/gardener/${s.id}`}
              key={s.id}
              className="p-3 rounded-2xl bg-white border border-gray-100 shadow-soft active:scale-[0.98] transition-transform"
            >
              <img src={s.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"} alt={s.name} className="w-full h-24 object-cover rounded-xl mb-3" />
              <h4 className="font-bold text-sm truncate">{s.name}</h4>
              <p className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
                <MapPin size={10} /> {s.location}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400">Top Seller</p>
                  <p className="text-[11px] font-bold text-primary">{s.location}</p>
                </div>
                <div className="text-[10px] font-bold bg-green-50 text-primary px-1.5 py-0.5 rounded">
                  TOP
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/gardeners"
          className="w-full py-3 border-2 border-primary/20 text-primary font-bold rounded-2xl flex items-center justify-center gap-2 active:bg-primary/5 transition-colors"
        >
          View All Gardeners <ChevronRight size={18} />
        </Link>
      </section>

      {/* Recipe Bundles */}
      {(filteredBundles.length > 0) && (
      <section>
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="text-lg font-bold text-accent">Dugama Recipe Bundles</h3>
          <Link href="/market?tab=bundles" className="text-accent text-sm font-semibold flex items-center">
            See More <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 hide-scrollbar pb-4">
          {filteredBundles.map((bundle) => (
            <div key={bundle.id} className="min-w-[280px] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-soft relative group">
              <Link href={`/bundle/${bundle.id}`}>
                <img src={bundle.bundleImage} alt={bundle.bundleName} className="w-full h-40 object-cover" />
              </Link>
              <div className="p-4">
                <Link href={`/bundle/${bundle.id}`}>
                  <h4 className="font-bold text-lg mb-1">{bundle.bundleName}</h4>
                </Link>
                <div className="flex flex-wrap gap-1 mb-3">
                  {bundle.ingredients.slice(0, 3).map((ing: any, i: number) => (
                    <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {ing.name}
                    </span>
                  ))}
                  {bundle.ingredients.length > 3 && <span className="text-[10px] text-gray-400">+{bundle.ingredients.length - 3} more</span>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-xl">D{bundle.totalPrice}</span>
                  <button
                    onClick={() => addToCart(bundle, 'bundle')}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Market Preview */}
      {(filteredProducts.length > 0) && (
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">{searchQuery ? 'Search Results' : 'Market Fresh'}</h3>
          {!searchQuery && <Link href="/market" className="text-primary text-sm font-semibold">View All</Link>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(searchQuery ? filteredProducts : filteredProducts.slice(0, 4)).map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft group">
              <div className="relative h-32 w-full overflow-hidden">
                <Link href={`/product/${p.id}`}>
                  <img src={p.imageUrl} alt={p.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </Link>
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 shadow-sm z-10"
                >
                  <Heart size={16} className={favorites.includes(p.id) ? "fill-red-500 text-red-500" : ""} />
                </button>
                <button
                  onClick={() => addToCart(p, 'product')}
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-10 active:scale-90 transition-transform"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="p-3">
                <Link href={`/product/${p.id}`}>
                  <h4 className="text-sm font-bold truncate">{p.productName}</h4>
                  <p className="text-lg font-bold text-primary">D{p.price}<span className="text-xs text-gray-400 font-normal"> / {p.unit}</span></p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* For Everyone Section */}
      <section className="px-6 grid grid-cols-3 gap-3">
        <Link href="/market" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-50 border border-green-100 active:bg-green-100 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Plus size={16} />
          </div>
          <span className="text-[11px] font-bold text-primary text-center">For Buyers</span>
        </Link>
        <Link href="/gardener-application" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-50 border border-green-100 active:bg-green-100 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Plus size={16} />
          </div>
          <span className="text-[11px] font-bold text-primary text-center">For Gardeners</span>
        </Link>
        <Link href="/vendor-info" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-50 border border-green-100 active:bg-green-100 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Plus size={16} />
          </div>
          <span className="text-[11px] font-bold text-primary text-center">For Vendors</span>
        </Link>
      </section>

      {/* Support Farmers */}
      <section className="px-6 mb-4">
        <div className="relative h-44 w-full rounded-3xl overflow-hidden bg-primary flex items-center p-6 shadow-lg">
          <div className="w-2/3 z-10">
            <h3 className="text-white font-bold text-xl mb-2">Support Local Farmers</h3>
            <p className="text-white/80 text-xs mb-4">Your purchase helps empower local garden women communities.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-white text-primary px-6 py-2.5 rounded-full text-sm font-bold shadow-md active:scale-95 transition-transform"
              >
                Donate
              </button>
              <Link href="/support" className="bg-primary/20 text-white border border-white/20 px-6 py-2.5 rounded-full text-sm font-bold backdrop-blur-sm active:scale-95 transition-transform inline-block">
                Learn More
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none">
            <Plus className="w-full h-full rotate-45" />
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  );
}
