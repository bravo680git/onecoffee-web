"use server";

import { ServerError } from "@/config/response";
import { authApi } from "@/services/api";
import { cookies } from "next/headers";

export const verify = async (idToken: string) => {
  try {
    const data = await authApi.verify({ token: idToken });
    if (data?.statusCode === 200 && data.data?.accessToken) {
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
