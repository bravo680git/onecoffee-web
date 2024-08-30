import { Suspense } from "react";
import { OrderSelect, ProductFilterBtn } from "./ProductFilter";
import ProductItem from "../../components/ProductItem";
import { publicApi } from "@/services/api";
import { Category } from "@/services/api/public/type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "./Pagination";

async function ProductList({
  queries,
  pageSize,
  categories,
}: {
  queries: Record<string, string | undefined>;
  pageSize: number;
  categories: Category[];
}) {
  const { data: products, meta } =
    (await publicApi
      .getProductList(queries)
      .then((res) => res)
      .catch()) ?? {};

  const start = ((meta?.currentPage ?? 1) - 1) * pageSize + 1;
  const total = meta?.total ?? 0;
  const end = Math.min(start + pageSize, total);
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="grow xl:px-4">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-neutral-text-secondary sm:order-1 sm:w-full">
          {total > 0
            ? `Hiển thị ${start}-${end} của ${meta?.total} sản phẩm`
            : "Không có sản phẩm nào"}
        </span>
        <div className="ml-auto flex gap-2">
          <ProductFilterBtn categories={categories} />
          <Suspense>
            <OrderSelect />
          </Suspense>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2">
        {products?.map((item, i) => (
          <div key={i} className="col-span-1">
            <ProductItem data={item} />
          </div>
        ))}
        <Pagination
          currentPage={meta?.currentPage ?? 1}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export function ProductListLoading() {
  return (
    <div className="grow xl:px-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Skeleton width={180} />
        <Skeleton height={32} width={160} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="col-span-1">
              <Skeleton height={300} />
            </div>
          ))}
        <div className="col-span-3 flex justify-center gap-2 text-neutral-text-secondary sm:col-span-2">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton width={32} height={32} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
