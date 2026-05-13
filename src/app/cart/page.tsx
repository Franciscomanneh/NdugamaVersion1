"use client";

import React, { useState } from 'react';
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag, Receipt, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { products, bundles } from '@/data/mock';

export default function CartPage() {
  // Mock cart items
  const [items, setItems] = useState([
    { id: 'p1', type: 'product', name: 'Fresh Tomatoes', price: 50, quantity: 2, image: products[0].image, unit: 'kg' },
    { id: 'b1', type: 'bundle', name: 'Domoda Bundle', price: 450, quantity: 1, image: bundles[0].image, unit: 'bundle' },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = 25;
  const deliveryFee = 75;
  const total = subtotal + serviceFee + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any fresh market products yet.</p>
        <Link href="/market" className="px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="px-6 pt-6 pb-4 flex items-center gap-4">
        <Link href="/market" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black">My Cart</h1>
      </div>

      <div className="px-6 py-4 flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-2">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">D{item.price} / {item.unit}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-primary">D{item.price * item.quantity}</span>
                <div className="flex items-center gap-4 bg-gray-50 px-2 py-1 rounded-xl border border-gray-100">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-primary">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-6 mt-6">
        <div className="p-6 rounded-3xl bg-gray-50 flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-medium text-gray-500">
            <span className="flex items-center gap-2"><Receipt size={16} /> Subtotal</span>
            <span className="text-gray-900">D{subtotal}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium text-gray-500">
            <span className="flex items-center gap-2"><CreditCard size={16} /> Service Fee</span>
            <span className="text-gray-900">D{serviceFee}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium text-gray-500">
            <span className="flex items-center gap-2"><Truck size={16} /> Delivery Fee</span>
            <span className="text-gray-900">D{deliveryFee}</span>
          </div>
          <div className="h-px bg-gray-200 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-black">Total</span>
            <span className="text-2xl font-black text-primary">D{total}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-6 bg-white border-t border-gray-100 z-50">
        <Link href="/checkout" className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
