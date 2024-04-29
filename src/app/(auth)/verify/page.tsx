"use client";

import { NotificationCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { verify } from "./action";
import { useMessage } from "@/components/Message";
import { useRouter } from "next/navigation";
import { path } from "@/config/path";

const MSG_DIST: Record<string, string> = {
  EMAIL_CONFIRMED: "Email đã được xác nhận",
};

function VerifyPage({ searchParams }: PageProps<[], ["token-id"]>) {
  const idToken = searchParams["token-id"];

  const { msgApi, msgCtxHoler } = useMessage();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Xác thực email";
    setLoading(true);

    verify(idToken)
      .then((res) => {
        if (res.data) {
          msgApi.success({
            message: "Xác thực thành công",
          });
          setTimeout(() => {
            push(path.home);
          }, 1000);
        } else {
          msgApi.error({
            message: MSG_DIST[res.message],
          });

          setTimeout(() => {
            push(path.home);
          }, 1000);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "Xác nhận tài khoản";
  }, []);

  return (
    <>
      {loading && (
        <div className="mx-auto flex w-full flex-col gap-2 rounded-md bg-neutral-bg-footer/40 p-5 text-white shadow-md">
          <div className="flex flex-col items-center justify-center gap-4">
            <NotificationCircle className="animate-spin" size={60} />
            <h3 className="text-center text-lg font-semibold">
              Đang xác thực...
            </h3>
          </div>
        </div>
      )}
      {msgCtxHoler}
    </>
  );
}

export default VerifyPage;
