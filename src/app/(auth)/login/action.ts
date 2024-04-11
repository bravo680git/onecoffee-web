"use server";

import { ServerError } from "@/config/response";
import { authApi, LoginPayload } from "@/services/api";
import { cookies } from "next/headers";

export const login = async (payload: LoginPayload) => {
  try {
    const data = await authApi.login(payload);
    if (data.statusCode === 200 && data.data?.accessToken) {
      cookies().set("_token", data.data?.accessToken);
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
