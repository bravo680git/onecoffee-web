import { protectedApiClient } from "../apiClient";
import { CartItemType, UpdateCartItemPayload } from "./type";

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
};

export type { UpdateCartItemPayload, CartItemType };
