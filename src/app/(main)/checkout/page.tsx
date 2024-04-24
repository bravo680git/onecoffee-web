"use client";

import { useMessage } from "@/components/Message";
import { useModal } from "@/components/Modal";
import { path } from "@/config/path";
import { CartItemType, CreateOrderPayload } from "@/services/api";
import { useAddressStore } from "@/store/address";
import { useCartStore } from "@/store/cart";
import { storageKey, useCheckoutStore } from "@/store/checkout";
import { transformCurrency } from "@/utils/functions";
import clsx from "clsx";
import { Edit2, Moneys, NotificationCircle } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { createOrder } from "./action";
import { OrderAddressListModal } from "./components/OrderAddressModal";

function Checkout() {
  const { items, setItems } = useCheckoutStore();
  const {
    items: cartItems,
    setItems: setCartItems,
    setItemCount,
  } = useCartStore();
  const address = useAddressStore((state) => state.selectedItem);
  const { modalCtxHoler, modelApi } = useModal();
  const { msgApi, msgCtxHoler } = useMessage();
  const { push } = useRouter();

  const [mounted, setMounted] = useState(false);
  const [openOrderAddressModal, setOpenOrderAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const priceTotal = useMemo(() => {
    return items.reduce((acc, crr) => {
      const price = (crr.variant ? crr.variant.price : crr.product.price) ?? 0;
      return (acc += (price * (100 - crr.product.salePercent)) / 100);
    }, 0);
  }, [items]);

  const handleCheckout = () => {
    if (!address) {
      modelApi.error({
        title: "Thiếu địa chỉ nhận hàng",
        content:
          "Vui lòng chọn địa chỉ giao hàng để có thể hoàn thành đơn hàng",
        async onOk() {
          setOpenOrderAddressModal(true);
        },
      });
      return;
    }

    modelApi.info({
      title: "Xác nhận đặt hàng",
      content:
        "Xác nhận đồng ý với chính sách vận chuyển của New3t.com và tiến hành đặt hàng",
      async onOk() {
        const cartIds: number[] = [];
        const payload: CreateOrderPayload = {
          addressId: address.id,
          note,
          orderItems: items.map((item) => {
            cartIds.push(item.id);
            return {
              productId: item.productId,
              quantity: item.quantity,
              variantId: item.variantId,
            };
          }),
        };

        setLoading(true);
        createOrder(payload)
          .then((res) => {
            if (res.statusCode < 400) {
              modelApi.info({
                title: "Đặt hàng thành công",
                content:
                  "Chúng tôi đã nhận được đơn hàng và sẽ tiến hành giao hàng đến bạn sớm nhất.",
                async onOk() {
                  setItems([]);
                  setItemCount(cartItems.length - cartIds.length);
                  setCartItems(
                    cartItems.filter((item) => !cartIds.includes(item.id)),
                  );

                  push(path.home);
                },
              });
            } else {
              msgApi.error({
                message: "Có lỗi xảy ra. Vui lòng thử lại",
              });
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };

  useEffect(() => {
    setMounted(true);
    setItems(JSON.parse(localStorage.getItem(storageKey) ?? "[]"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {msgCtxHoler}
      {modalCtxHoler}
      <div>
        <div className="flex h-[240px] items-end justify-center bg-neutral-bg-footer/90 pb-8">
          {/* <h3 className="text-xl font-bold text-white">Xác nhận đơn hàng</h3> */}
        </div>
        <div className="bg-gray-100">
          <div className="mx-auto flex min-h-[calc(100vh-240px)] max-w-[1200px] gap-5 px-5 py-10 lg:flex-col">
            <div className="flex grow flex-col gap-5">
              <div className="rounded-md bg-white p-4 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  Địa chỉ nhận hàng
                  <i
                    className="ripple cursor-pointer rounded-full p-1 text-neutral-text-secondary hover:opacity-80"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenOrderAddressModal(true);
                    }}>
                    <Edit2 size={16} />
                  </i>
                  {mounted &&
                    createPortal(
                      <OrderAddressListModal
                        onCreated={() => setOpenOrderAddressModal(true)}
                        open={openOrderAddressModal}
                        onClose={() => setOpenOrderAddressModal(false)}
                      />,
                      document.body,
                    )}
                </h3>
                {address ? (
                  <div>
                    <span>{address.name}</span>
                    <span className="ml-4">{address.phone}</span>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <div className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                        {address.type}
                      </div>
                      <span>
                        {`${address.address}-${address.ward}, ${address.district}, ${address.province}`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-neutral-text-secondary">
                    Chưa xác định
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
                {items.map((item, i) => (
                  <PItem
                    key={i}
                    item={item}
                    className={clsx(
                      i !== 0 ? "border-t border-t-slate-200" : "",
                    )}
                  />
                ))}
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  Ghi chú
                </h3>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  maxLength={200}
                  className="block w-full resize-none rounded-md border border-slate-200 px-4 py-2 
                    caret-primary-500 transition-all focus:shadow-primary"
                />
              </div>
            </div>
            <div className="w-[400px] shrink-0 lg:w-full">
              <div className="rounded-md bg-white p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">
                  Phương thức thanh toán
                </h3>
                <div className="ripple mt-4 cursor-pointer rounded-md border border-slate-200 p-4">
                  <div className="mt-3 flex gap-2">
                    <Moneys size={20} className="text-neutral-text-secondary" />
                    <span className="font-semibold">
                      Thanh toán khi nhận hàng
                    </span>
                    <div className="relative ml-auto h-5 w-5 rounded-full bg-blue-500">
                      <div className="absolute left-1/2 top-1/2 aspect-square w-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-white"></div>
                    </div>
                  </div>
                  <p className="mt-4 text-neutral-text-secondary">
                    Thanh toán khi đơn hàng được giao đến bạn
                  </p>
                </div>
                <h3 className="mb-4 mt-5 text-lg font-semibold">
                  Tổng kết đơn hàng
                </h3>
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-text-secondary">
                      Tổng tạm tính
                    </span>
                    <span className="font-semibold">
                      {transformCurrency(priceTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-text-secondary">
                      Phí vận chuyển
                    </span>
                    <span className="font-semibold">
                      {transformCurrency(16000)}
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <span>Tổng cộng</span>
                    <span className="text-lg font-semibold text-primary-500">
                      {transformCurrency(priceTotal + 16000)}
                    </span>
                  </div>
                  <button
                    className="ripple transition- all mt-4 flex w-full items-center
                  justify-center gap-2 rounded-md bg-primary-500 py-2 font-semibold text-white duration-300 active:shadow-primary"
                    onClick={handleCheckout}>
                    {loading && (
                      <NotificationCircle size={20} className="animate-spin" />
                    )}
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PItem({
  className,
  item,
}: {
  className?: string;
  item: CartItemType;
}) {
  return (
    <div className={clsx("flex gap-4 pt-4 sm:flex-wrap sm:gap-0", className)}>
      <div className="relative h-20 w-20 shrink-0">
        <Image src={item.product.images[0]} alt="" fill />
      </div>
      <div className="grow sm:w-[calc(100%-96px)] sm:grow-0">
        <h4 className="font-semibold">{item.product.name}</h4>
        {item.variant && (
          <span className="text-neutral-text-secondary">
            {item.variant.values.join(", ")}
          </span>
        )}
      </div>
      <div className="flex w-36 flex-col sm:w-full sm:flex-row sm:gap-2">
        <span className="text-lg font-bold text-primary-500">
          {transformCurrency(
            item.variant ? item.variant.price : item.product.price,
            item.product.salePercent,
          )}
        </span>
        {item.product.salePercent > 0 && (
          <>
            <span className="text-neutral-text-secondary line-through">
              {transformCurrency(
                item.variant ? item.variant.price : item.product.price,
              )}
            </span>
            <span>-{item.product.salePercent}%</span>
          </>
        )}
      </div>
      <span className="sm:full block w-24 shrink-0">
        Số lượng: <span className="font-bold">{item.quantity}</span>
      </span>
    </div>
  );
}

export default Checkout;
