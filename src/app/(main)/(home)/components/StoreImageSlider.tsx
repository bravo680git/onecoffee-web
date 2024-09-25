"use client";

import { IMG_BLUR_HASH } from "@/utils/constants";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Image from "next/image";
import Slider from "react-slick";

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 z-10 flex h-12 w-12 translate-y-[-50%] cursor-pointer items-center 
        justify-center rounded-full backdrop-blur-sm transition-all hover:bg-black/5"
      onClick={onClick}>
      <ArrowLeft2 size={32} className="text-neutral-text-secondary/80" />
    </div>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 z-10 flex h-12 w-12 translate-y-[-50%] cursor-pointer items-center 
      justify-center rounded-full backdrop-blur-sm transition-all hover:bg-black/5"
      onClick={onClick}>
      <ArrowRight2 size={32} className="text-neutral-text-secondary/50" />
    </div>
  );
}

function NewSlider({ items }: { items: string[] }) {
  return (
    <Slider
      slidesToShow={1}
      slidesToScroll={1}
      infinite
      autoplay
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      className="h-full w-full">
      {items.map((item, i) => (
        <div key={i} className="relative aspect-video w-full p-2">
          <Image
            src={item}
            alt=""
            fill
            className="rounded-lg object-cover object-center"
            placeholder="blur"
            blurDataURL={IMG_BLUR_HASH}
          />
        </div>
      ))}
    </Slider>
  );
}

export default NewSlider;
