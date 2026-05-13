"use client";

import React, { useState, use } from 'react';
import { ChevronLeft, Minus, Plus, Heart, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/data/mock';
import { notFound } from 'next/navigation';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) notFound();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between">
        <Link href="/market" className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <ChevronLeft size={20} />
        </Link>
        <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500">
          <Heart size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="h-[400px] w-full rounded-b-[40px] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-primary font-bold text-xs bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl font-black mt-2">{product.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-primary">D{product.price}</p>
            <p className="text-gray-400 text-xs font-medium">per {product.unit}</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Freshly harvested from local Sukuta gardens this morning. These {product.name.toLowerCase()} are grown organically without harmful pesticides, ensuring the best taste and nutrition for your family.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Quality</p>
              <p className="text-xs font-bold">100% Fresh</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
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
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-3xl mb-10">
          <span className="font-bold text-gray-700">Quantity</span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center active:scale-90 transition-transform"
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
        <div>
          <h3 className="text-lg font-bold mb-4">You may also need</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6">
            {products.filter(p => p.id !== id).map((p) => (
              <div key={p.id} className="min-w-[140px] bg-white rounded-2xl border border-gray-100 shadow-soft p-2">
                <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                <p className="text-[11px] font-bold truncate px-1">{p.name}</p>
                <p className="text-[11px] text-primary font-bold px-1">D{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-6 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50">
        <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all">
          <ShoppingBag size={20} />
          Add to Cart • D{product.price * quantity}
        </button>
      </div>
    </div>
  );
}
