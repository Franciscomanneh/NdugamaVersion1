"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Phone, Truck, Wallet, CheckCircle2, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const deliveryZones = ['Banjul', 'Serrekunda', 'Brikama', 'Bakau'];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, location, setLocation, clearCart, addOrder } = useAppContext();

  const [address, setAddress] = useState('House 42, Kairaba Avenue');
  const [phone, setPhone] = useState('+220 700 0000');
  const [isPlacing, setIsPlacing] = useState(false);
  const [isUnsupported, setIsUnsupported] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = cart.length > 0 ? 25 : 0;
  const deliveryFee = cart.length > 0 ? 75 : 0;
  const total = subtotal + serviceFee + deliveryFee;

  useEffect(() => {
    if (cart.length === 0 && !isPlacing) {
      router.push('/cart');
    }
  }, [cart, router, isPlacing]);

  const handlePlaceOrder = () => {
    if (!deliveryZones.includes(location)) {
      setIsUnsupported(true);
      return;
    }

    setIsPlacing(true);

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString(),
      total: total,
      status: 'Order Received' as const,
      items: [...cart],
      deliveryZone: location
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      router.push('/order-success');
    }, 2000);
  };

  if (cart.length === 0 && !isPlacing) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-40">
      <header className="bg-white px-6 pt-6 pb-4 flex items-center gap-4 sticky top-0 z-40 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-gray-800">Checkout</h1>
      </header>

      <div className="p-6 flex flex-col gap-6">
        {/* Delivery Address */}
        <section className="bg-white p-6 rounded-[32px] shadow-soft border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <MapPin size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-800 tracking-tight">Delivery Details</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Delivery Zone</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {deliveryZones.map(zone => (
                  <button
                    key={zone}
                    onClick={() => {
                      setLocation(zone);
                      setIsUnsupported(false);
                    }}
                    className={cn(
                      "py-3 rounded-2xl text-xs font-bold border-2 transition-all active:scale-[0.98]",
                      location === zone ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                    )}
                  >
                    {zone}
                  </button>
                ))}
              </div>
              {isUnsupported && (
                <p className="text-red-500 text-[10px] font-bold mt-2 ml-1">We don't deliver to this area yet.</p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Phone Number</label>
              <div className="relative mt-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-[20px] py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Exact Address / Landmark</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="E.g. Near the big mosque, House #12"
                className="w-full mt-1 bg-gray-50 border-none rounded-[20px] py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="bg-green-600 p-6 rounded-[32px] shadow-lg shadow-green-600/20 text-white relative overflow-hidden group">
          <div className="relative z-10 flex gap-4">
            <div className="w-12 h-12 rounded-[18px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-black tracking-tight">Community Delivery</h3>
              <p className="text-xs text-white/80 mt-1 leading-relaxed font-medium">
                Orders are delivered by our community network of women and students. Fast, safe, and supportive.
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </section>

        {/* Payment Method */}
        <section className="bg-white p-6 rounded-[32px] shadow-soft border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Wallet size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-800 tracking-tight">Payment Method</h2>
          </div>
          <div className="flex items-center justify-between p-5 rounded-[24px] border-2 border-primary bg-green-50/30 shadow-inner">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-gray-800">Cash on Delivery</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Pay at your door</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
              <CheckCircle2 size={16} />
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-white p-8 rounded-[32px] shadow-soft border border-gray-100 mb-4">
          <h2 className="text-lg font-black text-gray-800 mb-6 tracking-tight">Order Summary</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm font-bold text-gray-500">
              <span>Subtotal</span>
              <span className="text-gray-900">D{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-500">
              <span>Service Fee</span>
              <span className="text-gray-900">D{serviceFee}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-500">
              <span>Delivery Fee</span>
              <span className="text-gray-900">D{deliveryFee}</span>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex justify-between items-center">
              <span className="font-black text-gray-800">Total Amount</span>
              <span className="text-3xl font-black text-primary drop-shadow-sm">D{total.toFixed(0)}</span>
            </div>
          </div>
        </section>

        <section className="flex items-center gap-3 px-2 py-4 bg-orange-50 rounded-2xl border border-orange-100">
          <ShieldCheck className="text-orange-500" size={20} />
          <p className="text-[10px] font-bold text-orange-700">Your order is protected by Dugama Community Promise.</p>
        </section>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[480px] p-6 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50">
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className={cn(
            "w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 transition-all",
            isPlacing ? "opacity-70 scale-95" : "active:scale-[0.98]"
          )}
        >
          {isPlacing ? (
            <>
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Place Order • D{total.toFixed(0)}
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>

      {/* Location Unsupported Modal */}
      {isUnsupported && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[40px] p-8 w-full max-w-sm text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-4">Area Not Covered</h2>
            <p className="text-gray-500 mb-8 leading-relaxed font-medium">
              We are not yet available in <span className="text-gray-800 font-bold">{location}</span>. We're expanding soon!
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsUnsupported(false)}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95"
              >
                Join Waiting List
              </button>
              <button
                onClick={() => setIsUnsupported(false)}
                className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold active:scale-95"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
