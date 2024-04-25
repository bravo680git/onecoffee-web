"use server";

import { ServerError } from "@/config/response";
import { RequestResetPasswordPayload, authApi } from "@/services/api";

export const requestResetPassword = async (
  payload: RequestResetPasswordPayload,
) => {
  try {
    return await authApi.requestResetPassword(payload);
  } catch (error) {
    return ServerError;
  }
};
