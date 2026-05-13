import React from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Plus, MapPin } from 'lucide-react';
import { categories, gardeners, bundles, products } from '@/data/mock';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <header className="px-6 pt-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">DUGAMA</h1>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin size={14} />
            <span>The Gambia</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
          <Search size={20} />
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6">
        <div className="relative h-[200px] w-full rounded-3xl overflow-hidden bg-gray-900 group">
          <img
            src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800"
            alt="Gambian Market"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-white text-2xl font-bold leading-tight">
              Fresh Market Shopping <br />Made Easy in The Gambia
            </h2>
            <p className="text-white/80 text-sm mt-2 mb-4">
              Get fresh products from local gardens delivered to your door.
            </p>
            <div className="flex gap-3">
              <Link href="/market" className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold">
                Shop Market
              </Link>
              <Link href="/market?tab=bundles" className="px-5 py-2.5 bg-white text-primary rounded-full text-sm font-semibold">
                Bundles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="text-lg font-bold">Categories</h3>
          <button className="text-primary text-sm font-semibold flex items-center">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 hide-scrollbar">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-16 h-16 rounded-2xl bg-beige flex items-center justify-center text-2xl shadow-soft">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Gardeners */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Featured Gardeners</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {gardeners.slice(0, 4).map((g) => (
            <div key={g.id} className="p-3 rounded-2xl bg-white border border-gray-100 shadow-soft">
              <img src={g.image} alt={g.name} className="w-full h-24 object-cover rounded-xl mb-3" />
              <h4 className="font-bold text-sm truncate">{g.garden}</h4>
              <p className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
                <MapPin size={10} /> {g.location}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400">Featured</p>
                  <p className="text-[11px] font-bold text-primary">{g.featuredProduct}</p>
                </div>
                <div className="text-[10px] font-bold bg-green-50 text-primary px-1.5 py-0.5 rounded">
                  {g.price.split(' ')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipe Bundles */}
      <section>
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="text-lg font-bold text-accent">Dugama Recipe Bundles</h3>
          <button className="text-accent text-sm font-semibold flex items-center">
            See More <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 hide-scrollbar">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="min-w-[280px] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-soft relative group">
              <img src={bundle.image} alt={bundle.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">{bundle.name}</h4>
                <div className="flex flex-wrap gap-1 mb-3">
                  {bundle.ingredients.slice(0, 3).map((ing, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {ing}
                    </span>
                  ))}
                  <span className="text-[10px] text-gray-400">+{bundle.ingredients.length - 3} more</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-xl">D{bundle.price}</span>
                  <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Preview */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Market Fresh</h3>
          <Link href="/market" className="text-primary text-sm font-semibold">View All</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft">
              <div className="relative h-32 w-full">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 shadow-sm">
                  <Plus size={16} />
                </button>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold truncate">{p.name}</h4>
                <p className="text-lg font-bold text-primary">D{p.price}<span className="text-xs text-gray-400 font-normal"> / {p.unit}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For Everyone Section */}
      <section className="px-6 grid grid-cols-3 gap-3">
        {['Buyers', 'Gardeners', 'Vendors'].map((role) => (
          <div key={role} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-50 border border-green-100">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Plus size={16} />
            </div>
            <span className="text-[11px] font-bold text-primary">For {role}</span>
          </div>
        ))}
      </section>

      {/* Support Farmers */}
      <section className="px-6">
        <div className="relative h-40 w-full rounded-3xl overflow-hidden bg-primary flex items-center p-6">
          <div className="w-2/3 z-10">
            <h3 className="text-white font-bold text-xl mb-2">Support Local Farmers</h3>
            <p className="text-white/80 text-xs mb-4">Your purchase helps empower local garden women communities.</p>
            <button className="bg-white text-primary px-4 py-2 rounded-full text-xs font-bold">Learn More</button>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 pointer-events-none">
            <Plus className="w-full h-full rotate-45" />
          </div>
        </div>
      </section>
    </div>
  );
}
