import { publicApi } from "@/services/api";
import { ProductType } from "@/services/api/public/type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RelateProductSlider from "./RelateProductSlider";

async function RelatedProducts({ item }: { item: ProductType }) {
  const items =
    (await publicApi
      .getProductList({
        category: `${item.category.id}`,
      })
      .then((res) => res?.data?.filter((p) => p.id !== item.id))
      .catch()) ?? [];

  return (
    <>
      <h3 className="mb-4 text-lg font-bold">Sản phẩm liên quan</h3>
      <RelateProductSlider items={items} />
    </>
  );
}

export function RelatedProductsLoading() {
  return (
    <>
      <Skeleton width={180} />
      <div className="grid grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
        <Skeleton height={260} />
        <Skeleton height={260} />
        <Skeleton height={260} className="sm:hidden" />
        <Skeleton height={260} className="md:hidden" />
      </div>
    </>
  );
}

export default RelatedProducts;
