import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode: string;
  timestamp: string;
  currency: 'USD' | 'EUR' | 'JPY';
  method: 'whatsapp' | 'stripe' | 'direct';
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  promoCode: string;
  discountPercent: number;
  discountAmount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  totalItemsCount: number;
  currency: 'USD' | 'EUR' | 'JPY';
  setCurrency: (c: 'USD' | 'EUR' | 'JPY') => void;
  formatPrice: (usdAmount: number) => string;
  isZeroGravity: boolean;
  toggleGravity: () => void;
  setGravity: (val: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  orderCompleted: OrderDetails | null;
  setOrderCompleted: (order: OrderDetails | null) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'orbit_designer_cart_v2';
const FREE_SHIPPING_THRESHOLD_USD = 200;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isZeroGravity, setIsZeroGravity] = useState<boolean>(true);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'JPY'>('USD');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [orderCompleted, setOrderCompleted] = useState<OrderDetails | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getIsMuted());

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // storage safety
    }
  }, [cart]);

  const openCart = () => {
    sounds.playClick();
    setIsCartOpen(true);
  };

  const closeCart = () => {
    sounds.playClick();
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    sounds.playClick();
    setIsCartOpen(prev => !prev);
  };

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const toggleGravity = () => {
    const next = !isZeroGravity;
    setIsZeroGravity(next);
    sounds.playGravitySwitch(next);
  };

  const setGravity = (val: boolean) => {
    setIsZeroGravity(val);
    sounds.playGravitySwitch(val);
  };

  const formatPrice = (usd: number): string => {
    if (currency === 'EUR') {
      return `€${Math.round(usd * 0.92)}`;
    }
    if (currency === 'JPY') {
      return `¥${(Math.round(usd * 155)).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const addToCart = (product: Product, size: string, quantity = 1) => {
    sounds.playAddToCart();
    setCart(prev => {
      const index = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    sounds.playClick();
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    sounds.playClick();
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'GRAVITY20') {
      setPromoCode('GRAVITY20');
      setDiscountPercent(20);
      sounds.playSuccess();

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#3B82F6', '#60A5FA', '#F8FAFC']
        });
      } catch {
        // Confetti fallback
      }

      return {
        success: true,
        message: 'PROMO CODE VALIDATED: 20% DISCOUNT APPLIED.'
      };
    } else {
      sounds.playError();
      return {
        success: false,
        message: 'INVALID CODE. USE "GRAVITY20" FOR 20% OFF.'
      };
    }
  };

  const removePromoCode = () => {
    sounds.playClick();
    setPromoCode('');
    setDiscountPercent(0);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD_USD ? 15 : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        discountPercent,
        discountAmount,
        applyPromoCode,
        removePromoCode,
        subtotal,
        shipping,
        total,
        totalItemsCount,
        currency,
        setCurrency,
        formatPrice,
        isZeroGravity,
        toggleGravity,
        setGravity,
        quickViewProduct,
        setQuickViewProduct,
        orderCompleted,
        setOrderCompleted,
        isMuted,
        toggleMute
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
