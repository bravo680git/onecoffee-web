"use client";

import { useState } from "react";
import { ProductType } from "@/services/api/public/type";
import { transformCurrency } from "@/utils/functions";
import { Add, Minus } from "iconsax-react";
import clsx from "clsx";

function ProductPrice({ data }: { data: ProductType }) {
  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState<string[]>([]);
  const [price, setPrice] = useState(data.price || data.minPrice);

  const handleSelectVariant = (value: string, index: number) => {
    const newVariants = [...variants];
    newVariants[index] = value;
    setVariants(newVariants);

    data.variants?.some((variant) => {
      if (newVariants.join("") === variant.values.join("")) {
        setPrice(variant.price);
        return true;
      }
    });
  };

  return (
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
        <button className="ripple rounded-md bg-primary-500 px-3 py-1.5 font-semibold text-white transition-all active:shadow-primary">
          Mua ngay
        </button>
        <button className="ripple rounded-md bg-secondary-500 px-3 py-1.5 font-semibold text-white transition-all active:shadow-secondary">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default ProductPrice;
