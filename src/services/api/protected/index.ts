import { protectedApiClient } from "../apiClient";
import {
  AddressItemType,
  CartItemType,
  CreateAddressPayload,
  CreateOrderPayload,
  CreateRatePayload,
  UpdateCartItemPayload,
  UpdateUserInfoPayload,
  UploadResponse,
  UserInfo,
} from "./type";

export const protectedApi = {
  updateCart(payload: UpdateCartItemPayload) {
    return protectedApiClient<BaseResponse<{ cart: CartItemType }>>(
      "/user/cart",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
  },
  getCartList() {
    return protectedApiClient<BaseResponse<{ carts: CartItemType[] }>>(
      "/user/cart",
    );
  },
  createAddress(payload: CreateAddressPayload) {
    return protectedApiClient<BaseResponse<{ address: AddressItemType }>>(
      "/user/address",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
  },
  getAddressList() {
    return protectedApiClient<
      BaseResponse<{
        addresses: AddressItemType[];
      }>
    >("/user/address");
  },
  getUserInfo() {
    return protectedApiClient<BaseResponse<{ user: UserInfo }>>("/user");
  },
  updateUserInfo(payload: UpdateUserInfoPayload) {
    return protectedApiClient<BaseResponse<{ user: UserInfo }>>("/user", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
  deleteAddress(id: number) {
    return protectedApiClient<BaseResponse>(`/user/address/${id}`, {
      method: "DELETE",
    });
  },
  createOrder(payload: CreateOrderPayload) {
    return protectedApiClient<BaseResponse>("/user/order", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  createRate(payload: CreateRatePayload) {
    return protectedApiClient<BaseResponse>("/user/rate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  upload(formData: FormData) {
    return protectedApiClient<BaseResponse<UploadResponse>>("/user/upload", {
      method: "POST",
      body: formData,
    });
  },
};

export type {
  AddressItemType,
  CartItemType,
  CreateAddressPayload,
  CreateOrderPayload,
  CreateRatePayload,
  UpdateCartItemPayload,
  UpdateUserInfoPayload,
  UserInfo,
};
