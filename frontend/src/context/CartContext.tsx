'use client';

import { createContext, useContext, useMemo, useReducer } from 'react';
import type { ApiCake, ApiOrderItem, ApiOrderRequest } from '@/lib/api';

export type CartItem = {
  cake: ApiCake;
  quantity: number;
  size?: string;
  flavor?: string;
  message?: string;
};

type State = {
  items: CartItem[];
};

const CartContext = createContext<{
  state: State;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  updateItem: (index: number, updates: Partial<CartItem>) => void;
  total: number;
} | null>(null);

function reducer(state: State, action: { type: string; payload?: unknown; index?: number }) {
  switch (action.type) {
    case 'ADD': {
      const item = action.payload as CartItem;
      const existingIndex = state.items.findIndex((existing) =>
        existing.cake.id === item.cake.id &&
        existing.size === item.size &&
        existing.flavor === item.flavor &&
        existing.message === item.message
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        return { items: updated };
      }
      return { items: [...state.items, item] };
    }
    case 'REMOVE': {
      const index = action.index ?? -1;
      return { items: state.items.filter((_, i) => i !== index) };
    }
    case 'CLEAR':
      return { items: [] };
    case 'UPDATE': {
      const index = action.index ?? -1;
      if (index < 0 || index >= state.items.length) return state;
      const updated = [...state.items];
      updated[index] = { ...updated[index], ...(action.payload as Partial<CartItem>) };
      return { items: updated };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const total = useMemo(
    () =>
      state.items.reduce((sum, item) => sum + item.quantity * Number(item.cake.price ?? 0), 0),
    [state.items]
  );

  const addToCart = (item: CartItem) => dispatch({ type: 'ADD', payload: item });
  const removeFromCart = (index: number) => dispatch({ type: 'REMOVE', index });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const updateItem = (index: number, updates: Partial<CartItem>) =>
    dispatch({ type: 'UPDATE', index, payload: updates });

  const value = useMemo(
    () => ({ state, addToCart, removeFromCart, clearCart, updateItem, total }),
    [state, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function toOrderRequest(userId: number, items: CartItem[], address: string, phone: string, instructions?: string): ApiOrderRequest {
  const apiItems: ApiOrderItem[] = items.map((item) => ({
    cakeId: item.cake.id,
    quantity: item.quantity,
    size: item.size,
    flavor: item.flavor,
    message: item.message,
  }));
  return {
    userId,
    items: apiItems,
    deliveryAddress: address,
    contactPhone: phone,
    specialInstructions: instructions,
  };
}
