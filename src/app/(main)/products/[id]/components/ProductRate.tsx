import clsx from "clsx";
import { Star1 } from "iconsax-react";
import { Rating, Stars } from "./Rating";

function ProductRate() {
  const rate = 3.5;
  const w = (rate / 5) * 120;

  return (
    <div className="flex xl:gap-4 sm:flex-col">
      <div className="w-64 sm:mb-5">
        <div className="sticky top-[100px] w-full sm:static">
          <h3 className="mb-2 text-lg font-bold">Đánh giá về sản phẩm</h3>
          <div className="mb-1 flex items-center gap-3">
            <span className="text-3xl font-bold">3.5</span>
            <div className="relative flex gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star1
                    key={i}
                    className="text-neutral-text-secondary/50"
                    variant="Bold"
                    size={24}
                  />
                ))}
              </div>
              <div
                className="absolute left-0 top-0 z-[1] overflow-hidden"
                style={{ width: w }}>
                <div className="flex w-[120px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star1
                      key={i}
                      className="text-secondary-500"
                      variant="Bold"
                      size={24}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="text-neutral-text-secondary">(7 đánh giá)</span>
          <div className="mt-2 flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((v) => (
              <div key={v} className="flex items-center gap-2">
                <Stars v={v + 1} />
                <div className="relative h-2 w-32 overflow-hidden rounded-full bg-neutral-text-secondary/20">
                  <div
                    className="absolute left-0 top-0 h-full bg-teal-500"
                    style={{ width: `${30}%` }}></div>
                </div>
                <span className="text-neutral-text-secondary">5</span>
              </div>
            ))}
          </div>

          <Rating />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 border-b border-slate-200 pb-2">
              <span className="text-base font-semibold">Nguyen Van A</span>
              <Stars v={3} />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                doloribus quos dolores id suscipit beatae?
              </p>
              <span className="text-xs text-neutral-text-secondary">
                Đánh giá vào 1 năm trước
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductRate;
