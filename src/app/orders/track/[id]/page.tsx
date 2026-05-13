'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, Package, ShoppingBag, Truck, CheckCircle2,
  MessageCircle, Phone, MapPin, Clock, AlertCircle, Users
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { orders, markOrderCompleted } = useAppContext();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle size={64} className="text-red-100 mb-6" />
        <h2 className="text-2xl font-black text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-8 font-medium">We couldn't find the tracking details for this order ID.</p>
        <button
          onClick={() => router.push('/orders')}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const steps = [
    { status: 'Order Received', icon: Package, label: 'Confirmed', desc: 'We have received your order', time: '09:30 AM' },
    { status: 'Shopping In Progress', icon: ShoppingBag, label: 'Picking', desc: 'Our team is at the market', time: '10:15 AM' },
    { status: 'Out For Delivery', icon: Truck, label: 'On the Way', desc: 'Rider is heading to your location', time: '11:00 AM' },
    { status: 'Delivered', icon: CheckCircle2, label: 'Completed', desc: 'Package has been delivered', time: '11:45 AM' },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <header className="bg-white px-6 pt-6 pb-4 flex items-center gap-4 sticky top-0 z-40 border-b border-gray-100">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Track Order</h1>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{order.id}</p>
        </div>
      </header>

      <main className="p-6 flex flex-col gap-6">
        {/* Visual Map Placeholder */}
        <div className="bg-white p-2 rounded-[40px] shadow-soft border border-gray-100 overflow-hidden relative">
          <div className="h-48 w-full bg-gray-100 rounded-[32px] overflow-hidden">
             <img
               src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600"
               className="w-full h-full object-cover opacity-50 grayscale"
               alt="Map"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl"
                  >
                    <Truck size={24} />
                  </motion.div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-100 whitespace-nowrap">
                    <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Moving to {order.deliveryZone}</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-[40px] p-8 shadow-soft border border-gray-100">
          <div className="flex justify-between items-center mb-10 px-1">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Progress</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live Updates</span>
            </div>
          </div>

          <div className="flex flex-col gap-10 relative">
            {/* Line connecting steps */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100" />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              className="absolute left-6 top-6 w-0.5 bg-primary transition-all duration-1000"
            />

            {steps.map((step, idx) => {
              const isActive = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={idx} className="flex gap-6 relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-sm",
                    isCurrent ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" :
                    isActive ? "bg-green-50 text-primary border-green-100" : "bg-gray-50 text-gray-300"
                  )}>
                    <step.icon size={20} />
                  </div>
                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <h3 className={cn(
                        "font-black tracking-tight",
                        isActive ? "text-gray-800" : "text-gray-300"
                      )}>
                        {step.label}
                      </h3>
                      <p className={cn(
                        "text-xs font-medium",
                        isActive ? "text-gray-500" : "text-gray-200"
                      )}>
                        {step.desc}
                      </p>
                    </div>
                    {isActive && (
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest pt-1">{step.time}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Driver Contact */}
        {order.status === 'Out For Delivery' && (
          <div className="bg-primary p-6 rounded-[40px] text-white flex items-center justify-between shadow-xl shadow-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Your Delivery Hero</p>
                <h3 className="font-black text-lg">Fatima & Team</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <Phone size={18} />
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Button - Buyer Only */}
        {(order.status === 'Delivered' || order.status === 'Out For Delivery') && !order.completedAt && (
           <button
             onClick={() => markOrderCompleted(order.id)}
             className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
           >
             Mark as Completed
           </button>
        )}

        {order.completedAt && (
          <div className="bg-green-500 p-8 rounded-[40px] text-white text-center shadow-xl shadow-green-500/20">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black mb-2">Delivery Successful!</h3>
            <p className="text-sm font-medium opacity-80 mb-6">Enjoy your fresh market products. Thank you for supporting Gambian gardeners!</p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 bg-white text-green-600 rounded-2xl font-black uppercase tracking-widest text-[10px]"
            >
              Order Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
