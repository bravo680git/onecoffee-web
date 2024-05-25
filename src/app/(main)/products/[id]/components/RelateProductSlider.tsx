"use client";

import Slider from "react-slick";
import ProductItem from "../../../components/ProductItem";
import { ProductType } from "@/services/api/public/type";

function RelateProductSlider({ items }: { items: ProductType[] }) {
  return (
    <Slider
      dots
      slidesToShow={4}
      slidesToScroll={4}
      infinite={false}
      autoplay
      speed={1000}
      responsive={[
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ]}>
      {items.map((item, i) => (
        <div key={i} className="p-2">
          <ProductItem data={item} />
        </div>
      ))}
    </Slider>
  );
}

export default RelateProductSlider;
