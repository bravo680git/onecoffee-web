import { publicApi } from "@/services/api";
import { ProductQueries } from "@/services/api/public/type";
import { CATEGORY, QueryKey } from "@/utils/constants";
import { Metadata } from "next";
import { Suspense } from "react";
import { generateProductFilter } from "../helper";
import { ProductFilter } from "./components/ProductFilter";
import ProductList, { ProductListLoading } from "./components/ProductList";
import { ORDER_TYPE_DIST } from "./constants";

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: "Sản phẩm",
};

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
        res?.data?.categories?.filter(
          (item) => item.parentId === CATEGORY.PRODUCT,
        ),
      )
      .catch()) ?? [];

  return (
    <div className="w-full py-60 lg:py-20">
      <section className="mx-auto flex max-w-[1200px] gap-6">
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
