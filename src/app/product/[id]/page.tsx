"use client";

import React, { useState, use } from 'react';
import { ChevronLeft, Minus, Plus, Heart, ShoppingBag, ShieldCheck, Truck, Info, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { products } from '@/data/mock';
import { notFound } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart, favorites, toggleFavorite } = useAppContext();

  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) notFound();

  const handleAddToCart = () => {
    addToCart(product, 'product', quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products.filter(p => product.relatedProductIds.includes(p.id));

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="fixed top-6 left-6 right-6 z-40 flex justify-between">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center active:scale-90 transition-transform"
        >
          <Heart size={20} className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
      </div>

      {/* Image */}
      <div className="h-[400px] w-full rounded-b-[40px] overflow-hidden shadow-lg">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <main className="px-6 mt-8 flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-primary font-bold text-[10px] bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-2xl font-black mt-2 text-gray-800">{product.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-primary">D{product.price}</p>
            <p className="text-gray-400 text-xs font-medium">per {product.unit}</p>
          </div>
        </div>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <Info size={18} />
            <h3 className="font-bold">Freshness Details</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.freshnessDescription}
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <History size={18} />
            <h3 className="font-bold">Storage Instructions</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.storageInstructions}
          </p>
        </section>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Quality</p>
              <p className="text-xs font-bold">100% Fresh</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Delivery</p>
              <p className="text-xs font-bold">Same Day</p>
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-3xl border border-gray-100">
          <span className="font-bold text-gray-700">Quantity</span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center active:scale-90 transition-transform shadow-sm"
            >
              <Minus size={18} />
            </button>
            <span className="text-xl font-black min-w-[20px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4">You may also need</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-2">
              {relatedProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => router.push(`/product/${p.id}`)}
                  className="min-w-[140px] bg-white rounded-2xl border border-gray-100 shadow-soft p-2 text-left active:scale-95 transition-transform"
                >
                  <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                  <p className="text-[11px] font-bold truncate px-1">{p.name}</p>
                  <p className="text-[11px] text-primary font-bold px-1">D{p.price}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 py-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-40">
        <button
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all ${
            added ? 'bg-green-600' : 'bg-primary'
          } text-white`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Added to Cart!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag size={20} />
                Add to Cart • D{product.price * quantity}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
