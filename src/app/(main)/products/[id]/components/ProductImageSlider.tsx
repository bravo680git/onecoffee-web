"use client";

import Image from "next/image";
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductImageSlider({ images = [] }: { images: string[] }) {
  return (
    <Slider
      dots
      slidesToShow={1}
      slidesToScroll={1}
      speed={500}
      autoplay
      infinite
      className="w-full"
      dotsClass="slick-dots [&>li]:!w-[unset] [&>li]:!mt-2"
      customPaging={(index) => (
        <div key={index} className="relative h-10 w-10">
          <Image src={images[index]} alt="" fill />
        </div>
      )}>
      {images.map((item, i) => (
        <div key={i} className="w-full">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden  rounded-lg bg-primary-100">
            <Image
              src={item}
              alt=""
              fill
              className="object-contain object-center"
              quality={100}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default ProductImageSlider;
