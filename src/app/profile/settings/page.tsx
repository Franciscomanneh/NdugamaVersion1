'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Phone, MapPin, Bell, Globe, Trash2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { firebaseService } from '@/lib/firebase';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAppContext();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || ''
  });

  const [notifications, setNotifications] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-[24px] flex items-center justify-center text-gray-400 mb-6">
          <User size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Sign in required</h2>
        <p className="text-sm text-gray-500 mb-8">Please sign in to access settings.</p>
        <button onClick={() => router.push('/auth')} className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Sign In</button>
      </div>
    );
  }

  const handleSave = async () => {
    if (user) {
      await firebaseService.updateUserData(user.uid, formData);
      router.back();
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center justify-between mb-8 sticky top-0 bg-white z-40 pb-2 border-b border-gray-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        </div>
        <button onClick={handleSave} className="text-primary font-black text-sm uppercase tracking-widest">Save</button>
      </header>

      <main className="px-6 flex flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Edit Profile</h2>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                placeholder="Full Name"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                placeholder="Phone Number"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                placeholder="Preferred Location"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">App Preferences</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[24px]">
              <div className="flex items-center gap-4 text-gray-600 font-bold text-sm">
                <Bell size={20} />
                <span>Push Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={cn("w-12 h-6 rounded-full flex items-center px-1 transition-all", notifications ? "bg-primary" : "bg-gray-300")}
              >
                <div className={cn("w-4 h-4 bg-white rounded-full transition-all", notifications ? "translate-x-6" : "translate-x-0")} />
              </button>
            </div>
            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[24px]">
              <div className="flex items-center gap-4 text-gray-600 font-bold text-sm">
                <Globe size={20} />
                <span>App Language</span>
              </div>
              <span className="text-[10px] font-black uppercase text-primary">English</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Actions</h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="flex items-center gap-4 p-5 bg-red-50 text-red-500 rounded-[24px] font-bold text-sm text-left"
            >
              <Trash2 size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </section>

        <div className="flex items-center justify-center gap-3 py-10 opacity-30 grayscale">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">D</div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Dugama v2.0.1</span>
        </div>
      </main>
    </div>
  );
}
