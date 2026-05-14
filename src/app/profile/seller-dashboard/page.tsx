'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, Plus, Edit, Trash2, ShoppingBag,
  DollarSign, Package, TrendingUp, X, Image as ImageIcon, MessageCircle
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { firebaseService } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerDashboard() {
  const router = useRouter();
  const { user, products } = useAppContext();

  const sellerProducts = products.filter(p => p.sellerId === user?.uid);
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales' | 'stats'>('inventory');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const stats = [
    { label: 'Total Sales', value: 'D12,450', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Orders', value: '28', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Views', value: '1,240', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const [loading, setLoading] = useState(false);
  const [productForm, setProductForm] = useState({
    productName: '',
    price: 0,
    unit: 'kg',
    category: 'Vegetables',
    description: '',
    stockQuantity: '50kg'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProduct) {
        await firebaseService.updateProduct(editingProduct.id, {
          ...productForm,
          sellerId: user?.uid,
          sellerName: user?.fullName
        }, imageFile);
      } else {
        await firebaseService.addProduct({
          ...productForm,
          sellerId: user?.uid,
          sellerName: user?.fullName
        }, imageFile);
      }
      setIsAddModalOpen(false);
      setEditingProduct(null);
      setImageFile(null);
      setProductForm({
        productName: '',
        price: 0,
        unit: 'kg',
        category: 'Vegetables',
        description: '',
        stockQuantity: '50kg'
      });
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
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
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user?.fullName || 'Garden Admin'}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-soft">
          <img
            src={user?.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
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
                    setProductForm({
                        productName: '',
                        price: 0,
                        unit: 'kg',
                        category: 'Vegetables',
                        description: '',
                        stockQuantity: '50kg'
                    });
                    setIsAddModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                  <Plus size={14} /> Add Product
                </button>
              </div>

              {sellerProducts.length === 0 ? (
                  <div className="bg-white rounded-[32px] p-10 text-center border border-dashed border-gray-200">
                      <ShoppingBag className="mx-auto text-gray-200 mb-4" size={48} />
                      <p className="text-gray-400 font-bold">No products yet.</p>
                  </div>
              ) : sellerProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-soft flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={p.imageUrl} alt={p.productName} className="w-16 h-16 rounded-2xl object-cover" />
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm">LIVE</div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-800 tracking-tight">{p.productName}</h3>
                      <p className="text-xs text-primary font-bold">D{p.price} / {p.unit}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[8px] font-black text-gray-400 uppercase bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">Stock: {p.stockQuantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setProductForm({
                          productName: p.productName,
                          price: p.price,
                          unit: p.unit,
                          category: p.category,
                          description: p.description,
                          stockQuantity: p.stockQuantity
                        });
                        setIsAddModalOpen(true);
                      }}
                      className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => firebaseService.deleteProduct(p.id)}
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
              <div className="bg-white rounded-[32px] p-10 text-center border border-dashed border-gray-200">
                  <DollarSign className="mx-auto text-gray-200 mb-4" size={48} />
                  <p className="text-gray-400 font-bold">No sales recorded yet.</p>
              </div>
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
                <p className="text-[10px] font-bold text-gray-400">{user?.phoneNumber || '+220 333 4444'}</p>
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
                  {/* Image Upload */}
                  <label className="aspect-video bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 group hover:border-primary/30 transition-colors cursor-pointer overflow-hidden relative">
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                    ) : editingProduct ? (
                      <img src={editingProduct.imageUrl} alt="Current" className="w-full h-full object-cover opacity-50" />
                    ) : <ImageIcon size={32} />}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm">
                        {imageFile ? 'Change Image' : 'Upload Product Image'}
                      </span>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  </label>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Product Name</label>
                      <input
                        required
                        type="text"
                        value={productForm.productName}
                        onChange={(e) => setProductForm({...productForm, productName: e.target.value})}
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
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: Number(e.target.value)})}
                          placeholder="0"
                          className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Initial Stock</label>
                        <input
                          required
                          type="text"
                          value={productForm.stockQuantity}
                          onChange={(e) => setProductForm({...productForm, stockQuantity: e.target.value})}
                          placeholder="e.g. 50kg"
                          className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                      >
                        <option>Vegetables</option>
                        <option>Fruits</option>
                        <option>Fish</option>
                        <option>Spices</option>
                        <option>Bread</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                      <textarea
                        rows={3}
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        placeholder="Tell buyers about your product's freshness..."
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all mt-4 mb-8 flex items-center justify-center gap-2"
                  >
                    {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
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
