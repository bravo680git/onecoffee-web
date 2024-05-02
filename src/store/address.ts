import { AddressItemType } from "@/services/api";
import { create } from "zustand";

type AddressState = {
  items: AddressItemType[];
  setItems(items: AddressState["items"]): void;
  selectedItem?: AddressItemType;
  setSelectedItem(v: AddressItemType): void;
};

export const storageKey = "selected-address-item-id";

export const useAddressStore = create<AddressState>((set) => ({
  items: [],
  setItems(items) {
    set(() => ({ items }));
  },
  selectedItem: undefined,
  setSelectedItem(v) {
    localStorage.setItem(storageKey, v.id.toString());
    set(() => ({ selectedItem: v }));
  },
}));
