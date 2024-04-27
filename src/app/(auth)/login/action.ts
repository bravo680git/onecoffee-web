"use server";

import { ServerError } from "@/config/response";
import { authApi, LoginPayload, LoginWithGooglePayload } from "@/services/api";
import { cookies } from "next/headers";

export const login = async (payload: LoginPayload) => {
  try {
    const data = await authApi.login(payload);
    if (data.statusCode < 400 && data.data?.accessToken) {
      cookies().set("_token", data.data.accessToken);
      data.data = {
        user: data.data.user,
        accessToken: "",
        refreshToken: "",
      };
    }
    return data;
  } catch (error) {
    return ServerError;
  }
};

export const loginWithGoogle = async (payload: LoginWithGooglePayload) => {
  try {
    const data = await authApi.loginWithGoogle(payload);
    if (data.statusCode < 400 && data.data?.accessToken) {
      cookies().set("_token", data.data.accessToken);
      data.data = {
        user: data.data.user,
        accessToken: "",
        refreshToken: "",
      };
    }
    return data;
  } catch (error) {
    return ServerError;
  }
};
