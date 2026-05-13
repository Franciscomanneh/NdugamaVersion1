'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, Plus, Edit, Trash2, ShoppingBag,
  Users, DollarSign, Package, TrendingUp, Search, X, Image as ImageIcon, MessageCircle
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { products as initialProducts } from '@/data/mock';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerDashboard() {
  const router = useRouter();
  const { user } = useAppContext();

  // Local state for seller-specific view simulator
  const [sellerProducts, setSellerProducts] = useState(initialProducts.slice(0, 4));
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales' | 'stats'>('inventory');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const stats = [
    { label: 'Total Sales', value: 'D12,450', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Orders', value: '28', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Views', value: '1,240', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to Firebase
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <header className="bg-white px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/profile')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Seller Hub</h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user?.name || 'Garden Admin'}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-soft">
          <img src={user?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" />
        </div>
      </header>

      <main className="p-6 flex flex-col gap-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-[28px] border border-gray-100 shadow-soft">
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-3", stat.bg, stat.color)}>
                <stat.icon size={16} />
              </div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-sm font-black text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Tabs */}
        <div className="bg-white p-2 rounded-[32px] flex gap-1 border border-gray-100 shadow-soft">
          {[
            { id: 'inventory', label: 'Inventory', icon: ShoppingBag },
            { id: 'sales', label: 'Recent Sales', icon: DollarSign },
            { id: 'stats', label: 'Analytics', icon: TrendingUp },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 rounded-[24px] transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-400"
              )}
            >
              <tab.icon size={18} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              <div className="flex justify-between items-center mb-2 px-1">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">My Products</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                  <Plus size={14} /> Add Product
                </button>
              </div>

              {sellerProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-soft flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={p.image} className="w-16 h-16 rounded-2xl object-cover" />
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm">LIVE</div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-800 tracking-tight">{p.name}</h3>
                      <p className="text-xs text-primary font-bold">D{p.price} / {p.unit}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[8px] font-black text-gray-400 uppercase bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">Stock: 45kg</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setIsAddModalOpen(true);
                      }}
                      className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setSellerProducts(prev => prev.filter(item => item.id !== p.id))}
                      className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                    ><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'sales' && (
            <motion.div
              key="sales"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Recent Transactions</h2>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-soft">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">ORD-772{i}</p>
                      <h3 className="font-black text-gray-800 tracking-tight">Today, 14:2{i}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-green-600">D{(450 + i*50)}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-50 pt-4 flex justify-between items-center">
                    <span>Items: 5kg Tomatoes, 2kg Onions</span>
                    <span className="text-blue-500 bg-blue-50 px-2 py-1 rounded-lg font-black">PAID</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-soft text-center py-20"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mx-auto mb-6">
                <TrendingUp size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Detailed Analytics</h3>
              <p className="text-sm text-gray-400 font-bold mb-8 leading-relaxed px-4">
                Detailed charts and sales trends will be available once your garden completes 10 sales.
              </p>
              <div className="flex flex-col gap-4 text-left">
                {[
                  { label: 'Profile Visits', val: '+24%', color: 'text-green-500' },
                  { label: 'Conversion Rate', val: '12.5%', color: 'text-blue-500' },
                  { label: 'Popular Time', val: 'Sat 10am', color: 'text-orange-500' },
                ].map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{s.label}</span>
                    <span className={cn("font-black", s.color)}>{s.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings / WhatsApp Management */}
        <section className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-soft">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Store Settings</h2>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-800">WhatsApp Number</p>
                <p className="text-[10px] font-bold text-gray-400">+220 333 4444</p>
              </div>
            </div>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest">Update</button>
          </div>
        </section>
      </main>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-[480px] bg-white rounded-t-[48px] overflow-hidden flex flex-col max-h-[95vh]"
            >
              <div className="p-8 pb-4 flex justify-between items-center border-b border-gray-50">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="p-8 overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {/* Image Upload Simulation */}
                  <div className="aspect-video bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 group hover:border-primary/30 transition-colors cursor-pointer overflow-hidden relative">
                    {editingProduct ? (
                      <img src={editingProduct.image} className="w-full h-full object-cover opacity-50" />
                    ) : <ImageIcon size={32} />}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm">Upload Product Image</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Product Name</label>
                      <input
                        required
                        type="text"
                        defaultValue={editingProduct?.name || ''}
                        placeholder="e.g. Fresh Red Tomatoes"
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Price (D)</label>
                        <input
                          required
                          type="number"
                          defaultValue={editingProduct?.price || ''}
                          placeholder="0"
                          className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Initial Stock</label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. 50kg"
                          className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Tell buyers about your product's freshness..."
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all mt-4 mb-8"
                  >
                    {editingProduct ? 'Save Changes' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
