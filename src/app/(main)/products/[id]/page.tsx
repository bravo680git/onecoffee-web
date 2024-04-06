import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import Image from "next/image";
import ProductImageSlider from "./components/ProductImageSlider";
import { Star1 } from "iconsax-react";
import ProductPrice from "./components/ProductPrice";
import ProductRate from "./components/ProductRate";
import RelateProductSlider from "./components/RelateProductSlider";

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

  breadcrumbItems[2] = {
    title: "Sản phẩm " + productId,
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
          <div className="flex gap-5 md:flex-col">
            <div className="w-[600px] shrink-0 xl:w-[400px] md:mx-auto sm:w-full">
              <ProductImageSlider />
            </div>
            <div className="grow">
              <h3 className="mb-2 text-lg font-semibold">Apple</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star1
                    size={20}
                    variant="Bold"
                    className="text-secondary-500"
                  />
                  <span className="font-semibold text-neutral-text-secondary">
                    3.7
                  </span>
                </div>
                <span className="cursor-pointer text-xs text-blue-400 hover:opacity-80">
                  125 đánh giá
                </span>
              </div>
              <hr className="mt-2 w-full text-neutral-text-secondary" />
              <ProductPrice />
            </div>
          </div>
        </section>

        <section className="mt-10 w-full">
          <h3 className="mb-2 text-lg font-bold">Chi tiết sản phẩm</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            eos labore eum incidunt facilis dignissimos quod ad rerum nihil
            eligendi amet nisi molestiae iusto blanditiis laudantium aliquam a
            sint exercitationem inventore, commodi asperiores repellat
            consectetur. Veritatis, quasi eum? Asperiores obcaecati harum
            dolorem modi dignissimos ea illo recusandae qui, aperiam numquam
            voluptatibus impedit nihil? Incidunt deleniti repellendus ipsa
            numquam. Ipsa incidunt non illo aperiam quasi, quisquam sit animi
            similique sed quod explicabo totam laboriosam asperiores beatae,
            odio maiores tenetur quidem expedita ratione. Suscipit magni
            voluptas perspiciatis velit exercitationem illum ipsa sed soluta
            harum quos, laboriosam minima, pariatur facilis, delectus deleniti.
            Optio.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            eos labore eum incidunt facilis dignissimos quod ad rerum nihil
            eligendi amet nisi molestiae iusto blanditiis laudantium aliquam a
            sint exercitationem inventore, commodi asperiores repellat
            consectetur. Veritatis, quasi eum? Asperiores obcaecati harum
            dolorem modi dignissimos ea illo recusandae qui, aperiam numquam
            voluptatibus impedit nihil? Incidunt deleniti repellendus ipsa
            numquam. Ipsa incidunt non illo aperiam quasi, quisquam sit animi
            similique sed quod explicabo totam laboriosam asperiores beatae,
            odio maiores tenetur quidem expedita ratione. Suscipit magni
            voluptas perspiciatis velit exercitationem illum ipsa sed soluta
            harum quos, laboriosam minima, pariatur facilis, delectus deleniti.
            Optio.
          </p>
        </section>

        <section className="mt-8 w-full">
          <ProductRate />
        </section>

        <section className="mt-8 w-full">
          <h3 className="mb-4 text-center text-lg font-bold">
            Sản phẩm liên quan
          </h3>
          <RelateProductSlider />
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
