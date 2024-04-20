import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import Image from "next/image";
import ProductItem from "./components/ProductItem";
import { ArrowLeft2, ArrowRight2, Filter, Setting5 } from "iconsax-react";
import {
  OrderSelect,
  ProductFilter,
  ProductFilterBtn,
} from "./components/ProductFilter";
import { Suspense } from "react";
import { path } from "@/config/path";
import { publicApi } from "@/services/api";
import { ProductQueries } from "@/services/api/public/type";
import { ORDER_TYPE_DIST } from "./constants";
import ProductList, { ProductListLoading } from "./components/ProductList";
import { CATEGORY, QueryKey } from "@/utils/constants";
import { generateProductFilter } from "../helper";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: "Trang chủ",
    url: path.home,
  },
  {
    title: "Sản phẩm",
    url: path.products,
  },
];

const PAGE_SIZE = 12;

async function Products({ searchParams }: PageProps<[], QueryKey[]>) {
  const queries: ProductQueries = {
    name: searchParams.q,
    page: searchParams.page ?? "1",
    limit: PAGE_SIZE.toString(),
    sort: ORDER_TYPE_DIST[searchParams.sort],
    filter: generateProductFilter(
      searchParams.from,
      searchParams.to,
      searchParams["cat-id"],
    ),
  };

  const key = Object.values(queries).join("");

  const categories =
    (await publicApi
      .getCategoryList()
      .then((res) =>
        res.data?.categories?.filter(
          (item) => item.parentId === CATEGORY.PRODUCT,
        ),
      )
      .catch()) ?? [];

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
          <Suspense>
            <ProductFilter categories={categories} />
          </Suspense>
        </div>

        <Suspense fallback={<ProductListLoading />} key={key}>
          <ProductList
            queries={queries}
            pageSize={PAGE_SIZE}
            categories={categories}
          />
        </Suspense>
      </section>
    </div>
  );
}

export default Products;
