"use client";

import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ClipboardList,
  Plus,
  MoreVertical,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { products, bundles } from '@/data/mock';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Admin Header */}
      <header className="bg-white px-6 pt-12 pb-6 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Dugama Marketplace</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Users size={20} className="text-gray-600" />
        </div>
      </header>

      {/* Nav Tabs */}
      <div className="flex bg-white px-6 border-b border-gray-100">
        {[
          { id: 'overview', icon: LayoutDashboard, label: 'Stats' },
          { id: 'products', icon: ShoppingBag, label: 'Store' },
          { id: 'orders', icon: ClipboardList, label: 'Sales' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 py-4 flex flex-col items-center gap-1 transition-all border-b-2",
              activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-gray-400"
            )}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-bold uppercase">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-soft">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Daily Revenue</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-xl font-black">D12,450</h3>
                  <span className="text-xs font-bold text-green-500 flex items-center">
                    +12% <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-soft">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Orders</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-xl font-black">48</h3>
                  <span className="text-xs font-bold text-primary">New</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h4 className="font-bold mb-4">Live Activity</h4>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div className="flex-1">
                      <p className="text-xs font-bold">New Order #DUG-{8000 + i}</p>
                      <p className="text-[10px] text-gray-400">2 minutes ago • Serrekunda</p>
                    </div>
                    <span className="text-xs font-black text-primary">D450</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input placeholder="Search inventory..." className="w-full bg-white border border-gray-100 rounded-xl py-2 pl-9 pr-4 text-xs font-bold" />
              </div>
              <button className="bg-primary text-white p-2 rounded-xl">
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {products.map((p) => (
                <div key={p.id} className="bg-white p-3 rounded-2xl flex items-center gap-4 border border-gray-100 shadow-soft">
                  <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h5 className="text-xs font-bold">{p.name}</h5>
                    <p className="text-[10px] text-gray-400">Stock: 45 kg • D{p.price}/kg</p>
                  </div>
                  <button className="text-gray-400">
                    <MoreVertical size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">Recent Transactions</h4>
            {products.map((p, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border-l-4 border-l-primary shadow-soft">
                <div>
                  <p className="text-xs font-black">#DUG-782{i}</p>
                  <p className="text-[10px] text-gray-400 font-medium">13 May 2024 • 10:2{i} AM</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-primary">D{p.price * 5}</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase">Paid</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
