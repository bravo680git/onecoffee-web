import { Star1 } from "iconsax-react";
import Image from "next/image";

function ProductItem() {
  return (
    <div className="flex w-full cursor-pointer flex-col">
      <div className="ripple aspect-[3/2.7] w-full overflow-hidden rounded-md bg-primary-100">
        <div className="relative h-full w-full">
          <Image
            src="/images/product/apple.png"
            alt=""
            fill
            className="object-contain"
          />
          <div
            className="absolute right-2 top-2 flex h-10 w-10 items-center 
            justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
            -25%
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-5">
        <h3
          className="transition-all\ line-clamp-2 h-14 overflow-hidden text-ellipsis text-lg font-bold
           hover:text-primary-500 hover:underline">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda,
          fugit?
        </h3>
      </div>
      <div className="flex gap-2">
        <span className="font-semibold text-primary-500">20.000đ</span>
        <span className="text-neutral-text-secondary line-through">
          30.000đ
        </span>
        <div className="ml-auto flex items-center gap-0.5">
          <span>3</span>
          <Star1 variant="Bold" className="text-secondary-500" size={16} />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
