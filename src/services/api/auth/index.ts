import { protectedApiClient } from "..";
import {
  ChangePasswordPayload,
  LoginData,
  LoginPayload,
  RegisterData,
  RegisterPayload,
  RequestResetPasswordPayload,
  ResetPasswordPayload,
  VerifyData,
  VerifyEmailPayload,
} from "./type";

export const authApi = {
  login(payload: LoginPayload) {
    return protectedApiClient<BaseResponse<LoginData>>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  register(payload: RegisterPayload) {
    return protectedApiClient<BaseResponse<RegisterData>>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  verify(payload: VerifyEmailPayload) {
    return protectedApiClient<BaseResponse<VerifyData>>("/auth/confirm-email", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  logout() {
    return protectedApiClient("/auth/logout");
  },
  changePassword(payload: ChangePasswordPayload) {
    return protectedApiClient<BaseResponse>("/user/password", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
  requestResetPassword(payload: RequestResetPasswordPayload) {
    return protectedApiClient<BaseResponse>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  resetPassword(payload: ResetPasswordPayload) {
    return protectedApiClient<BaseResponse>("/auth/reset-password", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};

export type {
  LoginData,
  LoginPayload,
  RegisterData,
  RegisterPayload,
  VerifyEmailPayload,
  ChangePasswordPayload,
  RequestResetPasswordPayload,
  ResetPasswordPayload,
};
