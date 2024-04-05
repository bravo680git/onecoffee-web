import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import Image from "next/image";
import ProductItem from "./components/ProductItem";
import { ArrowLeft2, ArrowRight2, Filter, Setting5 } from "iconsax-react";
import {
  OrderSelect,
  ProductFilter,
  ProductFilterBtn,
} from "./components/ProductFilter";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Sản phẩm",
    url: "/products",
  },
];

function Products({ searchParams }: PageProps<[], ["sort"]>) {
  return (
    <div className="w-full">
      <div className="relative flex h-[400px] w-full flex-col items-center justify-end gap-8 pb-20 sm:h-[300px]">
        <Image
          src="/images/page-header-img.png"
          fill
          alt=""
          className="sm:object-cover"
        />
        <Breadcrumb items={breadcrumbItems} />
        <h2 className="z-[1] text-3xl font-bold text-white">Sản phẩm</h2>
      </div>
      <section className="mx-auto my-28 flex max-w-[1200px] gap-6 sm:my-10">
        <div className="flex w-[240px] shrink-0 flex-col gap-6 xl:hidden">
          <ProductFilter />
        </div>
        <div className="grow xl:px-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-neutral-text-secondary sm:order-1 sm:w-full">
              Hiển thị 1-9 của 10 sản phẩm
            </span>
            <div className="ml-auto flex gap-2">
              <ProductFilterBtn />
              <OrderSelect />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2">
            {Array(9)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="col-span-1">
                  <ProductItem />
                </div>
              ))}
            <div className="col-span-3 flex justify-center gap-2 text-neutral-text-secondary sm:col-span-2">
              <div className="paginate-btn ripple">
                <ArrowLeft2 variant="Outline" size={16} />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="paginate-btn ripple font-semibold">
                  {i}
                </div>
              ))}
              <div className="paginate-btn ripple">
                <ArrowRight2 variant="Outline" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
