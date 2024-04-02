"use client";

import Slick from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export type SliderItem = {
  img: string;
  url?: string;
};

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
          <div
            key={i}
            className="text-center w-full h-[800px] xl:h-[600px] sm:h-[400px] relative mx-auto">
            <Image src={item.img} alt="" fill className="h-full w-full" />
          </div>
        ))}
      </Slick>
    </div>
  );
}

export default Slider;
