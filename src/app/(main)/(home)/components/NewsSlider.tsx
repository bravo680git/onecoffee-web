"use client";

import { User } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

export type NewsItem = {
  img: string;
  url: string;
  date: string;
  author: string;
  title: string;
};

function NewSlider({ items }: { items: NewsItem[] }) {
  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <Slider
        slidesToShow={3}
        slidesToScroll={3}
        dots
        infinite
        // autoplay
        responsive={[
          {
            breakpoint: 1200,
            settings: { slidesToShow: 2, slidesToScroll: 2, centerMode: true },
          },
          {
            breakpoint: 880,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}>
        {items.map((item, i) => (
          <div key={i} className="p-2">
            <Link
              href={item.url}
              className="w-[370px] h-[520px] rounded-md flex flex-col relative items-center shadow-md mx-auto">
              <div className="w-[370px] h-[300px] rounded-t-md relative overflow-hidden">
                <Image src={item.img} alt="" fill />
              </div>
              <span
                className="text-xs font-semibold py-1 px-2 rounded-md bg-primary-500 text-white
                absolute left-[50%] translate-x-[-50%] top-[288px]">
                {item.date}
              </span>
              <div className="flex items-center gap-2 justify-center mt-6">
                <User className="text-secondary-500" size={16} />
                <span className="text-sm text-neutral-text-secondary">
                  {item.author}
                </span>
              </div>
              <h3 className="text-2xl font-bold mt-4">{item.title}</h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewSlider;
