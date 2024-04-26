"use client";

import { useModal } from "@/components/Modal";
import { checkLogin } from "../action";
import { usePathname, useRouter } from "next/navigation";
import { path } from "@/config/path";
import { useNavigationStore } from "@/store/navigation";

export const useCheckLogin = () => {
  const { modelApi, modalCtxHoler } = useModal();
  const { push } = useRouter();
  const pathname = usePathname();
  const { setLoginRedirectRoute } = useNavigationStore();

  const handler = async (setLoading?: (v: boolean) => void) => {
    setLoading?.(true);
    const isLoggedIn = await checkLogin();

    if (!isLoggedIn) {
      setLoading?.(false);
      modelApi.info({
        title: "Đăng nhập để tiếp tục",
        content:
          "Bạn chưa đăng nhập nên chưa thể sử dụng chức năng này, vui lòng đăng nhập",
        okCancel: true,
        async onOk() {
          setLoginRedirectRoute(pathname);
          push(path.login);
        },
      });

      return false;
    }
    return true;
  };

  return { handleCheckLogin: handler, checkLoginModalCtxHolder: modalCtxHoler };
};
