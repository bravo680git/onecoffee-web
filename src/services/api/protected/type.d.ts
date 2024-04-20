import { ProductType } from "../public/type";

export type UpdateCartItemPayload = {
  productId: number;
  variantId?: number;
  quantity: number;
};

type CartItemType = {
  id: number;
  productId: number;
  variantId?: number;
  quantity: number;
  product: ProductType;
  variant?: NonNullable<ProductType["variants"]>[number];
};
