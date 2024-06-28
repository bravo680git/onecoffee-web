import "@/assets/css/quill.css";
import { publicApi } from "@/services/api";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductImageSlider from "./components/ProductImageSlider";
import ProductPrice from "./components/ProductPrice";
import RelatedProducts, {
  RelatedProductsLoading,
} from "./components/RelatedProducts";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const product = (await publicApi.getProductDetail(params.id))?.data?.product;
  return {
    title: product?.name,
    keywords: product?.seoKeyword,
    description: product?.seoDescription,
    openGraph: {
      images: product?.images,
    },
  };
};

async function ProductDetail({ params }: PageProps<["id"], []>) {
  const productId = params.id;
  const data = await publicApi
    .getProductDetail(productId)
    .then((res) => res?.data)
    .catch();
  if (!data) {
    return;
  }
  const product = data.product;

  return (
    <div className="w-full py-60 lg:py-20">
      <div className="mx-auto max-w-[1200px] xl:max-w-full xl:px-4">
        <section className="w-full">
          <div className="flex gap-12 md:flex-col">
            <div className="w-[600px] shrink-0 xl:w-[400px] md:mx-auto sm:w-full">
              <ProductImageSlider images={product.images} />
            </div>
            <div className="grow">
              <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
              {/* <div className="flex items-center gap-2 ">
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
              </div> */}
              <hr className="mt-2 w-full text-neutral-text-secondary" />
              <ProductPrice data={product} />
            </div>
          </div>
        </section>

        <section className="mt-14 w-full">
          <h3 className="mb-2 text-lg font-bold">Chi tiết sản phẩm</h3>
          <div className="ql-snow">
            <div
              className="view ql-editor"
              dangerouslySetInnerHTML={{ __html: product.description }}></div>
          </div>
        </section>

        {/* <section className="mt-8 w-full" id="reviews">
          <Suspense fallback={<ProductRateLoading />}>
            <ProductRate product={product} />
          </Suspense>
        </section> */}

        <section className="mt-8 w-full">
          <Suspense fallback={<RelatedProductsLoading />}>
            <RelatedProducts item={product} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
