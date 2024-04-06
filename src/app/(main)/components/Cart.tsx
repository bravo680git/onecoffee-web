"use client";

import Checkbox from "@/components/Checkbox";
import { path } from "@/config/path";
import clsx from "clsx";
import { Add, ArrowLeft, Minus, ShoppingCart } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";

function Cart() {
  const { push } = useRouter();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const items = [1, 2, 3, 4];
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectItem = (v: number, all = false) => {
    if (all) {
      if (selectedItems.length === items.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems([...items]);
      }
      return;
    }
    if (selectedItems.includes(v)) {
      setSelectedItems(selectedItems.filter((i) => i !== v));
    } else {
      setSelectedItems([...selectedItems, v]);
    }
  };

  const handleOpenCart = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const crrScrollY = window.scrollY;

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setOpen(true);
    }, crrScrollY / 3);
  };

  useEffect(() => {
    setMounted(true);

    const handleClose = () => {
      setOpen(false);
    };

    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <>
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
              <div className="flex h-[calc(100vh-176px)] flex-col gap-4 overflow-y-auto p-4">
                {[1, 2, 3, 4].map((i) => (
                  <CartItem
                    key={i}
                    checked={selectedItems.includes(i)}
                    onCheckedChange={() => handleSelectItem(i)}
                  />
                ))}
              </div>
              <div className="p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between">
                  <Checkbox
                    value={selectedItems.length === items.length}
                    onChange={() => handleSelectItem(0, true)}
                    label="Tất cả"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-text-secondary">
                      Tổng thanh toán
                    </span>
                    <span className="text-lg font-bold text-primary-500">
                      &#8363;120000
                    </span>
                  </div>
                </div>
                <button
                  className="ripple mt-4 flex w-full items-center justify-center gap-2 rounded-md
                  bg-primary-500 py-2 font-semibold text-white transition-all duration-300 active:shadow-primary"
                  onClick={() => {
                    push(path.checkout);
                    setOpen(false);
                  }}>
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
};

function CartItem({ checked, onCheckedChange }: CartItemProps) {
  return (
    <div className="flex items-start gap-4 border-b border-slate-200 pb-4">
      <div className="flex shrink-0 items-center gap-1">
        <div className="shrink-0">
          <Checkbox value={checked} onChange={onCheckedChange} />
        </div>
        <div className="relative h-20 w-20 shrink-0">
          <Image src="/images/product/apple.png" alt="" fill />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="line-clamp-1 overflow-hidden text-ellipsis text-lg font-semibold">
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
        </h4>
        <span className="text-neutral-text-secondary">Phân loại: Đen, XL</span>
        <div className="flex gap-2">
          <span className="font-semibold text-primary-500">&#8363;130.000</span>
          <span className="text-neutral-text-secondary line-through">
            &#8363;150.000
          </span>
        </div>
        <div className="mt-2 flex h-8 w-fit items-stretch divide-x overflow-hidden rounded-md border border-slate-200">
          <i className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary">
            <Minus size={16} />
          </i>
          <span className="px-3 py-1 font-semibold">2</span>
          <i className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary">
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
  return (
    <div
      className="relative cursor-pointer transition-all hover:text-primary-500"
      onClick={onClick}>
      <ShoppingCart size={24} />
      <div
        className="absolute right-[-8px] top-[-8px] flex h-4 w-4 items-center
         justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
        5
      </div>
    </div>
  );
}

export default Cart;
