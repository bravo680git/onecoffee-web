import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import Image from "next/image";
import ProductImageSlider from "./components/ProductImageSlider";
import { Star1 } from "iconsax-react";
import ProductPrice from "./components/ProductPrice";
import ProductRate from "./components/ProductRate";
import RelateProductSlider from "./components/RelateProductSlider";
import { publicApi } from "@/services/api";
import { ProductType } from "@/services/api/public/type";
import "@/assets/css/quill.css";
import Link from "next/link";
import RelatedProducts, {
  RelatedProductsLoading,
} from "./components/RelatedProducts";
import { Suspense } from "react";

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

async function ProductDetail({ params }: PageProps<["id"], []>) {
  const productId = params.id;
  const data =
    (await publicApi
      .getProductDetail(productId)
      .then((res) => res.data?.product)
      .catch()) ?? ({} as ProductType);

  breadcrumbItems[2] = {
    title: data.name,
    url: "",
  };

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
      <div className="mx-auto my-28 max-w-[1200px] xl:max-w-full xl:px-4">
        <section className="w-full">
          <div className="flex gap-12 md:flex-col">
            <div className="w-[600px] shrink-0 xl:w-[400px] md:mx-auto sm:w-full">
              <ProductImageSlider images={data.images} />
            </div>
            <div className="grow">
              <h3 className="mb-2 text-lg font-semibold">{data.name}</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star1
                    size={20}
                    variant="Bold"
                    className="text-secondary-500"
                  />
                  <span className="font-semibold text-neutral-text-secondary">
                    {data.averageRate ?? 0}
                  </span>
                </div>
                <Link
                  href="#reviews"
                  className="cursor-pointer text-xs text-blue-400 hover:opacity-80">
                  {data.totalRate ?? 0} đánh giá
                </Link>
              </div>
              <hr className="mt-2 w-full text-neutral-text-secondary" />
              <ProductPrice data={data} />
            </div>
          </div>
        </section>

        <section className="mt-10 w-full">
          <h3 className="mb-2 text-lg font-bold">Chi tiết sản phẩm</h3>
          <div className="ql-snow">
            <div
              className="view ql-editor"
              dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>
        </section>

        <section className="mt-8 w-full" id="reviews">
          <ProductRate />
        </section>

        <section className="mt-8 w-full">
          <Suspense fallback={<RelatedProductsLoading />}>
            <RelatedProducts item={data} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
