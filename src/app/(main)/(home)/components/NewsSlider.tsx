"use client";

import { path } from "@/config/path";
import { BlogType } from "@/services/api";
import { fromNow } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

function NewSlider({ items }: { items: BlogType[] }) {
  return (
    <div className="mx-auto max-w-[1200px] pb-10">
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
              href={`${path.blogs}/${item.slug}`}
              className="relative mx-auto flex w-[370px] flex-col rounded-md shadow-md">
              <div className="relative aspect-video w-[370px] overflow-hidden rounded-t-md">
                <Image src={item.thumbnail} alt="" fill />
              </div>
              <h3 className="mt-4 px-4 text-left text-lg font-bold">
                {item.title}
              </h3>
              <span className="mb-4 px-4 text-left text-xs text-neutral-text-secondary">
                {fromNow(item.updatedAt)}
              </span>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewSlider;
