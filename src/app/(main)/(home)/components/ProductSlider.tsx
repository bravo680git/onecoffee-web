"use client";

import Image from "next/image";
import Slider from "react-slick";

function ProductSlider() {
  return (
    <div className="max-w-[1200px] xl:max-w-[900px] lg:w-[600px] w-full mx-auto pb-10">
      <Slider
        slidesToShow={4}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
              dots: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
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
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-2">
            <div
              className="w-[270px] h-[430px] rounded-lg flex justify-center items-end pb-6 mx-auto"
              style={{
                backgroundImage: "url(/images/home/apple-img.png)",
              }}>
              <div className="bg-white w-[220px] h-[128px] rounded-md p-8 relative flex items-end">
                <span className="text-xl font-semibold text-center hover:text-primary-500 cursor-pointer">
                  Agriculture Products
                </span>
                <Image
                  src="/images/home/machine-img.png"
                  alt=""
                  width={70}
                  height={70}
                  className="absolute top-0 translate-y-[-50%] left-[50%] translate-x-[-50%]"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider;
