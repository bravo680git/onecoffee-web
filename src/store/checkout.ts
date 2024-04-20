import { CartItemType } from "@/services/api";
import { create } from "zustand";

type CheckoutState = {
  items: CartItemType[];
  setItems(items: CartItemType[]): void;
};

export const storageKey = "check-out-items";

export const useCheckoutStore = create<CheckoutState>((set) => ({
  items: [],
  setItems(items) {
    set((state) => ({ ...state, items }));
    localStorage.setItem(storageKey, JSON.stringify(items));
  },
}));
