"use client";

import { path } from "@/config/path";
import { Category } from "@/services/api";
import { QueryKey } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

type ProductSlidersType = Category["categories"];

function ProductSlider({ items = [] }: { items: ProductSlidersType }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] pb-10 xl:max-w-[900px] lg:w-[600px]">
      <Slider
        slidesToShow={Math.min(items.length, 4)}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: Math.min(items.length, 3),
              dots: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: Math.min(items.length, 2),
              dots: true,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              dots: true,
            },
          },
        ]}>
        {items.map((item, i) => (
          <div key={i} className="p-2">
            <Link
              href={`${path.products}?${QueryKey.category}=${item.id}`}
              className="mx-auto flex h-[430px] w-[270px] items-end justify-center rounded-lg pb-6"
              style={{
                backgroundImage: `url(${item.image ?? "/images/home/apple-img.png"})`,
              }}>
              <div className="relative flex h-[128px] w-[220px] items-end justify-center rounded-md bg-white/70 p-8">
                <span className="cursor-pointer text-center text-xl font-semibold hover:text-primary-500">
                  {item.name}
                </span>
                <Image
                  src="/images/home/machine-img.png"
                  alt=""
                  width={70}
                  height={70}
                  className="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%]"
                />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider;
