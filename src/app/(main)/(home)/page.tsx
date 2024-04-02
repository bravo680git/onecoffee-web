import Image from "next/image";
import Slider, { SliderItem } from "./components/BannerSlider";
import { CheckIcon, LabIcon, VegetableCart } from "./components/Icons";
import NewsSlider, { type NewsItem } from "./components/NewsSlider";
import ProductSlider from "./components/ProductSlider";

const items: SliderItem[] = [
  {
    img: "https://img.freepik.com/free-vector/flat-design-tasty-asian-food-facebook-cover_23-2150052176.jpg?t=st=1711978910~exp=1711982510~hmac=81db7e0d3b7b865ae20bac33ead58cd3775146acfd1099adc60cf07834fe6d06&w=1380",
  },
  {
    img: "https://img.freepik.com/free-vector/flat-design-food-sale-banner_23-2149083220.jpg?t=st=1711978931~exp=1711982531~hmac=12df7c2752473dcc69bf9ecb2ca608c97f0a4b1e5b55b2862b4c41c2c8734abc&w=1380",
  },
  {
    img: "https://img.freepik.com/free-vector/sprouted-white-rice-bowl-with-cereals-wooden-desk_107791-5545.jpg?t=st=1711978951~exp=1711982551~hmac=ea761ce80f2c7ac323e91a8f711c24b785504889fecd4d631dcc5ec02e14f173&w=1380",
  },
];

const newsItems: NewsItem[] = [
  {
    img: "https://img.freepik.com/free-photo/large-green-rice-field-with-green-rice-plants-rows_181624-28862.jpg?t=st=1712065228~exp=1712068828~hmac=e4c95d8c99f95c08faf1be117b14e9869cb781f39b17733a7ee1f210c99799f1&w=1380",
    title: "The Future of Farming, Smart Irrigation Solutions",
    author: "Kevin Martin",
    date: "2024-01-02",
    url: "#",
  },
  {
    img: "https://img.freepik.com/free-photo/large-green-rice-field-with-green-rice-plants-rows_181624-28862.jpg?t=st=1712065228~exp=1712068828~hmac=e4c95d8c99f95c08faf1be117b14e9869cb781f39b17733a7ee1f210c99799f1&w=1380",
    title: "The Future of Farming, Smart Irrigation Solutions",
    author: "Kevin Martin",
    date: "2024-01-02",
    url: "#",
  },
  {
    img: "https://img.freepik.com/free-photo/large-green-rice-field-with-green-rice-plants-rows_181624-28862.jpg?t=st=1712065228~exp=1712068828~hmac=e4c95d8c99f95c08faf1be117b14e9869cb781f39b17733a7ee1f210c99799f1&w=1380",
    title: "The Future of Farming, Smart Irrigation Solutions",
    author: "Kevin Martin",
    date: "2024-01-02",
    url: "#",
  },
  {
    img: "https://img.freepik.com/free-photo/large-green-rice-field-with-green-rice-plants-rows_181624-28862.jpg?t=st=1712065228~exp=1712068828~hmac=e4c95d8c99f95c08faf1be117b14e9869cb781f39b17733a7ee1f210c99799f1&w=1380",
    title: "The Future of Farming, Smart Irrigation Solutions",
    author: "Kevin Martin",
    date: "2024-01-02",
    url: "#",
  },
  {
    img: "https://img.freepik.com/free-photo/large-green-rice-field-with-green-rice-plants-rows_181624-28862.jpg?t=st=1712065228~exp=1712068828~hmac=e4c95d8c99f95c08faf1be117b14e9869cb781f39b17733a7ee1f210c99799f1&w=1380",
    title: "The Future of Farming, Smart Irrigation Solutions",
    author: "Kevin Martin",
    date: "2024-01-02",
    url: "#",
  },
];

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <section className="relative bg-fixed">
        <div className="w-full bg-[url(/images/home/home-wallpaper.png)] h-[900px] bg-fixed"></div>
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-[360px] text-white">
          <p className="text-secondary-500 text-2xl font-bold">New3T store</p>
          <p className="text-xl font-semibold">
            Not just different, but more than that
          </p>
          <p className="text-neutral-text-secondary">
            Cung cấp các mặt hàng nông sản tươi sạch, đồng hành cùng bạn cho
            từng bữa ăn chất lượng.
          </p>
          <button className="px-4 py-2 rounded-md bg-primary-500 text-white font-bold mt-2 hover:opacity-80">
            Khám phá ngay
          </button>
        </div>
      </section>

      <section className="w-full relative">
        <div className="flex absolute top-[-40px] gap-5 justify-center w-full xl:px-4 sm:flex-col sm:relative">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white shadow-sm max-w-[370px] sm:max-w-full sm:w-full
                w-1/3 p-5 rounded-md hover:scale-105 transition-all cursor-default sm:shadow-md">
              <span className="mt-6 text-secondary-500 font-semibold">
                Thực phẩm sạch
              </span>
              <p className="mt-5 font-semibold text-base text-center">
                Sử dụng công nghệ tiên tiến
              </p>
              <div className="w-24 h-24 rounded-md mt-2 bg-slate-200"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex max-w-[1200px] xl:flex-col mx-auto mt-72 sm:mt-5">
        <div className="relative w-1/2 aspect-square xl:fit xl:mx-auto">
          <Image
            src="/images/home/home-img-1.png"
            alt=""
            width={550}
            height={550}
            className="rounded-full"
          />
          <Image
            src="/images/home/home-img-2.png"
            alt=""
            width={280}
            height={280}
            className="absolute bottom-[-40px] left-[-40px] border-8 rounded-full border-white"
          />
        </div>
        <div className="flex flex-col gap-5 justify-center w-1/2 xl:w-full xl:items-center xl:mt-16 xl:text-center sm:px-4">
          <p className="text-secondary-500 text-2xl">Our introductions</p>
          <h2 className="text-5xl font-bold">
            Agriculture & Organic Product Farm
          </h2>
          <p className="text-primary-500 text-3xl font-semibold">
            Agrios is the largest global organic farm.
          </p>
          <p className="text-neutral-text-secondary xl:max-w-[600px]">
            There are many variations of passages of lorem ipsum available but
            the majority have suffered alteration in some form by injected humor
            or random word which don’t look even.
          </p>
          <div className="flex gap-8 sm:flex-col">
            <div className="flex gap-5 items-center">
              <VegetableCart />
              <span className="text-xl font-semibold">
                Growing fruits vegetables
              </span>
            </div>
            <div className="flex gap-5 items-center">
              <LabIcon />
              <span className="text-xl font-semibold">
                Tips for ripening your fruits
              </span>
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-center">
              <i className="text-primary-500">
                <CheckIcon />
              </i>
              <p className="font-semibold">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facere, neque?
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <i className="text-primary-500">
                <CheckIcon />
              </i>
              <p className="font-semibold">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facere, neque?
              </p>
            </div>
          </div>

          <button className="py-2 px-4 rounded-md bg-primary-500 font-bold text-white w-fit text-sm hover:opacity-80">
            Discover more
          </button>
        </div>
      </section>

      <div className="w-full pt-[100px] pb-10">
        <Slider items={items} />
      </div>

      <section className="w-full bg-primary-100 flex items-center justify-center relative h-[400px] mt-10">
        <div className="text-center">
          <span className="text-secondary-500 text-xl font-semibold">
            Our services
          </span>
          <h2 className="text-3xl font-bold">What We Offer</h2>
        </div>
        <div className="absolute bottom-[-320px] z-10 flex gap-5 justify-center min-w-[1000px]">
          <ProductSlider />
        </div>
      </section>
      <section className="pt-[400px]">
        <div className="max-w-[1200px] mx-auto flex gap-4 xl:px-4 lg:flex-col">
          <Image
            src="/images/home/field-img.png"
            alt=""
            width={500}
            height={500}
            className="lg:mx-auto"
          />
          <div className="flex flex-col justify-between lg:gap-4">
            <span className="text-secondary-500 text-xl font-semibold">
              Our farm benefits
            </span>
            <h2 className="text-3xl font-bold">Why choose my store?</h2>
            <p className="text-neutral-text-secondary">
              There are many variations of passages of lorem ipsum available but
              the majority have suffered alteration in some form by injected
              humor or random word which don’t look even.
            </p>

            <div className="flex items-start gap-2">
              <i className="mt-1 text-primary-500">
                <CheckIcon />
              </i>
              <div>
                <span className="text-lg font-semibold">
                  Quality Organic Food
                </span>
                <p className="text-neutral-text-secondary">
                  There are variation You need to be sure there is anything
                  hidden in the middle of text.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <i className="mt-1 text-[#C5CE38]">
                <CheckIcon />
              </i>
              <div>
                <span className="text-lg font-semibold">
                  Quality Organic Food
                </span>
                <p className="text-neutral-text-secondary">
                  There are variation You need to be sure there is anything
                  hidden in the middle of text.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <i className="mt-1 text-secondary-500">
                <CheckIcon />
              </i>
              <div>
                <span className="text-lg font-semibold">
                  Quality Organic Food
                </span>
                <p className="text-neutral-text-secondary">
                  There are variation You need to be sure there is anything
                  hidden in the middle of text.
                </p>
              </div>
            </div>

            <button className="py-2 px-4 rounded-md bg-primary-500 font-bold text-white w-fit text-sm hover:opacity-80">
              Discover more
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10 text-center">
        <h3 className="text-xl text-secondary-500 font-semibold">
          From the blog
        </h3>
        <h2 className="text-2xl font-bold mb-8">News & Articles</h2>
        <NewsSlider items={newsItems} />
      </section>
      <div className="w-full h-64 bg-primary-100"></div>
    </div>
  );
}
