import { path } from "@/config/path";
import { ProductType } from "@/services/api/public/type";
import { transformCurrency } from "@/utils/functions";
import { Star1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

function ProductItem({ data }: { data: ProductType }) {
  return (
    <Link
      className="flex w-full cursor-pointer flex-col"
      href={`${path.products}/${data.slug}`}>
      <div className="ripple aspect-[3/2.7] w-full overflow-hidden rounded-md bg-primary-100">
        <div className="relative h-full w-full">
          <Image src={data.images?.[0]} alt="" fill className="object-cover" />
          {data.salePercent > 0 && (
            <div
              className="absolute right-2 top-2 flex h-10 w-10 items-center 
            justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              -{data.salePercent}%
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-5">
        <h3
          className="transition-all\ line-clamp-2 h-14 overflow-hidden text-ellipsis text-lg font-bold
           hover:text-primary-500 hover:underline">
          {data.name}
        </h3>
      </div>
      <div className="flex gap-2">
        <span className="font-semibold text-primary-500">
          {transformCurrency(data.price || data.minPrice, data.salePercent)}
        </span>
        {data.salePercent > 0 && (
          <span className="text-neutral-text-secondary line-through">
            {transformCurrency(data.price || data.minPrice)}
          </span>
        )}
        <div className="ml-auto flex items-center gap-0.5">
          <span>{data.averageRate}</span>
          <Star1 variant="Bold" className="text-secondary-500" size={16} />
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
