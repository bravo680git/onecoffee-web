"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMessage } from "@/components/Message";
import { useModal } from "@/components/Modal";
import { path } from "@/config/path";
import { RegisterPayload } from "@/services/api";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkPasswordStrongLevel, validate } from "../helper";
import { register } from "./action";

const msgDist: Record<string, string> = {
  USERNAME_EXISTS: "Email đã được đăng kí, vui lòng dùng email khác",
  CHECK_EMAIL_CONFIRMED:
    "Tài khoản đã được đăng kí, vui lòng kiểm tra hộp thư đến của bạn để xác nhận email",
};

function Register() {
  const { modelApi, modalCtxHoler } = useModal();
  const { msgApi, msgCtxHoler } = useMessage();
  const { push } = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterPayload, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [passwordStrongLevel, setPasswordStrongLevel] = useState(0);

  const handleChangePassword = (value: string) => {
    setPassword(value);
    setPasswordStrongLevel(checkPasswordStrongLevel(value));
  };

  const handleSubmit = () => {
    const valid = validate({ email, password, name }, setErrors, true);
    if (!valid) {
      return;
    }
    setLoading(true);
    register({ email, name, password })
      .then((res) => {
        if (res.statusCode === 201) {
          modelApi.info({
            title: "Xác nhận email để hoàn tất quá trình đăng ký",
            content:
              "Chúng tôi đã gửi cho bạn một email xác nhận, vui lòng kiểm tra và thực hiện xác nhận để hoàn tất quá trình đăng ký.",
            className: "max-w-[600px]",
            async onOk() {
              push(path.home);
            },
          });
        } else if (res.statusCode === 409) {
          setErrors({ email: msgDist.USERNAME_EXISTS });
        } else {
          msgApi.error({
            message: msgDist[res.message],
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Đăng ký";
  }, []);

  return (
    <>
      <div className="mx-auto flex w-full flex-col gap-2 rounded-md bg-neutral-bg-footer/40 p-5 text-white shadow-md">
        <h3 className="text-center text-lg font-semibold">Tạo tài khoản</h3>
        <Input
          value={name}
          onChange={setName}
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          error={errors.name}
          onBlur={() => validate({ name }, setErrors)}
        />
        <Input
          value={email}
          onChange={setEmail}
          label="Email"
          placeholder="Nhập địa chỉ email của bạn"
          error={errors.email}
          onBlur={() => validate({ email }, setErrors)}
          name="email"
          id="email"
        />
        <div>
          <Input
            value={password}
            onChange={handleChangePassword}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            password
            error={errors.password}
            onBlur={() => validate({ password }, setErrors)}
            name="password"
            id="password"
            onEnter={handleSubmit}
          />
          <div className="mt-1 flex h-2 gap-2">
            <div
              className={clsx("h-full grow rounded-md bg-white/10", {
                "!bg-red-500": passwordStrongLevel > 0,
              })}></div>
            <div
              className={clsx("h-full grow rounded-md bg-white/10", {
                "!bg-orange-500": passwordStrongLevel > 1,
              })}></div>
            <div
              className={clsx("h-full grow rounded-md bg-white/10", {
                "!bg-green-500": passwordStrongLevel > 2,
              })}></div>
          </div>
          <p className="mt-2 text-xs text-neutral-text-secondary">
            Nhập mật khẩu từ 8-16 kí tự, có chứa chữ cái viết hoa, chữ số và kí
            tự đặc biệt.
          </p>
        </div>
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Đăng ký
        </Button>
        <p className="text-xs text-secondary-500">
          Bạn đã có tài khoản,{" "}
          <Link className="text-blue-500 hover:underline" href={path.login}>
            Đăng nhập ngay
          </Link>
        </p>
      </div>
      {modalCtxHoler}
      {msgCtxHoler}
    </>
  );
}

export default Register;
