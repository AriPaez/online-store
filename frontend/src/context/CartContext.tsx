"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fd_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("fd_cart", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const addItem = (item: CartItem) => {
    const normalized: CartItem = { ...item, price: Number(item.price), qty: Math.max(1, Number(item.qty) || 1) };
    setItems((prev) => {
      const existing = prev.find((p) => p.id === normalized.id);
      if (existing) return prev.map((p) => (p.id === normalized.id ? { ...p, qty: p.qty + normalized.qty } : p));
      return [...prev, normalized];
    });
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(0, qty) } : p)).filter(p => p.qty > 0));
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((s, it) => s + Number(it.price) * Number(it.qty), 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, total, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
