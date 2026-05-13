"use client";

import React from 'react';
import { CheckCircle2, MessageCircle, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const orderNumber = "DUG-7829-X";

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi Dugama! I just placed an order ${orderNumber}. Please confirm my delivery.`);
    window.open(`https://wa.me/2207000000?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-24 h-24 bg-green-100 text-primary rounded-full flex items-center justify-center mb-8 animate-bounce">
        <CheckCircle2 size={48} />
      </div>

      <h1 className="text-3xl font-black mb-4">Order Placed!</h1>
      <p className="text-gray-500 mb-2 font-medium">Thank you for supporting local farmers.</p>
      <div className="bg-gray-50 px-4 py-2 rounded-xl mb-12">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order Number</p>
        <p className="text-lg font-black text-primary">{orderNumber}</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <button
          onClick={handleWhatsApp}
          className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
        >
          <MessageCircle size={24} />
          Confirm on WhatsApp
        </button>

        <Link
          href="/"
          className="w-full py-4 bg-white border-2 border-primary text-primary rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Home size={20} />
          Back to Home
        </Link>

        <Link
          href="/orders"
          className="text-gray-400 text-sm font-bold mt-4"
        >
          View My Orders
        </Link>
      </div>

      <div className="mt-12 p-6 rounded-3xl bg-beige border border-yellow-100 flex gap-4 items-start text-left">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm">Next Steps</h4>
          <p className="text-xs text-gray-600 leading-relaxed mt-1">
            Our team is preparing your basket. You will receive a call when the delivery person is near your area.
          </p>
        </div>
      </div>
    </div>
  );
}
