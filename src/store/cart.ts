"use client";

import { CartItemType } from "@/services/api";
import { create } from "zustand";

type CartState = {
  itemCount: number;
  setItemCount(count: number): void;
  items: CartItemType[];
  setItems(items: CartItemType[]): void;
};

export const useCartStore = create<CartState>((set) => ({
  itemCount: 0,
  setItemCount(count: number) {
    set((state) => ({ ...state, itemCount: count }));
  },

  items: [],
  setItems(items) {
    set((state) => ({ ...state, items }));
  },
}));
