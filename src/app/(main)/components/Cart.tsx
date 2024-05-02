"use client";

import { getCartItems, updateCart } from "@/app/action";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import Checkbox from "@/components/Checkbox";
import { useModal } from "@/components/Modal";
import { path } from "@/config/path";
import { CartItemType } from "@/services/api";
import { useCartStore } from "@/store/cart";
import { useCheckoutStore } from "@/store/checkout";
import { transformCurrency } from "@/utils/functions";
import clsx from "clsx";
import { Add, ArrowLeft, Minus, ShoppingCart, Trash } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

function Cart() {
  const { push } = useRouter();
  const { modelApi, modalCtxHoler } = useModal();
  const { items, setItems, setItemCount } = useCartStore();
  const { setItems: setCheckoutItems } = useCheckoutStore();
  const { checkLoginModalCtxHolder, handleCheckLogin } = useCheckLogin();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const totalPrice = useMemo(() => {
    return items.reduce((acc, crr) => {
      if (!selectedItems.includes(crr.id)) {
        return acc;
      }
      const price = crr.variant
        ? Number(crr.variant?.price ?? 0)
        : Number(crr.product.price ?? 0);
      return (
        acc + (price * crr.quantity * (100 - crr.product.salePercent)) / 100
      );
    }, 0);
  }, [items, selectedItems]);

  const handleSelectItem = (v: number, all = false) => {
    if (all) {
      if (selectedItems.length === items.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(items.map((item) => item.id));
      }
      return;
    }
    if (selectedItems.includes(v)) {
      setSelectedItems(selectedItems.filter((i) => i !== v));
    } else {
      setSelectedItems([...selectedItems, v]);
    }
  };

  const handleOpenCart = async (e: MouseEvent<HTMLDivElement>) => {
    if (!(await handleCheckLogin())) {
      return;
    }
    e.stopPropagation();
    const crrScrollY = window.scrollY;

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setOpen(true);
    }, crrScrollY / 3);
  };

  const handleCheckout = () => {
    if (!selectedItems.length) {
      modelApi.error({
        title: "Không có sản phẩm",
        content: "Vui lòng chọn sản phẩm để tiến hành đặt hàng",
        async onOk() {},
      });

      return;
    }
    setCheckoutItems(items.filter((item) => selectedItems.includes(item.id)));
    push(path.checkout);
    setOpen(false);
  };

  useEffect(() => {
    getCartItems().then((res) => {
      if (res.data) {
        setItems(res.data.carts);
        setItemCount(res.data.carts.length);
      }
    });

    setMounted(true);

    const handleClose = () => {
      setOpen(false);
    };

    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {modalCtxHoler}
      {checkLoginModalCtxHolder}
      <CartBtn onClick={handleOpenCart} />
      {mounted &&
        createPortal(
          <div
            className={clsx(
              "invisible fixed bottom-0 left-0 right-0 top-0 z-20 bg-black/20 transition-all",
              {
                "!visible": open,
              },
            )}
            data-dialog-open={open}>
            <div
              className={clsx(
                "fixed right-0 top-0 h-full w-0 overflow-hidden bg-white opacity-0 transition-all duration-300",
                {
                  "w-[500px] !opacity-100 sm:w-full": open,
                },
              )}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 p-4 shadow-md">
                <button
                  className="ripple rounded-md text-neutral-text-secondary hover:opacity-80"
                  onClick={() => setOpen(false)}>
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-lg font-bold">Giỏ hàng</h3>
              </div>
              <div className="flex h-[calc(100dvh-176px)] flex-col gap-4 overflow-y-auto p-4">
                {items.map((item, i) => (
                  <CartItem
                    key={i}
                    item={item}
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleSelectItem(item.id)}
                  />
                ))}
              </div>
              <div className="p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between">
                  <Checkbox
                    value={
                      items.length > 0 && selectedItems.length === items.length
                    }
                    onChange={() => handleSelectItem(0, true)}
                    label="Tất cả"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-text-secondary">
                      Tổng thanh toán
                    </span>
                    <span className="text-lg font-bold text-primary-500">
                      {transformCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
                <button
                  className="ripple mt-4 flex w-full items-center justify-center gap-2 rounded-md
                  bg-primary-500 py-2 font-semibold text-white transition-all duration-300 active:shadow-primary"
                  onClick={handleCheckout}>
                  <ShoppingCart />
                  Mua hàng
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

type CartItemProps = {
  checked: boolean;
  onCheckedChange(): void;
  item: CartItemType;
};

function CartItem({ checked, onCheckedChange, item }: CartItemProps) {
  const { setItems, items, setItemCount } = useCartStore();

  const handleUpdateCart = (type: "-" | "+") => {
    let quantity = item.quantity;
    if (type === "-") {
      quantity = quantity === 1 ? 1 : quantity - 1;
    } else {
      quantity++;
    }
    updateCart({
      productId: item.productId,
      variantId: item.variantId,
      quantity,
    }).then((res) => {
      if (res.statusCode < 400) {
        setItems(items.map((c) => (c.id === item.id ? { ...c, quantity } : c)));
      }
    });
  };

  const handleDeleteCart = () => {
    updateCart({
      productId: item.productId,
      variantId: item.variantId,
      quantity: 0,
    }).then((res) => {
      if (res.statusCode < 400) {
        setItems(items.filter((c) => c.id !== item.id));
        setItemCount(items.length - 1);
      }
    });
  };

  return (
    <div className="relative flex items-start gap-4 border-b border-slate-200 pb-4">
      <button className="absolute right-4 top-2" onClick={handleDeleteCart}>
        <Trash size={20} className="text-rose-500 hover:opacity-80" />
      </button>
      <div className="flex shrink-0 items-center gap-1">
        <div className="shrink-0">
          <Checkbox value={checked} onChange={onCheckedChange} />
        </div>
        <div className="relative h-20 w-20 shrink-0">
          <Image src={item.product.images[0]} alt="" fill />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="line-clamp-1 overflow-hidden text-ellipsis text-lg font-semibold">
          {item.product.name}
        </h4>
        {item.variant && (
          <span className="text-neutral-text-secondary">
            Phân loại: {item.variant.values.join(", ")}
          </span>
        )}
        <div className="flex gap-2">
          <span className="font-semibold text-primary-500">
            {transformCurrency(
              item.variant ? item.variant.price : item.product.price,
              item.product.salePercent,
            )}
          </span>
          {item.product.salePercent > 0 && (
            <span className="text-neutral-text-secondary line-through">
              {transformCurrency(
                item.variant ? item.variant.price : item.product.price,
              )}
            </span>
          )}
        </div>
        <div className="mt-2 flex h-8 w-fit items-stretch divide-x overflow-hidden rounded-md border border-slate-200">
          <i
            className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary"
            onClick={() => handleUpdateCart("-")}>
            <Minus size={16} />
          </i>
          <span className="px-3 py-1 font-semibold">{item.quantity}</span>
          <i
            className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary"
            onClick={() => handleUpdateCart("+")}>
            <Add size={16} />
          </i>
        </div>
      </div>
    </div>
  );
}

function CartBtn({
  onClick,
}: {
  onClick(e: MouseEvent<HTMLDivElement>): void;
}) {
  const { itemCount } = useCartStore();

  return (
    <div
      className="relative cursor-pointer transition-all hover:text-primary-500"
      onClick={onClick}>
      <ShoppingCart size={24} />
      <div
        className="absolute right-[-8px] top-[-8px] flex h-4 w-4 items-center
         justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
        {itemCount}
      </div>
    </div>
  );
}

export default Cart;
