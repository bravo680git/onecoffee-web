"use server";

import { ServerError } from "@/config/response";
import { authApi, ChangePasswordPayload } from "@/services/api";

export const changePassword = async (payload: ChangePasswordPayload) => {
  try {
    const data = await authApi.changePassword(payload);
    return data;
  } catch (error) {
    return ServerError;
  }
};
