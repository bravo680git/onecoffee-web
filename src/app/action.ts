"use server";

import { ServerError } from "@/config/response";
import { UpdateCartItemPayload, protectedApi } from "@/services/api";
import { cookies } from "next/headers";

export const checkLogin = async () => {
  const token = cookies().get("_token")?.value;
  return !!token;
};

export const updateCart = async (payload: UpdateCartItemPayload) => {
  try {
    const data = await protectedApi.updateCart(payload);
    return data;
  } catch (error) {
    return ServerError;
  }
};

export const getCartItems = async () => {
  try {
    const data = await protectedApi.getCartList();
    return data;
  } catch (error) {
    return ServerError;
  }
};
