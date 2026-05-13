"use client";

import React from 'react';
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag, Receipt, Truck, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useAppContext();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = cart.length > 0 ? 25 : 0;
  const deliveryFee = cart.length > 0 ? 75 : 0;
  const total = subtotal + serviceFee + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center bg-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-green-50 rounded-[40px] flex items-center justify-center mb-8 text-primary/30"
        >
          <ShoppingBag size={56} />
        </motion.div>
        <h2 className="text-3xl font-black text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Looks like you haven't added any fresh market products or recipe bundles yet.
        </p>
        <button
          onClick={() => router.push('/market')}
          className="w-full max-w-[240px] py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-40">
      <header className="px-6 pt-6 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-lg z-40 border-b border-gray-50">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-gray-800">My Cart</h1>
        <span className="ml-auto text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-tighter">
          {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
        </span>
      </header>

      <div className="px-6 py-6 flex flex-col gap-6">
        <AnimatePresence initial={false}>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex gap-5 p-3 rounded-3xl border border-gray-100 bg-white shadow-soft relative group"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {item.type === 'bundle' && (
                  <div className="absolute top-1 left-1 bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    Bundle
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-black text-gray-800 line-clamp-1">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 p-1 hover:bg-red-50 rounded-full transition-colors active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {item.type === 'bundle' && item.ingredients && (
                    <p className="text-[9px] text-gray-400 mt-1 line-clamp-1 italic">
                      Customized Recipe Bundle
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-primary">D{(item.price * item.quantity).toFixed(0)}</span>
                    <p className="text-[10px] text-gray-400 font-medium">D{item.price.toFixed(0)} unit</p>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 px-2 py-1.5 rounded-2xl border border-gray-100 shadow-inner">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-xl shadow-sm active:scale-90 transition-transform"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-white bg-primary rounded-xl shadow-md active:scale-90 transition-transform"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="px-6 mt-4">
        <div className="p-8 rounded-[40px] bg-gray-50 flex flex-col gap-5 border border-gray-100">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Order Summary</h3>

          <div className="flex justify-between items-center text-sm font-bold text-gray-600">
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                <Receipt size={16} />
              </div>
              Subtotal
            </span>
            <span className="text-gray-900">D{subtotal.toFixed(0)}</span>
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-gray-600">
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                <CreditCard size={16} />
              </div>
              Service Fee
            </span>
            <span className="text-gray-900">D{serviceFee}</span>
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-gray-600">
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                <Truck size={16} />
              </div>
              Delivery Fee
            </span>
            <span className="text-gray-900">D{deliveryFee}</span>
          </div>

          <div className="h-px bg-gray-200 my-2" />

          <div className="flex justify-between items-center">
            <span className="text-xl font-black text-gray-800">Total Price</span>
            <span className="text-3xl font-black text-primary drop-shadow-sm">D{total.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[480px] p-6 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-40">
        <button
          onClick={() => router.push('/checkout')}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all"
        >
          Proceed to Checkout
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
