"use server";

import { authApi, RegisterPayload } from "@/services/api";
import { cookies } from "next/headers";

export const register = async (payload: RegisterPayload) => {
  const data = await authApi.register(payload);
  if (data.statusCode === 200 && data.data?.accessToken) {
    delete data.data;
  }
  return data;
};
