"use client";

import React, { useState } from 'react';
import { ChevronLeft, Package, Clock, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const mockOrders = [
  {
    id: 'DUG-7829-X',
    date: '13 May 2024, 10:30 AM',
    status: 'ongoing',
    total: 650,
    items: ['Domoda Bundle', 'Fresh Tomatoes x2'],
    location: 'Serrekunda'
  },
  {
    id: 'DUG-7102-B',
    date: '11 May 2024, 02:15 PM',
    status: 'completed',
    total: 1200,
    items: ['Fish (Ladyfish) x3', 'Red Onions x5', 'Bread x4'],
    location: 'Banjul'
  },
  {
    id: 'DUG-6950-A',
    date: '05 May 2024, 09:00 AM',
    status: 'completed',
    total: 450,
    items: ['Supakanja Bundle'],
    location: 'Bakau'
  }
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const filteredOrders = mockOrders.filter(order => order.status === activeTab);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-white px-6 pt-6 pb-4 flex items-center gap-4">
        <Link href="/profile" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black">My Orders</h1>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 bg-white shadow-sm flex gap-4">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={cn(
            "flex-1 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'ongoing' ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-gray-500"
          )}
        >
          <Clock size={16} /> Ongoing
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={cn(
            "flex-1 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'completed' ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-gray-500"
          )}
        >
          <CheckCircle2 size={16} /> Completed
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order</span>
                    <span className="text-sm font-black text-primary">{order.id}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">{order.date}</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase",
                  order.status === 'ongoing' ? "bg-orange-50 text-orange-500" : "bg-green-50 text-primary"
                )}>
                  {order.status}
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <Package size={16} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-6" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={14} />
                  <span className="text-xs font-bold">{order.location}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Total Price</p>
                  <p className="text-xl font-black text-primary">D{order.total}</p>
                </div>
              </div>

              {order.status === 'ongoing' && (
                <button className="w-full mt-6 py-3 bg-green-50 text-primary rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-green-100 transition-colors">
                  Track Delivery
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <Package size={32} />
            </div>
            <p className="font-bold text-gray-400">No {activeTab} orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
