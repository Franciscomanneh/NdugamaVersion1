"use client";

import React, { useState, useMemo } from 'react';
import { ChevronLeft, Package, Clock, CheckCircle2, MapPin, Truck, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrdersPage() {
  const router = useRouter();
  const { orders, markOrderCompleted } = useAppContext();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (activeTab === 'ongoing') return order.status !== 'Delivered';
      return order.status === 'Delivered';
    });
  }, [orders, activeTab]);

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Order Received': return 1;
      case 'Shopping In Progress': return 2;
      case 'Out For Delivery': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <header className="bg-white px-6 pt-6 pb-4 flex items-center gap-4 sticky top-0 z-40 border-b border-gray-100">
        <button
          onClick={() => router.push('/profile')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-gray-800">My Orders</h1>
      </header>

      {/* Tabs */}
      <div className="px-6 py-4 bg-white shadow-sm flex gap-4 sticky top-[72px] z-30">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={cn(
            "flex-1 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
            activeTab === 'ongoing' ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-100 text-gray-400"
          )}
        >
          <Clock size={16} /> Ongoing
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={cn(
            "flex-1 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
            activeTab === 'completed' ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-100 text-gray-400"
          )}
        >
          <CheckCircle2 size={16} /> Completed
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {filteredOrders.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order ID</span>
                          <span className="text-sm font-black text-primary">{order.id}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{order.date}</p>
                      </div>
                      <div className={cn(
                        "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                        activeTab === 'ongoing' ? "bg-orange-50 text-orange-500 border-orange-100" : "bg-green-50 text-primary border-green-100"
                      )}>
                        {order.status}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-6">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shadow-inner overflow-hidden border border-gray-50">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-gray-700 block line-clamp-1">{item.name}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.quantity} units • D{item.price * item.quantity}</span>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-[10px] font-bold text-gray-400 italic ml-14">+{order.items.length - 2} more items</p>
                      )}
                    </div>

                    <div className="h-px bg-gray-50 mb-6" />

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-right ml-auto">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Grand Total</p>
                        <p className="text-2xl font-black text-gray-800 tracking-tighter">D{order.total.toFixed(0)}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {activeTab === 'ongoing' ? (
                        <>
                          <button
                            onClick={() => router.push(`/orders/track/${order.id}`)}
                            className="w-full py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                          >
                            <Truck size={16} /> Track Delivery
                          </button>
                          <button
                            onClick={() => markOrderCompleted(order.id)}
                            className="w-full py-2 text-primary font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-50 rounded-xl transition-colors"
                          >
                            <Check size={14} /> Mark as Completed
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-4 bg-green-50 rounded-[20px] border border-green-100">
                          <CheckCircle2 size={16} className="text-primary" />
                          <span className="text-xs font-black text-primary uppercase tracking-widest">Order Completed Successfully</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tracking Flow */}
                  <AnimatePresence>
                    {selectedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 border-t border-gray-100 p-8"
                      >
                        <div className="relative flex flex-col gap-8">
                          <div className="absolute left-[15px] top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
                          <div
                            className="absolute left-[15px] top-0 w-1 bg-primary rounded-full transition-all duration-1000"
                            style={{ height: `${(getStatusStep(order.status) - 1) * 33}%` }}
                          />

                          {[
                            { step: 1, label: 'Order Received', desc: 'We have received your order.' },
                            { step: 2, label: 'Shopping In Progress', desc: 'Our community shoppers are in the garden.' },
                            { step: 3, label: 'Out For Delivery', desc: 'Driver is on the way to your location.' },
                            { step: 4, label: 'Delivered', desc: 'Items have been successfully delivered.' },
                          ].map((stage) => {
                            const isPast = stage.step < getStatusStep(order.status);
                            const isCurrent = stage.step === getStatusStep(order.status);

                            return (
                              <div key={stage.step} className="flex gap-6 relative z-10">
                                <div className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center border-4 border-gray-50 transition-colors",
                                  isPast || isCurrent ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
                                )}>
                                  {isPast ? <Check size={16} /> : <span className="text-xs font-black">{stage.step}</span>}
                                </div>
                                <div className="flex-1">
                                  <h4 className={cn(
                                    "text-sm font-black tracking-tight",
                                    isPast || isCurrent ? "text-gray-800" : "text-gray-400"
                                  )}>{stage.label}</h4>
                                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{stage.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-[32px] flex items-center justify-center mb-6 text-gray-300">
                <Package size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">No {activeTab} orders</h3>
              <p className="text-sm text-gray-500 mb-8 max-w-[200px]">Looks like you don't have any {activeTab} orders at the moment.</p>
              <button
                onClick={() => router.push('/market')}
                className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                Go To Market
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
