'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Bundle } from '@/data/mock';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'product' | 'bundle';
  ingredients?: any[]; // For bundles
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Order Received' | 'Shopping In Progress' | 'Out For Delivery' | 'Delivered';
  items: CartItem[];
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: Product | Bundle, type: 'product' | 'bundle', quantity?: number, customizedIngredients?: any[]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  location: string;
  setLocation: (loc: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  completeOrder: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [location, setLocation] = useState('Serrekunda');
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dugama_cart');
    const savedLocation = localStorage.getItem('dugama_location');
    const savedOrders = localStorage.getItem('dugama_orders');
    const savedFavorites = localStorage.getItem('dugama_favorites');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedLocation) setLocation(savedLocation);
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save to localStorage
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

  const addToCart = (item: Product | Bundle, type: 'product' | 'bundle', quantity: number = 1, customizedIngredients?: any[]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing && type === 'product') {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, {
        id: item.id,
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

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  const completeOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Delivered' } : o));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      location, setLocation,
      orders, addOrder, completeOrder,
      favorites, toggleFavorite
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
