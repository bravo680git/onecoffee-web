import { publicApi } from "@/services/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "../components/ProductItem";
import Slider from "./components/BannerSlider";
import BlogItem from "./components/BlogItem";
import StoreImageSlider from "./components/StoreImageSlider";
import { STORE_IMGS, THUMBNAIL_1 } from "@/utils/contact";
import { path } from "@/config/path";
import { IMG_BLUR_HASH, QueryKey } from "@/utils/constants";

export const metadata: Metadata = {
  title: {
    absolute: "ONe coffee",
  },
};

export default async function Home() {
  const [bannerRes, productRes, blogRes] = await Promise.all([
    publicApi.getBannerList(),
    publicApi.getProductList({ limit: "8", page: "1", filter: "pin:true" }),
    publicApi.getCategoryBlogs(4),
  ]).catch();

  const banners = bannerRes?.data?.banners ?? [];
  const products = productRes?.data?.products ?? [];
  const categoryBlogs = blogRes?.data?.blogs ?? [];

  return (
    <div className="w-full overflow-hidden">
      <section className="bg w-full pb-10 pt-20 lg:pt-10">
        <Slider items={banners} />
      </section>

      <div className="mx-auto mt-10 max-w-[1200px] xl:px-4">
        <h3 className="text-2xl font-bold">ONe Highlights</h3>
        <div className="mb-6 h-[1px] w-3/5 bg-neutral-text-secondary"></div>
        {products.length > 0 && (
          <section className="mt-8 grid grid-cols-4 gap-8 lg:grid-cols-3 sm:grid-cols-2">
            {products.map((item) => (
              <ProductItem key={item.id} data={item} showPinIcon={false} />
            ))}
          </section>
        )}

        <section className="my-12 aspect-video w-full">
          <Link className="relative block h-full w-full" href={""} aria-label="ONe Coffee topic">
            <Image
              src={THUMBNAIL_1}
              alt=""
              fill
              className="rounded-2xl object-cover object-center"
              placeholder="blur"
              blurDataURL={IMG_BLUR_HASH}
            />
          </Link>
        </section>

        <section className="grid grid-cols-4 gap-10">
          <div className="col-span-3 md:order-1 md:col-span-4">
            <StoreImageSlider items={STORE_IMGS} />
          </div>
          <div className="flex flex-col items-end justify-center gap-3 md:col-span-4">
            <h3 className="text-3xl font-semibold text-secondary-500">
              ONe Space
            </h3>
            <p className="text-right">
              Đến với không gian đầy sáng tạo của <strong>ONe coffee </strong>
              để bật ra thật nhiều điều mới mẻ
            </p>
          </div>
        </section>
      </div>

      <div className="mt-10 w-full bg-slate-200 pt-10">
        <section className="mx-auto mt-10 max-w-[1200px] pb-28 xl:px-4">
          <h3 className="text-right text-2xl font-bold">ONe Stories</h3>
          <div className="mb-6 ml-[40%] h-[1px] w-3/5 bg-neutral-text-secondary"></div>
          <div className="flex flex-col gap-10">
            {categoryBlogs.map((item) => (
              <div key={item.id}>
                <Link href={`${path.blogs}?${QueryKey.category}=${item.id}`}>
                  <h3 className="mb-4 text-xl font-semibold text-secondary-500 transition-all hover:underline">
                    #{item.name}
                  </h3>
                </Link>
                <div
                  className="grid grid-cols-4 gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 
                  lg:[&>*:nth-child(4)]:invisible md:[&>*:nth-child(4)]:visible">
                  {item.blogs.map((item) => (
                    <BlogItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
