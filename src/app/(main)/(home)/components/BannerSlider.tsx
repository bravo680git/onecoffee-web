"use client";

import Slick from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Banner } from "@/services/api/public/type";
import Link from "next/link";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { IMG_BLUR_HASH } from "@/utils/constants";

export type SliderItem = Banner;

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-0 top-0 z-10 flex h-full w-10 translate-y-[-5px] cursor-pointer 
        items-center justify-center backdrop-blur-sm transition-all hover:bg-black/5"
      onClick={onClick}>
      <ArrowLeft2 size={80} className="text-neutral-text-secondary/50" />
    </div>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 top-0 z-10 flex h-full w-10 translate-y-[-5px] cursor-pointer 
    items-center justify-center backdrop-blur-sm transition-all hover:bg-black/5"
      onClick={onClick}>
      <ArrowRight2 size={80} className="text-neutral-text-secondary/50" />
    </div>
  );
}

function Slider({ items }: { items: SliderItem[] }) {
  return (
    <div>
      <Slick
        dots
        infinite
        slidesToShow={1}
        slidesToScroll={1}
        speed={500}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        autoplay>
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            aria-label={item.caption ?? "Banner"}
            className="relative mx-auto h-[450px] w-full text-center sm:h-[200px]">
            <Image
              src={item.image}
              alt=""
              fill
              className="h-full w-full object-cover object-center"
              quality={100}
              placeholder="blur"
              blurDataURL={IMG_BLUR_HASH}
            />
          </Link>
        ))}
      </Slick>
    </div>
  );
}

export default Slider;
