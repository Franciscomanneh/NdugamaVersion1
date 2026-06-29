'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { firebaseService, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'product' | 'bundle';
  ingredients?: any[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: any;
  total: number;
  status: 'Order Received' | 'Shopping In Progress' | 'Out For Delivery' | 'Delivered' | 'Delivered Successfully';
  items: CartItem[];
  deliveryZone: string;
  completedAt?: any;
}

export interface User {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  profileImage?: string;
  role: 'customer' | 'admin' | 'seller';
  createdAt?: any;
}

export interface Product {
  id: string;
  productName: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: string;
  sellerId: string;
  sellerName: string;
  unit: string;
  isFeatured?: boolean;
}

export interface Bundle {
  id: string;
  bundleName: string;
  description: string;
  bundleImage: string;
  ingredients: any[];
  totalPrice: number;
  customizable?: boolean;
  cookingDescription?: string;
}

export interface Seller {
  id: string;
  sellerId: string;
  name: string;
  whatsappNumber: string;
  location: string;
  bio: string;
  profileImage: string;
  approvedStatus: boolean;
  featuredStatus: boolean;
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
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  logout: () => void;

  cart: CartItem[];
  addToCart: (item: any, type: 'product' | 'bundle', quantity?: number, customizedIngredients?: any[]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;

  location: string;
  setLocation: (loc: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;

  products: Product[];
  bundles: Bundle[];
  sellers: Seller[];
  orders: Order[];
  addOrder: (order: any) => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  markOrderCompleted: (id: string) => Promise<void>;

  addresses: Address[];
  addAddress: (addr: Address) => void;
  paymentMethods: PaymentMethod[];
  setDefaultPayment: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [location, setLocationState] = useState('Serrekunda');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', label: 'Home', address: 'House 42, Kairaba Avenue', isDefault: true }
  ]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'Cash', isDefault: true },
    { id: '2', type: 'Wave', isDefault: false },
    { id: '3', type: 'AfriMoney', isDefault: false },
  ]);

  // Auth Listener
  useEffect(() => {
    let unsubUser: () => void = () => {};

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        unsubUser = firebaseService.subscribeToUserData(firebaseUser.uid, (userData) => {
          setUser(userData as User);
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
        unsubUser();
      }
    });
    return () => {
      unsubscribe();
      unsubUser();
    };
  }, []);

  // Data Listeners
  useEffect(() => {
    const unsubProducts = firebaseService.subscribeToProducts((data: any[]) => {
      setProducts(data.map(p => ({
        id: p.id,
        productName: p.productName,
        category: p.category,
        description: p.description,
        price: Number(p.price),
        imageUrl: p.imageUrl,
        stockQuantity: p.stockQuantity,
        sellerId: p.sellerId,
        sellerName: p.sellerName,
        unit: p.unit || 'unit',
        isFeatured: p.isFeatured
      })));
    });

    const unsubBundles = firebaseService.subscribeToBundles((data: any[]) => {
      setBundles(data.map(b => ({
        id: b.id,
        bundleName: b.bundleName,
        description: b.description,
        bundleImage: b.bundleImage,
        ingredients: b.ingredients || [],
        totalPrice: Number(b.totalPrice),
        customizable: b.customizable,
        cookingDescription: b.cookingDescription
      })));
    });

    const unsubSellers = firebaseService.subscribeToSellers((data: any[]) => {
      setSellers(data.map(s => ({
        id: s.id,
        sellerId: s.sellerId,
        name: s.name,
        whatsappNumber: s.whatsappNumber,
        location: s.location,
        bio: s.bio,
        profileImage: s.profileImage,
        approvedStatus: s.approvedStatus,
        featuredStatus: s.featuredStatus
      })));
    });

    return () => {
      unsubProducts();
      unsubBundles();
      unsubSellers();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    const unsubOrders = firebaseService.subscribeToOrders(user.uid, user.role, (data: any[]) => {
      setOrders(data.map(o => ({
        id: o.id,
        customerId: o.customerId,
        customerName: o.customerName,
        date: o.createdAt?.toDate ? o.createdAt.toDate().toLocaleDateString() : 'Just now',
        total: o.totalAmount,
        status: o.deliveryStatus,
        items: o.products,
        deliveryZone: o.deliveryAddress,
        completedAt: o.completedAt
      })));
    });
    return () => unsubOrders();
  }, [user]);

  // Local Storage Persistence for Cart & Favorites
  useEffect(() => {
    const savedCart = localStorage.getItem('dugama_cart');
    const savedFavorites = localStorage.getItem('dugama_favorites');
    const savedLocation = localStorage.getItem('dugama_location');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedLocation) setLocationState(savedLocation);
  }, []);

  useEffect(() => {
    localStorage.setItem('dugama_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dugama_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('dugama_location', location);
  }, [location]);

  // ⚡ Bolt Optimization: Memoized context functions to maintain referential integrity
  // and prevent unnecessary re-renders in consumer components.
  const logout = useCallback(async () => {
    await firebaseService.logoutUser();
  }, []);

  const setLocation = useCallback((loc: string) => {
    setLocationState(loc);
  }, []);

  const addToCart = useCallback((item: any, type: 'product' | 'bundle', quantity: number = 1, customizedIngredients?: any[]) => {
    setCart(prev => {
      if (type === 'product') {
        const existing = prev.find(i => i.id === item.id && i.type === 'product');
        if (existing) {
          return prev.map(i => i.id === item.id && i.type === 'product' ? { ...i, quantity: i.quantity + quantity } : i);
        }
      }
      return [...prev, {
        id: item.id + (type === 'bundle' ? '-' + Math.random().toString(36).substr(2, 5) : ''),
        name: type === 'product' ? item.productName : item.bundleName,
        price: type === 'product' ? item.price : item.totalPrice,
        quantity,
        image: type === 'product' ? item.imageUrl : item.bundleImage,
        type,
        ingredients: customizedIngredients
      }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addOrder = useCallback(async (orderData: any) => {
    await firebaseService.createOrder(orderData);
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: string) => {
    await firebaseService.updateOrderStatus(id, status);
  }, []);

  const markOrderCompleted = useCallback(async (id: string) => {
    await firebaseService.updateOrderStatus(id, "Delivered Successfully");
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const addAddress = useCallback((addr: Address) => setAddresses(prev => [...prev, addr]), []);

  const setDefaultPayment = useCallback((id: string) => {
    setPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
  }, []);

  // ⚡ Bolt Optimization: Memoize the provider value to prevent the entire app
  // from re-rendering whenever unrelated state changes.
  const value = useMemo(() => ({
    user,
    loading,
    isLoggedIn: !!user,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    location,
    setLocation,
    favorites,
    toggleFavorite,
    products,
    bundles,
    sellers,
    orders,
    addOrder,
    updateOrderStatus,
    markOrderCompleted,
    addresses,
    addAddress,
    paymentMethods,
    setDefaultPayment
  }), [
    user,
    loading,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    location,
    setLocation,
    favorites,
    toggleFavorite,
    products,
    bundles,
    sellers,
    orders,
    addOrder,
    updateOrderStatus,
    markOrderCompleted,
    addresses,
    addAddress,
    paymentMethods,
    setDefaultPayment
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
