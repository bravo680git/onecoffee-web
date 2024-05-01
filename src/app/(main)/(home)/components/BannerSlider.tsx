"use client";

import Slick from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Banner } from "@/services/api/public/type";
import Link from "next/link";

export type SliderItem = Banner["banners"][number];

function Slider({ items }: { items: SliderItem[] }) {
  return (
    <div>
      <Slick
        dots
        infinite
        slidesToShow={1}
        slidesToScroll={1}
        speed={500}
        autoplay>
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="relative mx-auto h-[450px] w-full text-center sm:h-[200px]">
            <Image
              src={item.image}
              alt=""
              fill
              className="h-full w-full object-cover object-center"
              quality={100}
            />
          </Link>
        ))}
      </Slick>
    </div>
  );
}

export default Slider;
