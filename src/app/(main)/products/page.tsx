import { type BreadcrumbItem } from "@/components/Breadcrumb";
import { path } from "@/config/path";
import { publicApi } from "@/services/api";
import { ProductQueries } from "@/services/api/public/type";
import { CATEGORY, QueryKey } from "@/utils/constants";
import { Suspense } from "react";
import PageHeader from "../components/PageHeader";
import { generateProductFilter } from "../helper";
import { ProductFilter } from "./components/ProductFilter";
import ProductList, { ProductListLoading } from "./components/ProductList";
import { ORDER_TYPE_DIST } from "./constants";

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
      <PageHeader breadcrumbItems={breadcrumbItems} title="Sản phẩm" />
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
