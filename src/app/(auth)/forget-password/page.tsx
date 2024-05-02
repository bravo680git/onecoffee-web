"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMessage } from "@/components/Message";
import { useModal } from "@/components/Modal";
import { path } from "@/config/path";
import { RequestResetPasswordPayload } from "@/services/api";
import clsx from "clsx";
import { NotificationCircle } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validate } from "../helper";
import { requestResetPassword } from "./action";

const MSG = {
  EMAIL_NOT_CONFIRMED: "Địa chỉ email không hợp lệ",
};

function ForgetPassword() {
  const { push } = useRouter();
  const { modalCtxHoler, modelApi } = useModal();
  const { msgApi, msgCtxHoler } = useMessage();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Partial<RequestResetPasswordPayload>>(
    {},
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validate({ email }, setErrors)) {
      return;
    }
    setLoading(true);
    requestResetPassword({ email })
      .then((res) => {
        if (res.statusCode < 400) {
          modelApi.info({
            title: "Gửi yêu cầu đặt lại mật khẩu thành công",
            content:
              "Chúng tôi đã gửi đến bạn email khôi phục mật khẩu, vui lòng kiểm tra hộp thư đến và thực hiện theo hướng dẫn",
            async onOk() {
              setTimeout(() => {
                push(path.home);
              }, 500);
            },
          });
        } else {
          msgApi.error({
            message:
              MSG[res.message as keyof typeof MSG] ??
              "Có lỗi xảy ra, vui lòng thử lại",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Lấy lại mật khẩu";
  }, []);

  return (
    <>
      {modalCtxHoler}
      {msgCtxHoler}
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
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Lấy lại mật khẩu
        </Button>
      </div>
    </>
  );
}

export default ForgetPassword;
