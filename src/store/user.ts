import { UserInfo } from "@/services/api";
import { create } from "zustand";

type UserState = {
  userInfo?: UserInfo;
  setUserInfo(userInfo: UserState["userInfo"]): void;
};

export const useUserStore = create<UserState>((set) => ({
  userInfo: undefined,
  setUserInfo(userInfo) {
    set(() => ({ userInfo }));
  },
}));
