"use client";

import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import Button from "@/components/Button";
import { useMessage } from "@/components/Message";
import { ProductType } from "@/services/api/public/type";
import clsx from "clsx";
import { Star1 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createRate, revalidate } from "../action";

export function Rating({ product }: { product: ProductType }) {
  const { checkLoginModalCtxHolder, handleCheckLogin } = useCheckLogin();
  const { msgApi, msgCtxHoler } = useMessage();
  const { refresh } = useRouter();

  const [rate, setRate] = useState(5);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const handleReview = async () => {
    if (!(await handleCheckLogin(setLoading))) {
      return;
    }

    createRate({ comment, productId: product.id, rating: rate })
      .then((res) => {
        if (res?.statusCode && res.statusCode < 400) {
          msgApi.success({
            message: "Thêm đánh giá thành công",
          });
          setRate(5);
          setComment("");
          revalidate(product.slug);
          refresh();
        } else {
          msgApi.error({
            message: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {msgCtxHoler}
      {checkLoginModalCtxHolder}
      <div className="mt-5 w-56 rounded-md border border-slate-200 px-4 py-2">
        <h3 className="mb-2 font-semibold">Đánh giá của bạn</h3>
        <Stars
          v={rate}
          size={30}
          onChange={(v) => {
            setRate(v);
          }}
        />
        <textarea
          className="mt-3 block w-full resize-none rounded-md border border-slate-200 px-3 py-1 
            transition-all duration-300 focus:shadow-primary"
          rows={5}
          placeholder="Nhập nhận xét của bạn về sản phẩm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="mt-3 flex justify-end">
          <Button type="primary" onClick={handleReview} loading={loading}>
            Gửi
          </Button>
        </div>
      </div>
    </>
  );
}

export function Stars({
  v,
  size = 16,
  onChange,
}: {
  v: number;
  onChange?(v: number): void;
  size?: number;
}) {
  const [hoverValue, setHoverValue] = useState<number>();

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star1
          key={i}
          size={size}
          variant="Bulk"
          className={clsx(
            "transition-all duration-300",
            v >= i || (hoverValue ?? 0) >= i
              ? "text-secondary-500"
              : "text-neutral-text-secondary/50",
            {
              "cursor-pointer hover:text-secondary-500": onChange,
            },
          )}
          onClick={onChange ? () => onChange(i) : undefined}
          onMouseOver={() => setHoverValue(i)}
          onMouseOut={() => setHoverValue(undefined)}
        />
      ))}
    </div>
  );
}
