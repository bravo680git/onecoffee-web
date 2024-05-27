import { publicApi } from "@/services/api";
import { ProductType } from "@/services/api/public/type";
import { Star1 } from "iconsax-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Rating, Stars } from "./Rating";

async function ProductRate({ product }: { product: ProductType }) {
  const rateData = (await publicApi.getProductRates(product.slug))?.data;
  if (!rateData) {
    return;
  }
  const rating = rateData.averageRate;
  const w = (rating / 5) * 120;
  const totalRate = rateData.totalRate;
  const rateStatistic = rateData.countRate;
  const items = rateData.rates;

  return (
    <div className="flex xl:gap-4 sm:flex-col">
      <div className="w-64 sm:mb-5">
        <div className="sticky top-[100px] w-full sm:static">
          <h3 className="mb-2 text-lg font-bold">Đánh giá về sản phẩm</h3>
          <div className="mb-1 flex items-center gap-3">
            <span className="text-3xl font-bold">{rating}</span>
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
          <span className="text-neutral-text-secondary">
            ({totalRate} đánh giá)
          </span>
          <div className="mt-2 flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((v) => (
              <div key={v} className="flex items-center gap-2">
                <Stars v={v} />
                <div className="relative h-2 w-32 overflow-hidden rounded-full bg-neutral-text-secondary/20">
                  <div
                    className="absolute left-0 top-0 h-full bg-teal-500"
                    style={{
                      width: `${(rateStatistic[v] / totalRate) * 100}%`,
                    }}></div>
                </div>
                <span className="text-neutral-text-secondary">
                  {rateStatistic[v]}
                </span>
              </div>
            ))}
          </div>

          <Rating product={product} />
        </div>
      </div>

      <div className="flex grow flex-col gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex w-full flex-col gap-1 border-b border-slate-200 pb-2">
            <div className="flex items-center gap-4">
              <span className="text-base font-semibold">{item.user.name}</span>
              <Stars v={item.rating} />
            </div>
            {item.comment ? (
              <p>{item.comment}</p>
            ) : (
              <span className="italic text-neutral-text-secondary">
                Đánh giá không có nhận xét
              </span>
            )}
            <span className="text-xs text-neutral-text-secondary">
              {new Date(item.createdAt).toLocaleString("vi", {
                dateStyle: "full",
                timeStyle: "medium",
              })}
            </span>
          </div>
        ))}
        {items.length === 0 && (
          <span className="mt-5 text-neutral-text-secondary">
            Sản phẩm chưa có đánh giá nào
          </span>
        )}
      </div>
    </div>
  );
}

export function ProductRateLoading() {
  return (
    <div className="flex xl:gap-4 sm:flex-col">
      <div className="w-64 sm:mb-5">
        <div className="sticky top-[100px] w-full sm:static">
          <Skeleton width={180} height={14} />
          <div className="mb-1 flex items-center gap-3">
            <Skeleton width={40} height={20} />
            <Skeleton width={80} height={20} />
          </div>
          <Skeleton width={100} height={16} />
          <div className="mt3">
            <Skeleton width={200} height={160} />
          </div>

          <div className="mt-3">
            <Skeleton width={200} height={300} />
          </div>
        </div>
      </div>

      <div className="flex grow flex-col gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex w-full flex-col gap-1 border-b border-slate-200 pb-2">
              <Skeleton width={100} height={14} />
              <Skeleton width={80} height={18} />
              <Skeleton
                count={3}
                containerClassName="w-full block"
                style={{ width: "100%" }}
                height={10}
              />
              <Skeleton width={60} height={6} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductRate;
