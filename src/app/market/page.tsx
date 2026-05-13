"use client";

import React, { useState } from 'react';
import { Search, Filter, Heart, Plus, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { categories, bundles, products } from '@/data/mock';
import { cn } from '@/lib/utils';

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'bundles'>('products');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="pb-20">
      {/* Top Section */}
      <div className="sticky top-0 bg-white z-40 px-6 pt-6 pb-4 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
            <Filter size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
              activeTab === 'products' ? "bg-white text-primary shadow-sm" : "text-gray-500"
            )}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('bundles')}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
              activeTab === 'bundles' ? "bg-white text-primary shadow-sm" : "text-gray-500"
            )}
          >
            Recipe Bundles
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {['All', ...categories.map(c => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border transition-all",
                selectedCategory === cat
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-500"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-4">
        {activeTab === 'bundles' ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">Recipe Bundles</h2>
            {bundles.map((bundle) => (
              <Link key={bundle.id} href={`/bundle/${bundle.id}`} className="block">
                <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-soft">
                  <img src={bundle.image} alt={bundle.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{bundle.name}</h3>
                      <span className="text-xl font-bold text-primary">D{bundle.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Includes: {bundle.ingredients.join(', ')}</p>
                    <button className="w-full py-3 bg-green-50 text-primary rounded-2xl text-sm font-bold hover:bg-green-100 transition-colors">
                      Add Bundle to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft flex flex-col">
                <Link href={`/product/${p.id}`} className="relative h-40 w-full">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400">
                    <Heart size={16} />
                  </button>
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold mb-1 line-clamp-2">{p.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">{p.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-black text-primary">D{p.price}</span>
                    <button className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md active:scale-90 transition-transform">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
