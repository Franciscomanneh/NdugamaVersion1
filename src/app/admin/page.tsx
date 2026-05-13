'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, ShieldAlert, CheckCircle2, Clock, Truck,
  Package, ShoppingBag, Users, DollarSign, Plus, Edit, Trash2, X
} from 'lucide-react';
import { useAppContext, Order } from '@/context/AppContext';
import { gardeners, products as initialProducts } from '@/data/mock';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const router = useRouter();
  const { orders, updateOrderStatus, user } = useAppContext();
  const [activeTab, setActiveTab] = useState<'orders' | 'gardeners' | 'products' | 'donations'>('orders');

  // Local state for simulator
  const [products, setProducts] = useState(initialProducts);
  const [pendingGardeners, setPendingGardeners] = useState(gardeners.filter(g => !g.isFeatured).slice(0, 2));
  const [donations] = useState([
    { id: 'DON-1', amount: 250, method: 'Wave', date: '2023-11-20', donor: 'Omar Jallow' },
    { id: 'DON-2', amount: 50, method: 'Cash', date: '2023-11-19', donor: 'Fatima Sarr' },
    { id: 'DON-3', amount: 500, method: 'AfriMoney', date: '2023-11-18', donor: 'John Mendy' },
  ]);

  const statusOptions: Order['status'][] = [
    'Order Received',
    'Shopping In Progress',
    'Out For Delivery',
    'Delivered'
  ];

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Active', value: orders.filter(o => o.status !== 'Delivered').length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Gardeners', value: gardeners.length, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Donations', value: `D${donations.reduce((acc, d) => acc + d.amount, 0)}`, icon: DollarSign, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <header className="bg-white px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/profile')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Master Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-500 rounded-full border border-red-100">
          <ShieldAlert size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Simulator</span>
        </div>
      </header>

      <main className="p-6 flex flex-col gap-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-soft">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {[
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'gardeners', label: 'Gardeners', icon: Users },
            { id: 'products', label: 'Products', icon: ShoppingBag },
            { id: 'donations', label: 'Donations', icon: DollarSign },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs whitespace-nowrap transition-all border",
                activeTab === tab.id
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white border-gray-100 text-gray-500"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Live Order Management</h2>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">{orders.length} Total</span>
                </div>

                {orders.length === 0 ? (
                  <EmptyState icon={Package} text="No orders to manage yet." />
                ) : (
                  orders.map((order) => (
                    <OrderCard key={order.id} order={order} statusOptions={statusOptions} updateOrderStatus={updateOrderStatus} />
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'gardeners' && (
              <motion.div
                key="gardeners"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pending Applications</h2>
                {pendingGardeners.length === 0 ? (
                  <EmptyState icon={Users} text="No pending applications." />
                ) : (
                  pendingGardeners.map((g) => (
                    <div key={g.id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-soft">
                      <div className="flex items-center gap-4 mb-4">
                        <img src={g.image} className="w-12 h-12 rounded-2xl object-cover" />
                        <div>
                          <h3 className="font-black text-gray-800 tracking-tight">{g.name}</h3>
                          <p className="text-xs text-gray-400 font-bold">{g.garden} • {g.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPendingGardeners(prev => prev.filter(p => p.id !== g.id))}
                          className="flex-1 py-3 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setPendingGardeners(prev => prev.filter(p => p.id !== g.id))}
                          className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Marketplace Inventory</h2>
                  <button className="flex items-center gap-1 text-primary font-black text-[10px] uppercase tracking-widest">
                    <Plus size={14} /> Add New
                  </button>
                </div>
                {products.map((p) => (
                  <div key={p.id} className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-soft flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-black text-gray-800 text-sm tracking-tight">{p.name}</h3>
                        <p className="text-[10px] text-primary font-bold">D{p.price} / {p.unit}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center"><Edit size={14} /></button>
                      <button
                        onClick={() => setProducts(prev => prev.filter(item => item.id !== p.id))}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center"
                      ><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'donations' && (
              <motion.div
                key="donations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Donation History</h2>
                <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft">
                  {donations.map((d, i) => (
                    <div key={d.id} className={cn("p-6 flex justify-between items-center", i !== donations.length - 1 ? "border-b border-gray-50" : "")}>
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{d.id}</p>
                        <h3 className="font-black text-gray-800 tracking-tight">{d.donor}</h3>
                        <p className="text-[10px] text-gray-400 font-bold">{d.date} • via {d.method}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-green-600">D{d.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-[40px] border border-dashed border-gray-200">
      <Icon className="text-gray-200" size={48} />
      <p className="text-gray-400 font-bold">{text}</p>
    </div>
  );
}

function OrderCard({ order, statusOptions, updateOrderStatus }: { order: Order, statusOptions: any[], updateOrderStatus: any }) {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-soft">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{order.id}</span>
          <h3 className="font-black text-gray-800 tracking-tight">{order.date}</h3>
          <p className="text-xs text-gray-400 font-bold">Total: D{order.total.toFixed(0)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Status</p>
          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
            className="bg-gray-50 border-none rounded-xl py-2 px-4 text-xs font-black text-primary focus:ring-2 focus:ring-primary/20 appearance-none pr-8"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-2xl mb-2">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
            <span>{item.quantity}x {item.name}</span>
            <span>D{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {order.completedAt && (
        <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-100">
          <CheckCircle2 size={14} />
          <span className="text-[10px] font-black uppercase">Buyer confirmed at {order.completedAt}</span>
        </div>
      )}
    </div>
  );
}
