"use client";

import React from 'react';
import {
  ClipboardList,
  MapPin,
  CreditCard,
  MessageSquare,
  Store,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'My Orders', icon: ClipboardList, href: '/orders', color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'My Addresses', icon: MapPin, href: '/profile/addresses', color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Payment Methods', icon: CreditCard, href: '/profile/payments', color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Messages', icon: MessageSquare, href: '/profile/messages', color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Become a Seller', icon: Store, href: '/profile/seller', color: 'text-primary', bg: 'bg-green-50' },
  { label: 'Settings', icon: Settings, href: '/profile/settings', color: 'text-gray-500', bg: 'bg-gray-50' },
  { label: 'Help & Support', icon: HelpCircle, href: '/profile/help', color: 'text-red-500', bg: 'bg-red-50' },
];

export default function ProfilePage() {
  return (
    <div className="pb-20">
      {/* Profile Header */}
      <div className="px-6 pt-12 pb-8 bg-white flex flex-col items-center">
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-9 h-9 bg-primary text-white rounded-full border-4 border-white flex items-center justify-center shadow-md">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-black mt-4">Lamin Sarr</h2>
        <p className="text-gray-400 font-medium text-sm">+220 700 0000</p>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4 p-6 bg-primary rounded-3xl text-white shadow-xl shadow-primary/20">
          <div className="flex flex-col items-center border-r border-white/20">
            <span className="text-xl font-black">12</span>
            <span className="text-[10px] font-bold uppercase opacity-70">Orders</span>
          </div>
          <div className="flex flex-col items-center border-r border-white/20">
            <span className="text-xl font-black">4</span>
            <span className="text-[10px] font-bold uppercase opacity-70">Pending</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black">D8.5k</span>
            <span className="text-[10px] font-bold uppercase opacity-70">Spent</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-6 flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-soft group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bg, item.color)}>
                <item.icon size={20} />
              </div>
              <span className="font-bold text-gray-700">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
          </Link>
        ))}

        <button className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-2xl mt-4 active:scale-[0.98] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-500 shadow-sm">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-red-500">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
}
