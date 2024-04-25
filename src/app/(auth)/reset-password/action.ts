"use server";

import { ServerError } from "@/config/response";
import { ResetPasswordPayload, authApi } from "@/services/api";

export const resetPassword = async (payload: ResetPasswordPayload) => {
  try {
    return await authApi.resetPassword(payload);
  } catch (error) {
    return ServerError;
  }
};
