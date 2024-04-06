"use client";

import Image from "next/image";
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductImageSlider() {
  return (
    <Slider
      dots
      slidesToShow={1}
      slidesToScroll={1}
      speed={500}
      autoplay
      className="h-full w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-primary-100">
            <div className="relative h-4/5 w-4/5">
              <Image
                src="/images/product/apple.png"
                alt=""
                fill
                className="object-contain object-center"
                quality={100}
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default ProductImageSlider;
