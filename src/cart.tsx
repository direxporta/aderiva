import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from './data';

export type CartItem = { productIndex: number; size: string; quantity: number };
type CartContextValue = { items: CartItem[]; addItem: (productIndex: number, size: string, quantity: number) => void; updateQuantity: (productIndex: number, size: string, quantity: number) => void; removeItem: (productIndex: number, size: string) => void };
const CartContext = createContext<CartContextValue | null>(null);
const KEY = 'aderiva-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  const value = useMemo(() => ({
    items,
    addItem: (productIndex: number, size: string, quantity: number) => setItems(prev => { const found = prev.find(i => i.productIndex === productIndex && i.size === size); return found ? prev.map(i => i === found ? { ...i, quantity: i.quantity + quantity } : i) : [...prev, { productIndex, size, quantity }]; }),
    updateQuantity: (productIndex: number, size: string, quantity: number) => setItems(prev => quantity <= 0 ? prev.filter(i => !(i.productIndex === productIndex && i.size === size)) : prev.map(i => i.productIndex === productIndex && i.size === size ? { ...i, quantity } : i)),
    removeItem: (productIndex: number, size: string) => setItems(prev => prev.filter(i => !(i.productIndex === productIndex && i.size === size))),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error('useCart must be used inside CartProvider'); return value; }
export function getCartProducts(items: CartItem[], products: Product[]) { return items.map(item => ({ ...item, product: products[item.productIndex] })).filter(item => item.product); }
