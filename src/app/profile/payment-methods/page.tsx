'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Wallet, CheckCircle2, Plus, CreditCard, ShieldCheck } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function PaymentMethodsPage() {
  const router = useRouter();
  const { paymentMethods, setDefaultPayment, isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-[24px] flex items-center justify-center text-gray-400 mb-6">
          <Wallet size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Sign in required</h2>
        <p className="text-sm text-gray-500 mb-8">Please sign in to manage your payment methods.</p>
        <button onClick={() => router.push('/auth')} className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Sign In</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="px-6 pt-6 flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Payment Methods</h1>
      </header>

      <main className="px-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Payment Options</h2>
          <div className="flex flex-col gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setDefaultPayment(method.id)}
                className={cn(
                  "p-5 rounded-3xl border-2 transition-all flex items-center justify-between group",
                  method.isDefault ? "border-primary bg-green-50 shadow-lg shadow-primary/5" : "border-gray-100 bg-white"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                    method.isDefault ? "bg-primary text-white" : "bg-gray-50 text-gray-400"
                  )}>
                    {method.type === 'Cash' ? <Wallet size={24} /> : <CreditCard size={24} />}
                  </div>
                  <div className="text-left">
                    <h3 className={cn("font-black text-sm tracking-tight", method.isDefault ? "text-gray-800" : "text-gray-500")}>
                      {method.type}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {method.type === 'Cash' ? 'Pay at Delivery' : 'Digital Wallet'}
                    </p>
                  </div>
                </div>
                {method.isDefault && <CheckCircle2 size={20} className="text-primary" />}
              </button>
            ))}
          </div>
        </section>

        <button className="w-full py-5 border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center gap-3 text-gray-400 font-bold text-sm hover:border-primary/20 hover:text-primary transition-all active:scale-[0.98]">
          <Plus size={20} /> Link New Wallet
        </button>

        <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
          <ShieldCheck className="text-primary" size={20} />
          <p className="text-[10px] font-bold text-gray-400">All transactions are secured and encrypted with Dugama Pay Protection.</p>
        </div>
      </main>
    </div>
  );
}
