"use client";

import Input from "@/components/Input";
import { LoginPayload } from "@/services/api";
import clsx from "clsx";
import { NotificationCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { validate } from "../helper";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<
    Partial<LoginPayload & { account: string }>
  >({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validate({ email }, setErrors)) {
      return;
    }
    setLoading(true);
  };

  useEffect(() => {
    document.title = "Lấy lại mật khẩu";
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col gap-2 rounded-md bg-neutral-bg-footer/40 p-5 text-white shadow-md">
      <h3 className="text-center text-lg font-semibold">Quên mật khẩu</h3>
      <Input
        value={email}
        onChange={setEmail}
        label="Email"
        placeholder="Nhập địa chỉ email của bạn"
        error={errors.email}
        onBlur={() => validate({ email }, setErrors)}
      />
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
        Lấy lại mật khẩu
      </button>
      <p className="text-center text-xs text-red-500">{errors.account}</p>
    </div>
  );
}

export default ForgetPassword;
