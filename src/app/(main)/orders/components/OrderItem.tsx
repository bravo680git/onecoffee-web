"use client";

import Button from "@/components/Button";
import { OrderItemType } from "@/services/api";
import { transformCurrency } from "@/utils/functions";
import Image from "next/image";
import { ORDER_STATUS_DIST } from "../constants";
import { useRouter } from "next/navigation";
import { path } from "@/config/path";
import Link from "next/link";

function OrderItem({ data }: { data: OrderItemType }) {
  const { push } = useRouter();

  return (
    <div className="rounded-md bg-white p-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div
            style={{
              backgroundColor: ORDER_STATUS_DIST[data.status].color,
            }}
            className="w-fit rounded-full px-4 py-1 text-xs font-semibold text-white">
            {ORDER_STATUS_DIST[data.status].title}
          </div>
          <span className="text-neutral-text-secondary">
            {new Date(data.createdAt).toLocaleString("vi", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
        <p className="mt-2 text-xs">{ORDER_STATUS_DIST[data.status].content}</p>
        <p className="mt-2 text-xs italic text-neutral-text-secondary">
          Cập nhật lúc:{" "}
          {new Date(data.updatedAt).toLocaleString("vi", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>

      <hr className="my-4 text-slate-200" />

      <div className="flex flex-col gap-2">
        {data.orderDetails.map((item, index) => (
          <div className="flex gap-4" key={index}>
            <div className="relative h-20 w-20 overflow-hidden rounded-md">
              <Image src={item.product.images[0]} alt="" fill />
            </div>
            <div className="grow">
              <Link href={`${path.products}/${item.product.slug}`}>
                <h3 className="font-semibold hover:underline">
                  {item.product.name}
                </h3>
              </Link>
              <div className="flex items-center">
                {item.variant && (
                  <p className="text-neutral-text-secondary">
                    Phân loại: {item.variant.values.join(", ")}
                  </p>
                )}
                <div className="ml-auto">
                  <span className="mr-2 text-neutral-text-secondary line-through">
                    {transformCurrency(
                      item.variant ? item.variant.price : item.product.price,
                    )}
                  </span>
                  <span className="font-semibold text-primary-500">
                    {transformCurrency(
                      item.variant ? item.variant.price : item.product.price,
                      item.product.salePercent,
                    )}
                  </span>
                </div>
              </div>
              <span>x{item.quantity}</span>
              <hr className="my-4 text-slate-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2">
        <span>Thành tiền:</span>
        <span className="text-lg font-semibold text-primary-500">
          {transformCurrency(data.totalPrice)}
        </span>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="secondary"
          onClick={() =>
            push(
              `${path.products}/${data.orderDetails[0]?.product?.slug}#reviews`,
            )
          }>
          Đánh giá
        </Button>
      </div>
    </div>
  );
}

export default OrderItem;
