import { ORDER_STATUS } from "@/app/(main)/orders/constants";
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

type CreateAddressPayload = {
  name: string;
  phone: string;
  address: string;
  province: string;
  provinceCode: number;
  district: string;
  districtCode: number;
  ward: string;
  wardCode: number;
  zipCode: string;
  type: string;
};

type AddressItemType = {
  id: number;
} & CreateAddressPayload;

type UserInfo = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  addressId?: number;
};

type UpdateUserInfoPayload = {
  name: string;
  addressId?: number;
  avatar?: string;
};

type CreateOrderPayload = {
  addressId: number;
  note: string;
  orderItems: {
    productId: number;
    quantity: number;
    variantId?: number;
  }[];
};

type CreateRatePayload = {
  rating: number;
  comment: string;
  productId: number;
  variantId?: number;
};

type UploadResponse = {
  image: {
    name: string;
    url: string;
  };
};

type OrderItemType = {
  id: number;
  status: ORDER_STATUS;
  totalPrice: number;
  note: string;
  reason?: string;
  createdAt: string;
  updatedAt: string;
  address: AddressItemType;
  orderDetails: Omit<CartItemType, ["productId", "variantId"]>[];
};
