"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./mockProducts";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try { setItems(JSON.parse(savedCart)); } catch {}
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.product.id === newItem.product.id && i.selectedColor === newItem.selectedColor && i.selectedSize === newItem.selectedSize
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, color?: string, size?: string) => {
    setItems((prevItems) => 
      prevItems.filter(
        (i) => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    setItems((prevItems) => {
      return prevItems.map((i) => {
        if (i.product.id === productId && i.selectedColor === color && i.selectedSize === size) {
          return { ...i, quantity: Math.max(1, quantity) };
        }
        return i;
      });
    });
  };

  const cartTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, isCartOpen, setIsCartOpen, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
