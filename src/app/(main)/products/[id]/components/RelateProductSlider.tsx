"use client";

import Slider from "react-slick";
import ProductItem from "../../../components/ProductItem";
import { ProductType } from "@/services/api/public/type";

function RelateProductSlider({ items }: { items: ProductType[] }) {
  return (
    <Slider
      dots
      slidesToShow={6}
      slidesToScroll={1}
      infinite={false}
      autoplay
      className="related-products-slider"
      speed={1000}
      responsive={[
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
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
