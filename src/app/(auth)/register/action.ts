"use server";

import { ServerError } from "@/config/response";
import { authApi, RegisterPayload } from "@/services/api";

export const register = async (payload: RegisterPayload) => {
  try {
    const data = await authApi.register(payload);
    if (data.statusCode === 200 && data.data?.accessToken) {
      delete data.data;
    }
    return data;
  } catch (error) {
    return ServerError;
  }
};
