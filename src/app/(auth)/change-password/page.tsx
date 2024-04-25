"use client";

import Input from "@/components/Input";
import { ChangePasswordPayload, LoginPayload } from "@/services/api/auth/type";
import clsx from "clsx";
import { NotificationCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { changePassword } from "./action";
import { path } from "@/config/path";
import { validate } from "../helper";
import { useMessage } from "@/components/Message";
import { useRouter } from "next/navigation";
import { logout } from "@/app/action";
import { useUserStore } from "@/store/user";

const MSG = {
  PASSWORD_INCORRECT: "Mật khẩu không đúng",
};

function Login() {
  const { push } = useRouter();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<
    Partial<ChangePasswordPayload & { account: string }>
  >({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    account: "",
  });
  const [loading, setLoading] = useState(false);
  const { msgApi, msgCtxHoler } = useMessage();

  const handleSubmit = async () => {
    if (
      !validate(
        {
          password: oldPassword,
          newPassword,
          confirmNewPassword: confirmPassword,
        },
        setErrors,
        true,
      )
    ) {
      return;
    }
    setLoading(true);

    changePassword({
      password: oldPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    })
      .then(async (res) => {
        if (res.data) {
          await logout();
          msgApi.success({
            message: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
          });
          setTimeout(() => {
            push(path.login);
          }, 800);
          setUserInfo(undefined);
        } else {
          setErrors({ account: MSG.PASSWORD_INCORRECT });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Đổi mật khẩu";
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col gap-2 rounded-md bg-neutral-bg-footer/40 p-5 text-white shadow-md">
      <h3 className="text-center text-lg font-semibold">Đổi mật khẩu</h3>
      <Input
        value={oldPassword}
        onChange={setOldPassword}
        label="Mật khẩu cũ"
        placeholder="Nhập mật khẩu cũ"
        password
        error={errors.password}
        onBlur={() => validate({ password: oldPassword }, setErrors)}
        onEnter={handleSubmit}
      />
      <Input
        value={newPassword}
        onChange={setNewPassword}
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        password
        error={errors.newPassword}
        onBlur={() => validate({ newPassword }, setErrors)}
        onEnter={handleSubmit}
      />
      <Input
        value={confirmPassword}
        onChange={setConfirmPassword}
        label="xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu mới"
        password
        error={errors.confirmNewPassword}
        onBlur={() =>
          validate({ confirmNewPassword: confirmPassword }, setErrors)
        }
        onEnter={handleSubmit}
      />
      <div className="mb-2 text-center text-xs font-semibold text-red-500">
        {errors.account}
      </div>
      <button
        className={clsx(
          "ripple flex items-center justify-center gap-2 rounded-md",
          "bg-primary-500 py-2 font-semibold text-white transition-all duration-300 active:shadow-primary",
          {
            "opacity-80": loading,
          },
        )}
        onClick={handleSubmit}
        disabled={loading}>
        {loading && <NotificationCircle size={20} className="animate-spin" />}
        Đổi mật khẩu
      </button>

      {msgCtxHoler}
    </div>
  );
}

export default Login;
