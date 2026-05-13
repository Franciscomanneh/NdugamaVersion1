'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShieldAlert, CheckCircle2, Clock, Truck, Package, ShoppingBag } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const router = useRouter();
  const { orders, updateOrderStatus } = useAppContext();

  const statusOptions: ('Order Received' | 'Shopping In Progress' | 'Out For Delivery' | 'Delivered')[] = [
    'Order Received',
    'Shopping In Progress',
    'Out For Delivery',
    'Delivered'
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <header className="bg-white px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-500 rounded-full border border-red-100">
          <ShieldAlert size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Simulator</span>
        </div>
      </header>

      <main className="p-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Live Order Management</h2>

          {orders.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-[40px] border border-dashed border-gray-200">
              <Package className="text-gray-200" size={48} />
              <p className="text-gray-400 font-bold">No orders to manage yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-soft">
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
              ))}
            </div>
          )}
        </section>

        <section className="bg-primary/10 p-8 rounded-[40px] flex flex-col gap-4 border border-primary/10">
          <div className="flex items-center gap-3 text-primary">
            <ShieldAlert size={24} />
            <h2 className="text-xl font-black">Admin Simulator</h2>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            This panel simulates the internal Dugama Dashboard. Changing order statuses here will update the tracking view for the customer in real-time.
          </p>
        </section>
      </main>
    </div>
  );
}
