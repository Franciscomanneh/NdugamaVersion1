"use client";

import React, { useState, use, useMemo } from 'react';
import { ChevronLeft, Plus, Trash2, ShoppingBag, Settings2, Minus, History, UtensilsCrossed } from 'lucide-react';
import { useRouter, notFound } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function BundleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart, bundles, loading } = useAppContext();

  const bundle = bundles.find(b => b.id === id);

  const [ingredients, setIngredients] = useState<any[]>([]);
  const [added, setAdded] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');

  React.useEffect(() => {
    if (bundle) {
      setIngredients(bundle.ingredients.map((ing: any) => ({ ...ing, active: true, isCustom: false })));
    }
  }, [bundle]);

  const currentTotal = useMemo(() => {
    return ingredients.reduce((acc, ing) => {
      return acc + (ing.active ? ing.pricePerUnit * ing.amount : 0);
    }, 0);
  }, [ingredients]);

  if (loading) return null;
  if (!bundle) notFound();

  const toggleIngredient = (name: string) => {
    setIngredients(prev => prev.map(ing =>
      ing.name === name ? { ...ing, active: !ing.active } : ing
    ));
  };

  const updateQuantity = (name: string, delta: number) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.name === name) {
        const newAmount = Math.max(0.5, ing.amount + delta);
        return { ...ing, amount: newAmount, active: true };
      }
      return ing;
    }));
  };

  const handleAddToCart = () => {
    const customizedIngredients = ingredients.filter(i => i.active);
    addToCart({ ...bundle, price: currentTotal }, 'bundle', 1, customizedIngredients);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const addCustomIngredient = () => {
    if (!newIngredient.trim()) return;
    const newItem = {
      name: newIngredient.trim(),
      amount: 1,
      unit: 'unit',
      pricePerUnit: 25, // Default price for custom ingredients
      active: true,
      isCustom: true
    };
    setIngredients(prev => [...prev, newItem]);
    setNewIngredient('');
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="relative h-[300px] w-full shadow-lg">
        <img src={bundle.bundleImage} alt={bundle.bundleName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full mb-2 inline-block shadow-lg">Recipe Bundle</span>
          <h1 className="text-3xl font-black text-white drop-shadow-md">{bundle.bundleName}</h1>
        </div>
      </div>

      <main className="px-6 py-8 flex flex-col gap-8">
        <section className="flex justify-between items-center bg-gray-50 p-6 rounded-[32px] border border-gray-100">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Price</p>
            <p className="text-3xl font-black text-primary">D{currentTotal.toFixed(0)}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
              <Settings2 size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">Customizable</span>
            </div>
            <p className="text-[10px] text-gray-400 italic">Adjust quantities below</p>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <UtensilsCrossed size={18} />
            <h3 className="font-bold">Cooking Description</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed bg-beige/30 p-4 rounded-2xl border border-beige/50">
            {bundle.cookingDescription}
          </p>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Ingredients</h3>
            <span className="text-xs font-medium text-gray-400">{ingredients.filter(i => i.active).length} items included</span>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Add extra ingredient..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              onClick={addCustomIngredient}
              className="px-6 bg-primary text-white font-bold rounded-2xl text-xs active:scale-95 transition-all shadow-md shadow-primary/20"
            >
              Add
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className={`p-4 rounded-3xl border-2 transition-all flex flex-col gap-3 ${
                  ing.active ? 'bg-white border-gray-100 shadow-soft' : 'bg-gray-50 border-transparent opacity-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${ing.active ? 'bg-primary shadow-[0_0_8px_rgba(30,142,62,0.4)]' : 'bg-gray-300'}`} />
                    <span className={`font-bold text-sm ${ing.active ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                      {ing.name}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleIngredient(ing.name)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                      ing.active ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-primary hover:bg-green-100'
                    }`}
                  >
                    {ing.active ? <Trash2 size={16} /> : <Plus size={16} />}
                  </button>
                </div>

                {ing.active && (
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-400">{ing.amount} {ing.unit}</span>
                    <div className="flex items-center gap-4 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                      <button
                        onClick={() => updateQuantity(ing.name, -0.5)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm active:scale-90"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{ing.amount}</span>
                      <button
                        onClick={() => updateQuantity(ing.name, 0.5)}
                        className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-sm active:scale-90"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2 text-primary">
            <History size={18} />
            <h3 className="font-bold">Dugama Promise</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed italic">
            Ingredients are sourced directly from gardens on the morning of delivery to ensure your {bundle.bundleName} tastes authentic and fresh.
          </p>
        </section>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 py-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-40">
        <button
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all ${
            added ? 'bg-green-600 shadow-green-500/20' : 'bg-primary shadow-primary/20'
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
                Bundle Added!
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
                Add to Cart • D{currentTotal.toFixed(0)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
