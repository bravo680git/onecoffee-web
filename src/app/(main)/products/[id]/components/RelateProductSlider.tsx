"use client";

import Slider from "react-slick";
import ProductItem from "../../components/ProductItem";

function RelateProductSlider() {
  return (
    <Slider
      dots
      slidesToShow={4}
      slidesToScroll={4}
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
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="p-2">
          <ProductItem />
        </div>
      ))}
    </Slider>
  );
}

export default RelateProductSlider;
