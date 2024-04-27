"use server";

import { ServerError } from "@/config/response";
import {
  UpdateCartItemPayload,
  authApi,
  protectedApi,
  UpdateUserInfoPayload,
} from "@/services/api";
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

export const getUserInfo = async () => {
  try {
    const data = await protectedApi.getUserInfo();
    return data;
  } catch (error) {
    return ServerError;
  }
};

export const logout = async () => {
  try {
    await authApi.logout();
    cookies().delete("_token");
  } catch (error) {
    return ServerError;
  }
};

export const updateUserInfo = async (payload: UpdateUserInfoPayload) => {
  try {
    return await protectedApi.updateUserInfo(payload);
  } catch (error) {
    return ServerError;
  }
};

export const upload = async (formData: FormData) => {
  try {
    return await protectedApi.upload(formData);
  } catch (error) {
    return ServerError;
  }
};
