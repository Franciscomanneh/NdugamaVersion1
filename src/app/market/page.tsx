"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { Search, Filter, Heart, Plus, ChevronLeft, X, SlidersHorizontal, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories, bundles, products } from '@/data/mock';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

function MarketContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, favorites, toggleFavorite } = useAppContext();

  const [activeTab, setActiveTab] = useState<'products' | 'bundles'>(
    (searchParams.get('tab') as 'products' | 'bundles') || 'products'
  );
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest'>('newest');

  // Feedback state for "Added to Cart"
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const tab = searchParams.get('tab');
    if (tab === 'bundles' || tab === 'products') setActiveTab(tab);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const filteredBundles = useMemo(() => {
    return bundles.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = b.price >= priceRange[0] && b.price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });
  }, [searchQuery, priceRange]);

  const handleAddToCart = (item: any, type: 'product' | 'bundle') => {
    addToCart(item, type);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Top Section */}
      <div className="sticky top-0 bg-white z-40 px-6 pt-6 pb-4 flex flex-col gap-4 shadow-sm border-b border-gray-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={activeTab === 'products' ? "Search products..." : "Search bundles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilterModal(true)}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors active:scale-90",
              showFilterModal ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600"
            )}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              "flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all",
              activeTab === 'products' ? "bg-white text-primary shadow-sm" : "text-gray-500"
            )}
          >
            Market Products
          </button>
          <button
            onClick={() => setActiveTab('bundles')}
            className={cn(
              "flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all",
              activeTab === 'bundles' ? "bg-white text-primary shadow-sm" : "text-gray-500"
            )}
          >
            Recipe Bundles
          </button>
        </div>

        {/* Categories Bar (Only show for products or as a general filter) */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {['All', ...categories.map(c => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold border-2 transition-all active:scale-95",
                selectedCategory === cat
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                  : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'bundles' ? (
            <motion.div
              key="bundles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-800 tracking-tight">Recipe Bundles</h2>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{filteredBundles.length} results</span>
              </div>

              {filteredBundles.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <Search size={32} />
                  </div>
                  <p className="text-gray-500 font-medium">No bundles found for "{searchQuery}"</p>
                  <button onClick={() => setSearchQuery('')} className="text-primary font-bold text-sm">Clear Search</button>
                </div>
              ) : (
                filteredBundles.map((bundle) => (
                  <div key={bundle.id} className="rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-soft group">
                    <Link href={`/bundle/${bundle.id}`} className="block relative h-52">
                      <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <h3 className="text-xl font-black text-white">{bundle.name}</h3>
                        <span className="text-2xl font-black text-white">D{bundle.price}</span>
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {bundle.ingredients.slice(0, 4).map((ing, i) => (
                          <span key={i} className="text-[10px] font-bold bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                            {ing.name}
                          </span>
                        ))}
                        {bundle.ingredients.length > 4 && (
                          <span className="text-[10px] font-bold text-gray-400 px-2 py-1">+{bundle.ingredients.length - 4} more</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(bundle, 'bundle')}
                        className={cn(
                          "w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]",
                          addedItems[bundle.id]
                            ? "bg-green-600 text-white"
                            : "bg-primary text-white shadow-primary/20"
                        )}
                      >
                        {addedItems[bundle.id] ? "Added to Cart!" : "Add Bundle to Cart"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-800 tracking-tight">Market Fresh</h2>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{filteredProducts.length} results</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <Search size={32} />
                  </div>
                  <p className="text-gray-500 font-medium">No products found</p>
                  <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="text-primary font-bold text-sm">Reset Filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft flex flex-col group">
                      <div className="relative h-44 w-full overflow-hidden">
                        <Link href={`/product/${p.id}`}>
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </Link>
                        <button
                          onClick={() => toggleFavorite(p.id)}
                          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center active:scale-90 transition-transform z-10"
                        >
                          <Heart size={18} className={cn(favorites.includes(p.id) ? "fill-red-500 text-red-500" : "text-gray-400")} />
                        </button>
                        <button
                          onClick={() => handleAddToCart(p, 'product')}
                          className={cn(
                            "absolute bottom-3 right-3 w-10 h-10 rounded-2xl shadow-xl flex items-center justify-center transition-all z-10 active:scale-90",
                            addedItems[p.id] ? "bg-green-600 text-white" : "bg-primary text-white"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={20} /> : <Plus size={20} />}
                        </button>
                      </div>
                      <Link href={`/product/${p.id}`} className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{p.name}</h3>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-3">
                          <span className="text-lg font-black text-primary">D{p.price}</span>
                          <span className="text-[10px] text-gray-400 font-medium">/{p.unit}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white rounded-t-[40px] z-[70] px-8 pt-8 pb-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="text-primary" size={24} />
                  <h2 className="text-2xl font-black text-gray-800">Filters</h2>
                </div>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                <section>
                  <h3 className="font-black text-gray-800 mb-4 uppercase tracking-wider text-xs">Sort By</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'newest', label: 'Newest First' },
                      { id: 'price-low', label: 'Price: Low to High' },
                      { id: 'price-high', label: 'Price: High to Low' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id as any)}
                        className={cn(
                          "px-5 py-2.5 rounded-2xl text-xs font-bold border-2 transition-all",
                          sortBy === option.id
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-gray-100 text-gray-500"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-black text-gray-800 mb-4 uppercase tracking-wider text-xs">Price Range (D)</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-3 text-sm font-black text-gray-400">
                      <span>D0</span>
                      <span className="text-primary">Up to D{priceRange[1]}</span>
                      <span>D1000+</span>
                    </div>
                  </div>
                </section>

                <button
                  onClick={() => setShowFilterModal(false)}
                  className="w-full py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  Apply Filters
                </button>

                <button
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSortBy('newest');
                    setSelectedCategory('All');
                  }}
                  className="w-full py-2 text-gray-400 font-bold text-xs uppercase tracking-widest"
                >
                  Reset All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MarketPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <MarketContent />
    </Suspense>
  );
}
