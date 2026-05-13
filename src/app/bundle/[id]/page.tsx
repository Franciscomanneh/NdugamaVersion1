"use client";

import React, { useState, use } from 'react';
import { ChevronLeft, Plus, Trash2, ShoppingBag, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { bundles } from '@/data/mock';
import { notFound } from 'next/navigation';

export default function BundleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const bundle = bundles.find(b => b.id === id);
  const [ingredients, setIngredients] = useState(bundle?.ingredients.map(ing => ({ name: ing, active: true })) || []);

  if (!bundle) notFound();

  const toggleIngredient = (name: string) => {
    setIngredients(prev => prev.map(ing =>
      ing.name === name ? { ...ing, active: !ing.active } : ing
    ));
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative h-[300px] w-full">
        <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Link href="/market" className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
          <ChevronLeft size={20} />
        </Link>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-accent text-white text-[10px] font-black uppercase px-2 py-1 rounded mb-2 inline-block">Recipe Bundle</span>
          <h1 className="text-3xl font-black text-white">{bundle.name}</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Price</p>
            <p className="text-3xl font-black text-primary">D{bundle.price}</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-2xl">
            <Settings2 size={16} className="text-gray-500" />
            <span className="text-sm font-bold text-gray-700">Customizable</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex justify-between items-center">
            Ingredients
            <span className="text-xs font-medium text-gray-400">{ingredients.filter(i => i.active).length} items included</span>
          </h3>
          <div className="flex flex-col gap-3">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className={`p-4 rounded-2xl border flex justify-between items-center transition-all ${
                  ing.active ? 'bg-white border-gray-100 shadow-soft' : 'bg-gray-50 border-transparent opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${ing.active ? 'bg-primary' : 'bg-gray-300'}`} />
                  <span className={`font-bold ${ing.active ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                    {ing.name}
                  </span>
                </div>
                <button
                  onClick={() => toggleIngredient(ing.name)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    ing.active ? 'bg-red-50 text-red-500' : 'bg-green-50 text-primary'
                  }`}
                >
                  {ing.active ? <Trash2 size={16} /> : <Plus size={16} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-beige border border-yellow-100 mb-8">
          <h4 className="font-bold text-sm mb-2">Cooking Instructions</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Scan the QR code on the delivery package to get the step-by-step video recipe for this {bundle.name}!
          </p>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-6 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50">
        <div className="flex gap-4">
          <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all">
            <ShoppingBag size={20} />
            Add Bundle
          </button>
        </div>
      </div>
    </div>
  );
}
