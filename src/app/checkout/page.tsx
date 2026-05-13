"use client";

import React, { useState } from 'react';
import { ChevronLeft, MapPin, Phone, Truck, Wallet, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const deliveryZones = ['Banjul', 'Serrekunda', 'Brikama', 'Bakau'];

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState('Serrekunda');
  const [address, setAddress] = useState('House 42, Kairaba Avenue');
  const [phone, setPhone] = useState('+220 700 0000');
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      router.push('/order-success');
    }, 1500);
  };

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <div className="bg-white px-6 pt-6 pb-4 flex items-center gap-4">
        <Link href="/cart" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black">Checkout</h1>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Delivery Address */}
        <section className="bg-white p-6 rounded-3xl shadow-soft">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-primary" /> Delivery Address
          </h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Delivery Zone</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {deliveryZones.map(zone => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={cn(
                      "py-2.5 rounded-xl text-xs font-bold border transition-all",
                      selectedZone === zone ? "bg-primary border-primary text-white" : "bg-white border-gray-100 text-gray-500"
                    )}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Phone Number</label>
              <div className="relative mt-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Exact Address / Landmark</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="bg-green-50 p-6 rounded-3xl border border-green-100">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary">Community Delivery</h3>
              <p className="text-xs text-green-700/70 mt-1 leading-relaxed">
                Orders are delivered by our community network of women and students. Fast, safe, and supportive.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white p-6 rounded-3xl shadow-soft">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Wallet size={18} className="text-primary" /> Payment Method
          </h2>
          <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-primary bg-green-50/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Cash on Delivery</p>
                <p className="text-[10px] text-gray-500 font-medium">Pay when you receive items</p>
              </div>
            </div>
            <CheckCircle2 size={20} className="text-primary" />
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-white p-6 rounded-3xl shadow-soft">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">D550</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service Fee</span>
              <span className="font-bold">D25</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-bold">D75</span>
            </div>
            <div className="h-px bg-gray-100 my-1" />
            <div className="flex justify-between items-center">
              <span className="font-bold">Total Amount</span>
              <span className="text-xl font-black text-primary">D650</span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-6 bg-white border-t border-gray-100 z-50">
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className={cn(
            "w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all",
            isPlacing ? "opacity-70 scale-95" : "active:scale-[0.98]"
          )}
        >
          {isPlacing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Placing Order...
            </>
          ) : (
            "Place Order • D650"
          )}
        </button>
      </div>
    </div>
  );
}
