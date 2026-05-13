'use client';

import React from 'react';
import {
  ClipboardList,
  MapPin,
  CreditCard,
  Store,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  ShieldCheck,
  User as UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, logout, orders } = useAppContext();

  if (!isLoggedIn) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8 text-center pb-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-gray-100 rounded-[32px] flex items-center justify-center text-gray-400 mb-8"
        >
          <UserIcon size={40} />
        </motion.div>
        <h2 className="text-3xl font-black text-gray-800 mb-4 tracking-tight">Sign in for the full experience</h2>
        <p className="text-gray-500 mb-10 leading-relaxed font-medium">
          Access your orders, save multiple addresses, and join our gardening community.
        </p>
        <button
          onClick={() => router.push('/auth')}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  // Admin View
  if (user?.role === 'admin') {
    return (
      <div className="pb-32 bg-gray-50 min-h-screen">
        <div className="px-6 pt-16 pb-12 bg-white flex flex-col items-center rounded-b-[48px] shadow-sm border-b border-orange-100">
          <div className="w-24 h-24 bg-orange-50 rounded-[32px] flex items-center justify-center text-orange-500 mb-6 border-2 border-orange-100 shadow-xl shadow-orange-500/10">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-gray-800">System Admin</h2>
          <p className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">Full Access Control</p>
        </div>

        <div className="px-6 mt-8 flex flex-col gap-4">
          <button
            onClick={() => router.push('/admin')}
            className="w-full p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[40px] text-white shadow-2xl shadow-gray-900/20 group active:scale-95 transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <ShieldCheck size={24} className="text-orange-400" />
              </div>
              <ChevronRight size={24} className="text-white/30 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black mb-1">Admin Dashboard</h3>
              <p className="text-white/60 text-xs font-medium">Manage orders, products, and users</p>
            </div>
          </button>

          <div className="bg-white rounded-[40px] p-2 shadow-soft border border-gray-100 mt-4">
            {[
              { label: 'Orders Management', icon: ClipboardList, href: '/admin?tab=orders', color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Product Management', icon: Store, href: '/admin?tab=products', color: 'text-green-500', bg: 'bg-green-50' },
              { label: 'Donation Management', icon: CreditCard, href: '/admin?tab=donations', color: 'text-purple-500', bg: 'bg-purple-50' },
              { label: 'Seller Approval', icon: ShieldCheck, href: '/admin?tab=gardeners', color: 'text-orange-500', bg: 'bg-orange-50' },
            ].map((item, index, arr) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center justify-between p-4 hover:bg-gray-50 rounded-[24px] group transition-all",
                  index !== arr.length - 1 ? "mb-1" : ""
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", item.bg, item.color)}>
                    <item.icon size={22} />
                  </div>
                  <span className="font-black text-gray-700 tracking-tight">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="flex items-center justify-center gap-4 p-6 bg-white border border-gray-100 rounded-[32px] mt-6 active:bg-red-50 group transition-all shadow-soft"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shadow-sm group-active:scale-90 transition-transform">
              <LogOut size={20} />
            </div>
            <span className="font-black text-red-500 uppercase tracking-widest text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'My Orders', icon: ClipboardList, href: '/orders', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'My Addresses', icon: MapPin, href: '/profile/addresses', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Payment Methods', icon: CreditCard, href: '/profile/payment-methods', color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Become a Seller', icon: Store, href: '/gardener-application', color: 'text-primary', bg: 'bg-green-50', show: user?.role === 'user' && !user?.isApprovedSeller },
    { label: 'Settings', icon: Settings, href: '/profile/settings', color: 'text-gray-500', bg: 'bg-gray-50' },
    { label: 'Privacy Policy', icon: ShieldCheck, href: '/profile/privacy', color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Help & Support', icon: HelpCircle, href: '/profile/help', color: 'text-red-500', bg: 'bg-red-50' },
  ].filter(item => item.show !== false);

  const pendingOrders = orders.filter(o => o.status !== 'Delivered').length;
  const totalSpent = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="px-6 pt-16 pb-12 bg-white flex flex-col items-center rounded-b-[48px] shadow-sm">
        <div className="relative">
          <div className="w-28 h-28 rounded-[32px] overflow-hidden border-4 border-primary/10 shadow-xl">
            <img
              src={user?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl border-4 border-white flex items-center justify-center shadow-lg">
            <Camera size={18} />
          </button>
        </div>
        <h2 className="text-2xl font-black mt-6 tracking-tight">{user?.name}</h2>
        <p className="text-gray-400 font-bold text-sm uppercase tracking-wider">{user?.phone}</p>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-8 mb-10">
        <div className="grid grid-cols-3 gap-4 p-6 bg-primary rounded-[32px] text-white shadow-2xl shadow-primary/20">
          <div className="flex flex-col items-center border-r border-white/20">
            <span className="text-xl font-black">{orders.length}</span>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Orders</span>
          </div>
          <div className="flex flex-col items-center border-r border-white/20">
            <span className="text-xl font-black">{pendingOrders}</span>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Pending</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black">D{(totalSpent/1000).toFixed(1)}k</span>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Spent</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-6 flex flex-col gap-4">
        {(user?.role === 'seller' || user?.isApprovedSeller) && (
          <button
            onClick={() => router.push('/profile/seller-dashboard')}
            className="w-full p-8 bg-gradient-to-br from-primary to-green-700 rounded-[40px] text-white shadow-2xl shadow-primary/20 group active:scale-[0.98] transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Store size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Store size={24} className="text-white" />
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/30">
                  <span className="text-[9px] font-black uppercase tracking-widest">Approved Seller</span>
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black mb-1">Seller Dashboard</h3>
                <p className="text-white/80 text-xs font-medium">Manage products, inventory & sales</p>
              </div>
            </div>
          </button>
        )}

        <div className="bg-white rounded-[40px] p-2 shadow-soft border border-gray-100">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center justify-between p-4 hover:bg-gray-50 rounded-[24px] group transition-all",
                index !== menuItems.length - 1 ? "mb-1" : ""
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", item.bg, item.color)}>
                  <item.icon size={22} />
                </div>
                <span className="font-black text-gray-700 tracking-tight">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>

        <button
          onClick={() => {
            logout();
            router.push('/');
          }}
          className="flex items-center justify-center gap-4 p-6 bg-white border border-gray-100 rounded-[32px] mt-6 active:bg-red-50 group transition-all shadow-soft"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shadow-sm group-active:scale-90 transition-transform">
            <LogOut size={20} />
          </div>
          <span className="font-black text-red-500 uppercase tracking-widest text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
