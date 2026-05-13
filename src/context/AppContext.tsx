'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Bundle } from '@/data/mock';
import { firebaseService } from '@/lib/firebase';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'product' | 'bundle';
  ingredients?: any[]; // For bundles
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Order Received' | 'Shopping In Progress' | 'Out For Delivery' | 'Delivered';
  items: CartItem[];
  deliveryZone: string;
  completedAt?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  image?: string;
  role: 'user' | 'admin' | 'seller';
  isApprovedSeller?: boolean;
}

interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'Cash' | 'Wave' | 'AfriMoney' | 'QMoney';
  isDefault: boolean;
}

interface AppContextType {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Product | Bundle, type: 'product' | 'bundle', quantity?: number, customizedIngredients?: any[]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;

  // Location & Preferences
  location: string;
  setLocation: (loc: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  completeOrder: (id: string) => void;
  markOrderCompleted: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;

  // Profile data
  addresses: Address[];
  addAddress: (addr: Address) => void;
  paymentMethods: PaymentMethod[];
  setDefaultPayment: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [location, setLocation] = useState('Serrekunda');
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', label: 'Home', address: 'House 42, Kairaba Avenue', isDefault: true }
  ]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'Cash', isDefault: true },
    { id: '2', type: 'Wave', isDefault: false },
    { id: '3', type: 'AfriMoney', isDefault: false },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dugama_user');
    const savedCart = localStorage.getItem('dugama_cart');
    const savedLocation = localStorage.getItem('dugama_location');
    const savedOrders = localStorage.getItem('dugama_orders');
    const savedFavorites = localStorage.getItem('dugama_favorites');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedLocation) setLocation(savedLocation);
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('dugama_user', JSON.stringify(user));
    else localStorage.removeItem('dugama_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dugama_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dugama_location', location);
  }, [location]);

  useEffect(() => {
    localStorage.setItem('dugama_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dugama_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const logout = () => {
    setUser(null);
    // Maybe not clear cart on logout for better UX?
  };

  const addToCart = (item: Product | Bundle, type: 'product' | 'bundle', quantity: number = 1, customizedIngredients?: any[]) => {
    setCart(prev => {
      // For products, we check if it already exists to update quantity
      if (type === 'product') {
        const existing = prev.find(i => i.id === item.id && i.type === 'product');
        if (existing) {
          return prev.map(i => i.id === item.id && i.type === 'product' ? { ...i, quantity: i.quantity + quantity } : i);
        }
      }
      // For bundles, or new products, add new item
      return [...prev, {
        id: item.id + (type === 'bundle' ? '-' + Math.random().toString(36).substr(2, 5) : ''), // unique ID for customized bundles
        name: item.name,
        price: item.price,
        quantity,
        image: item.image,
        type,
        ingredients: customizedIngredients
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    firebaseService.saveOrder(order);
  };

  const completeOrder = (id: string) => {
    setOrders(prev => {
      const newOrders = prev.map(o => o.id === id ? {
        ...o,
        status: 'Delivered' as const,
      } : o);
      localStorage.setItem('dugama_orders', JSON.stringify(newOrders));
      firebaseService.updateOrderStatus(id, 'Delivered');
      return newOrders;
    });
  };

  const markOrderCompleted = (id: string) => {
    setOrders(prev => {
      const newOrders = prev.map(o => o.id === id ? {
        ...o,
        status: 'Delivered' as const,
        completedAt: new Date().toLocaleString()
      } : o);
      localStorage.setItem('dugama_orders', JSON.stringify(newOrders));
      firebaseService.updateOrderStatus(id, 'Delivered (Buyer Confirmed)');
      return newOrders;
    });
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    firebaseService.updateOrderStatus(id, status);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const addAddress = (addr: Address) => setAddresses(prev => [...prev, addr]);

  const setDefaultPayment = (id: string) => {
    setPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
  };

  return (
    <AppContext.Provider value={{
      user, setUser, isLoggedIn: !!user, logout,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      location, setLocation,
      orders, addOrder, completeOrder, markOrderCompleted, updateOrderStatus,
      favorites, toggleFavorite,
      addresses, addAddress,
      paymentMethods, setDefaultPayment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
