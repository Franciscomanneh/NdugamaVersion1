'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChevronLeft, Clock, Package, ShoppingBag, Users, DollarSign, Plus, Edit, Trash2, X, Eye, ShieldCheck
} from 'lucide-react';
import { useAppContext, Order } from '@/context/AppContext';
import { firebaseService } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function AdminDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as 'orders' | 'gardeners' | 'products' | 'donations' | null;
  const { orders, updateOrderStatus, products: appProducts } = useAppContext();
  const [activeTab, setActiveTab] = useState<'orders' | 'gardeners' | 'products' | 'donations'>(tabParam || 'orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [pendingApps, setPendingApps] = useState<any[]>([]);
  const [donations] = useState<any[]>([]);

  React.useEffect(() => {
    const unsubApps = firebaseService.subscribeToSellerApplications((data: any[]) => {
      setPendingApps(data);
    });
    return () => unsubApps();
  }, []);

  const handleApprove = async (app: any) => {
    await firebaseService.approveSeller(app.id, app.userId);
  };

  const statusOptions: Order['status'][] = [
    'Order Received',
    'Shopping In Progress',
    'Out For Delivery',
    'Delivered Successfully'
  ];

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Active', value: orders.filter(o => o.status !== 'Delivered Successfully').length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Pending Apps', value: pendingApps.length, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Donations', value: 'D' + donations.reduce((acc, d) => acc + d.amount, 0), icon: DollarSign, color: 'text-red-500', bg: 'bg-red-50' },
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
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Live Control</span>
        </div>
      </header>

      <main className="p-6 flex flex-col gap-8">
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

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Live Order Management</h2>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">{orders.length} Total</span>
                </div>
                {orders.length === 0 ? <EmptyState icon={Package} text="No orders to manage yet." /> : orders.map((order) => (
                  <OrderCard key={order.id} order={order} statusOptions={statusOptions} updateOrderStatus={updateOrderStatus} onView={() => setSelectedOrder(order)} />
                ))}
              </motion.div>
            )}

            {activeTab === 'gardeners' && (
              <motion.div key="gardeners" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pending Applications</h2>
                {pendingApps.length === 0 ? <EmptyState icon={Users} text="No pending applications." /> : pendingApps.map((app) => (
                  <div key={app.id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-soft">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={app.gardenImages?.[0] || "https://images.unsplash.com/photo-1590779033100-9f60705a453d?auto=format&fit=crop&q=80&w=200"} alt="Garden" className="w-12 h-12 rounded-2xl object-cover" />
                      <div>
                        <h3 className="font-black text-gray-800 tracking-tight">{app.applicantName}</h3>
                        <p className="text-xs text-gray-400 font-bold">{app.location} • {app.whatsappNumber}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(app)} className="flex-1 py-3 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20">Approve</button>
                      <button onClick={() => {}} className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest">Reject</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Marketplace Inventory</h2>
                  <button onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }} className="flex items-center gap-1 text-primary font-black text-[10px] uppercase tracking-widest"><Plus size={14} /> Add New</button>
                </div>
                {appProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-soft flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={p.imageUrl} alt={p.productName} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-black text-gray-800 text-sm tracking-tight">{p.productName}</h3>
                        <p className="text-[10px] text-primary font-bold">D{p.price} / {p.unit}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }} className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center"><Edit size={14} /></button>
                      <button onClick={() => firebaseService.deleteProduct(p.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'donations' && (
              <motion.div key="donations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Donation History</h2>
                <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft text-center py-20">
                   <DollarSign className="text-gray-200 mx-auto mb-4" size={48} />
                   <p className="text-gray-400 font-bold">Donation records are synced from Wave/AfriMoney.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-[480px] bg-white rounded-t-[48px] overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 pb-4 flex justify-between items-center border-b border-gray-50">
                <div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{selectedOrder.id}</span>
                  <h2 className="text-2xl font-black text-gray-800 tracking-tight">Order Details</h2>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><X size={20} /></button>
              </div>
              <div className="p-8 overflow-y-auto">
                <div className="flex flex-col gap-6">
                  <div className="bg-gray-50 p-6 rounded-[32px] flex flex-col gap-4 border border-gray-100 shadow-inner">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm"><Users size={24} /></div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</p>
                        <h3 className="font-black text-gray-800">{selectedOrder.customerName}</h3>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Items Summary</h3>
                    <div className="flex flex-col gap-3">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-black text-gray-800 tracking-tight">{item.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-black text-primary">D{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProductModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl overflow-hidden">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-6">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  productName: formData.get('productName'),
                  price: Number(formData.get('price')),
                  unit: formData.get('unit'),
                  category: formData.get('category'),
                  sellerId: 'admin',
                  sellerName: 'Dugama Market',
                  stockQuantity: '100'
                };
                if (editingProduct) {
                  await firebaseService.updateProduct(editingProduct.id, data, null);
                } else {
                  await firebaseService.addProduct({ ...data, imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400' }, null);
                }
                setIsProductModalOpen(false);
              }} className="flex flex-col gap-4">
                <input name="productName" type="text" defaultValue={editingProduct?.productName || ''} placeholder="Product Name" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="price" type="number" defaultValue={editingProduct?.price || ''} placeholder="Price" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20" />
                  <input name="unit" type="text" defaultValue={editingProduct?.unit || 'kg'} placeholder="Unit" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20" />
                </div>
                <select name="category" defaultValue={editingProduct?.category || 'Vegetables'} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Fish</option>
                  <option>Bread</option>
                </select>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setIsProductModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl text-xs font-black uppercase tracking-widest">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">{editingProduct ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminDashboard() {
  return <Suspense fallback={<div>Loading...</div>}><AdminDashboardContent /></Suspense>;
}

function EmptyState({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-[40px] border border-dashed border-gray-200">
      <Icon className="text-gray-200" size={48} />
      <p className="text-gray-400 font-bold">{text}</p>
    </div>
  );
}

function OrderCard({ order, statusOptions, updateOrderStatus, onView }: { order: Order, statusOptions: any[], updateOrderStatus: any, onView: () => void }) {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-soft">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{order.id}</span>
            <span className="text-[8px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">CASH</span>
          </div>
          <h3 className="font-black text-gray-800 tracking-tight">{order.date}</h3>
          <p className="text-xs text-gray-400 font-bold">Total: D{order.total.toFixed(0)} • {order.deliveryZone}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Status</p>
          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
            disabled={order.status === 'Delivered Successfully'}
            className={cn(
              "bg-gray-50 border-none rounded-xl py-2 px-4 text-xs font-black focus:ring-2 focus:ring-primary/20 appearance-none pr-8",
              order.status === 'Delivered Successfully' ? "text-green-500 bg-green-50" : "text-primary"
            )}
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={onView} className="flex-1 py-3 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:bg-gray-100 transition-colors">
          <Eye size={14} /> View Order
        </button>
        {order.completedAt && (
          <div className="flex-[2] py-3 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-green-100">
            <ShieldCheck size={14} /> Completed
          </div>
        )}
      </div>
    </div>
  );
}
