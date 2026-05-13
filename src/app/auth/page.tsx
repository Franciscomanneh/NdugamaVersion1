'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Lock, LogIn, Phone, User, ShieldCheck } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppContext();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAdminLogin) {
      if (phone === 'admin' && password === 'admin123') {
        setUser({
          id: 'admin-id',
          name: 'Dugama Admin',
          phone: 'admin',
          location: 'Banjul',
          role: 'admin'
        });
        router.push('/admin');
        return;
      } else {
        alert('Invalid admin credentials');
        return;
      }
    }

    // Simulate regular user login
    const userData: any = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'Dugama User',
      phone: phone,
      location: 'Serrekunda',
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100',
      role: 'user'
    };
    setUser(userData);
    router.push('/profile');
  };

  return (
    <div className="bg-white min-h-screen pb-20 flex flex-col px-8">
      <header className="pt-12 mb-12">
        <button
          onClick={() => router.push('/')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-8"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-primary/20 mb-6">
          D
        </div>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Welcome to Dugama</h1>
        <p className="text-gray-500 mt-2 font-medium">Fresh market products delivered to your door.</p>
      </header>

      <main>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {isNewUser && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              required
              type={isAdminLogin ? "text" : "tel"}
              placeholder={isAdminLogin ? "Admin Username" : "Phone Number"}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {isAdminLogin && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                required
                type="password"
                placeholder="Admin Password"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
          >
            <LogIn size={20} />
            {isAdminLogin ? 'Admin Login' : (isNewUser ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-4">
          <button
            onClick={() => {
              setIsNewUser(!isNewUser);
              setIsAdminLogin(false);
            }}
            className="text-sm font-bold text-gray-400"
          >
            {isNewUser ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
          <button
            onClick={() => {
              setIsAdminLogin(!isAdminLogin);
              setIsNewUser(false);
            }}
            className="text-sm font-bold text-primary"
          >
            {isAdminLogin ? 'Regular User Login' : 'Admin Login'}
          </button>
        </div>
      </main>

      <footer className="mt-auto pt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Safe & Secure</span>
        </div>
        <p className="text-[10px] text-gray-400 text-center max-w-[200px]">By signing in, you agree to our Terms of Service and Privacy Policy.</p>
      </footer>
    </div>
  );
}
