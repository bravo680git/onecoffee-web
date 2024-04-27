"use client";

import { updateCart } from "@/app/action";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import Button from "@/components/Button";
import { useMessage } from "@/components/Message";
import { path } from "@/config/path";
import { ProductType } from "@/services/api/public/type";
import { useCartStore } from "@/store/cart";
import { useCheckoutStore } from "@/store/checkout";
import { transformCurrency } from "@/utils/functions";
import clsx from "clsx";
import { Add, Minus } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ProductPrice({ data }: { data: ProductType }) {
  const { push } = useRouter();
  const { msgApi, msgCtxHoler } = useMessage();
  const { items: cartItems, setItemCount, setItems } = useCartStore();
  const setCheckoutItems = useCheckoutStore((state) => state.setItems);
  const { checkLoginModalCtxHolder, handleCheckLogin } = useCheckLogin();

  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState<string[]>([]);
  const [price, setPrice] = useState(data.price || data.minPrice);
  const [selectedVariantId, setSelectedVariantId] = useState<number>();
  const [updateCartLoading, setUpdateCartLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const handleSelectVariant = (value: string, index: number) => {
    const newVariants = [...variants];
    newVariants[index] = value;
    setVariants(newVariants);

    data.variants?.some((variant) => {
      if (newVariants.join("") === variant.values.join("")) {
        setPrice(variant.price);
        setSelectedVariantId(variant.id);
        return true;
      }
    });
  };

  const canConduct = async (setLoading: (v: boolean) => void) => {
    if (!(await handleCheckLogin(setLoading))) {
      return false;
    }

    if (
      data.variantProps?.length &&
      data.variants?.length &&
      !selectedVariantId
    ) {
      msgApi.error({
        message: "Vui lòng chọn một phân loại cho sản phẩm",
      });
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    setPurchaseLoading(true);
    if (!(await canConduct(setPurchaseLoading))) {
      setPurchaseLoading(false);
      return;
    }

    setCheckoutItems([
      {
        productId: data.id,
        quantity,
        variantId: selectedVariantId,
        variant: data.variants?.find((item) => item.id === selectedVariantId),
        product: data,
        id: 0,
      },
    ]);
    push(path.checkout);
  };

  const handleUpdateCart = async () => {
    setUpdateCartLoading(true);
    if (!(await canConduct(setUpdateCartLoading))) {
      setUpdateCartLoading(false);

      return;
    }

    updateCart({
      productId: data.id,
      quantity,
      variantId: selectedVariantId,
    })
      .then((res) => {
        if (res.statusCode < 400 && res.data) {
          msgApi.success({
            message: "Cập nhật giỏ hàng thành công",
          });

          const filterCartItems = cartItems.filter(
            (item) =>
              item.productId !== data.id &&
              item.variantId !== selectedVariantId,
          );

          filterCartItems.push(res.data.cart);
          setItems(filterCartItems);
          setItemCount(filterCartItems.length);
        } else {
          msgApi.error({
            message: res.message,
          });
        }
      })
      .finally(() => {
        setUpdateCartLoading(false);
      });
  };

  return (
    <>
      {checkLoginModalCtxHolder}
      {msgCtxHoler}
      <div className="mt-5 w-full">
        <span className="text-xl font-bold text-primary-500">
          {transformCurrency(price, data.salePercent)}
        </span>
        <div className="text-neutral-text-secondary">
          {data.salePercent > 0 && (
            <>
              <span className="line-through">
                {transformCurrency(data.price || data.minPrice)}
              </span>
              <span className="ml-2 font-semibold">-{data.salePercent}%</span>
            </>
          )}
        </div>
        <hr className="mt-5 text-neutral-text-secondary" />
        <div className="mt-5 flex flex-col gap-2">
          {data.variantProps?.map((item, index) => (
            <div key={index}>
              <span className="font-semibold text-neutral-text-secondary">
                {item.type}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.values.map((v) => (
                  <button
                    key={v}
                    className={clsx(
                      "ripple rounded-md border border-slate-200 px-3 py-1.5 transition-all duration-300",
                      {
                        "!border-primary-500 shadow-primary":
                          variants[index] === v,
                      },
                    )}
                    onClick={() => handleSelectVariant(v, index)}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-8">
          <span className="font-semibold text-neutral-text-secondary">
            Số lượng
          </span>
          <div className="flex h-8 items-stretch divide-x overflow-hidden rounded-md border border-slate-200">
            <i
              className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary"
              onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}>
              <Minus size={16} />
            </i>
            <span className="px-3 py-1 font-semibold">{quantity}</span>
            <i
              className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary"
              onClick={() => setQuantity(quantity + 1)}>
              <Add size={16} />
            </i>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Button
            type="primary"
            onClick={handleCheckout}
            loading={purchaseLoading}>
            Mua ngay
          </Button>
          <Button
            type="secondary"
            onClick={handleUpdateCart}
            loading={updateCartLoading}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductPrice;
