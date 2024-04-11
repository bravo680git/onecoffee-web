import { protectedApiClient } from "..";
import { LoginData, LoginPayload, RegisterData, RegisterPayload } from "./type";

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
};

export type { LoginData, LoginPayload, RegisterData, RegisterPayload };
