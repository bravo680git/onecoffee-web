"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMessage } from "@/components/Message";
import { useModal } from "@/components/Modal";
import { path } from "@/config/path";
import { ResetPasswordPayload } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validate } from "../helper";
import { resetPassword } from "./action";

const MSG = {
  TOKEN_INCORRECT: "Token không hợp lệ, vui lòng yêu cầu cấp mật khẩu lại",
};

function ResetPassword({ searchParams }: PageProps<[], ["token-id"]>) {
  const tokenId = searchParams["token-id"];
  const { push } = useRouter();
  const { modalCtxHoler, modelApi } = useModal();
  const { msgApi, msgCtxHoler } = useMessage();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Partial<ResetPasswordPayload>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !validate(
        { confirmNewPassword: confirmPassword, newPassword },
        setErrors,
        true,
      )
    ) {
      return;
    }
    setLoading(true);
    resetPassword({
      confirmNewPassword: confirmPassword,
      newPassword,
      token: tokenId,
    })
      .then((res) => {
        if (res?.statusCode && res.statusCode < 400) {
          modelApi.info({
            title: "Đặt lại mật khẩu thành công",
            content:
              "Mật khẩu của bạn được đặt lại thành công, vui lòng đăng nhập lại",
            async onOk() {
              push(path.login);
            },
          });
        } else {
          msgApi.error({
            message:
              MSG[res!.message as keyof typeof MSG] ??
              "Có lỗi xảy ra, vui lòng thử lại",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Đặt lại mật khẩu";
  }, []);

  return (
    <>
      {modalCtxHoler}
      {msgCtxHoler}
      <div className="mx-auto flex w-full flex-col gap-2 rounded-md bg-neutral-bg-footer/40 p-5 text-white shadow-md">
        <h3 className="text-center text-lg font-semibold">Đặt lại mật khẩu</h3>
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
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu mới"
          password
          error={errors.confirmNewPassword}
          onBlur={() =>
            validate({ confirmNewPassword: confirmPassword }, setErrors)
          }
          onEnter={handleSubmit}
        />
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Gửi
        </Button>
      </div>
    </>
  );
}

export default ResetPassword;
