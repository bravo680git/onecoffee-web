"use client";

import Input from "@/components/Input";
import { LoginPayload } from "@/services/api/auth/type";
import clsx from "clsx";
import { NotificationCircle } from "iconsax-react";
import { useState } from "react";
import { login, loginWithGoogle } from "./action";
import Link from "next/link";
import { path } from "@/config/path";
import { validate } from "../helper";
import { useMessage } from "@/components/Message";
import { useRouter } from "next/navigation";
import { useNavigationStore } from "@/store/navigation";
import LoginGGBtn from "./components/LoginGGBtn";
import { CredentialResponse } from "@react-oauth/google";

const MSG = {
  USERNAME_PASSWORD_INCORRECT: "Tài khoản hoặc mật khẩu không đúng",
};

function Login() {
  const { push } = useRouter();
  const { getLoginRedirectRoute } = useNavigationStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<
    Partial<LoginPayload & { account: string }>
  >({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { msgApi, msgCtxHoler } = useMessage();

  const handleSubmit = async () => {
    if (!validate({ email, password }, setErrors)) {
      return;
    }
    setLoading(true);

    login({ email, password })
      .then((res) => {
        if (res.data) {
          msgApi.success({ message: `Xin chào, ${res.data.user.name}` });
          setTimeout(() => {
            push(getLoginRedirectRoute() ?? path.home);
          }, 500);
        } else {
          setErrors({ account: MSG.USERNAME_PASSWORD_INCORRECT });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoginWithGoogle = (res: CredentialResponse) => {
    loginWithGoogle({ token: res.credential ?? "" }).then((res) => {
      if (res.data) {
        msgApi.success({ message: `Xin chào, ${res.data.user.name}` });
        setTimeout(() => {
          push(getLoginRedirectRoute() ?? path.home);
        }, 500);
      } else {
        msgApi.error({
          message: "Có lỗi xảy ra, vui lòng thử lại sau",
        });
      }
    });
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-2 rounded-md bg-neutral-bg-footer/40 p-5 text-white shadow-md">
      <h3 className="text-center text-lg font-semibold">Đăng nhập ứng dụng</h3>
      <Input
        value={email}
        onChange={setEmail}
        label="Email"
        placeholder="Nhập địa chỉ email của bạn"
        error={errors.email}
        onBlur={() => validate({ email }, setErrors)}
        onEnter={handleSubmit}
      />
      <div>
        <Input
          value={password}
          onChange={setPassword}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          password
          error={errors.password}
          onBlur={() => validate({ password }, setErrors)}
          onEnter={handleSubmit}
        />
        <p className="text-right">
          <Link
            className="text-xs text-blue-500 hover:underline"
            href={path.forgetPassword}>
            Quên mật khẩu
          </Link>
        </p>
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
        Đăng nhập
      </button>
      <p className="text-center text-xs text-red-500">{errors.account}</p>
      <p className="text-xs text-secondary-500">
        Chưa có tài khoản,{" "}
        <Link className="text-blue-500 hover:underline" href={path.register}>
          Đăng ký tại đây
        </Link>
      </p>

      <div className="flex items-center gap-2 text-neutral-text-secondary">
        <hr className="grow" />
        <span>Hoặc</span>
        <hr className="grow" />
      </div>
      <div className="w-full">
        <LoginGGBtn onSuccess={handleLoginWithGoogle} />
      </div>
      {msgCtxHoler}
    </div>
  );
}

export default Login;
