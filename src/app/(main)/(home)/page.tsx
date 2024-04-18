import { path } from "@/config/path";
import Image from "next/image";
import Link from "next/link";
import Slider from "./components/BannerSlider";
import { CheckIcon, LabIcon, VegetableCart } from "./components/Icons";
import NewsSlider, { type NewsItem } from "./components/NewsSlider";
import ProductSlider from "./components/ProductSlider";
import { publicApi } from "@/services/api";

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

export default async function Home() {
  const banners =
    (await publicApi
      .getBannerList()
      .then((data) => data.data?.banners)
      .catch()) ?? [];

  return (
    <div className="w-full overflow-hidden">
      <section className="relative bg-fixed">
        <div className="h-[900px] w-full bg-[url(/images/home/home-wallpaper.png)] bg-fixed"></div>
        <div className="absolute left-1/2 top-1/2 max-w-[360px] translate-x-[-50%] translate-y-[-50%] text-white">
          <p className="text-2xl font-bold text-secondary-500">New3T store</p>
          <p className="text-xl font-semibold">
            Not just different, but more than that
          </p>
          <p className="text-neutral-text-secondary">
            Cung cấp các mặt hàng nông sản tươi sạch, đồng hành cùng bạn cho
            từng bữa ăn chất lượng.
          </p>
          <Link href={path.products}>
            <button className="mt-2 rounded-md bg-primary-500 px-4 py-2 font-bold text-white hover:opacity-80">
              Khám phá ngay
            </button>
          </Link>
        </div>
      </section>

      <section className="relative w-full">
        <div className="absolute top-[-40px] flex w-full justify-center gap-5 xl:px-4 sm:relative sm:flex-col">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex w-1/3 max-w-[370px] cursor-default flex-col items-center rounded-md bg-white
                p-5 shadow-sm transition-all hover:scale-105 sm:w-full sm:max-w-full sm:shadow-md">
              <span className="mt-6 font-semibold text-secondary-500">
                Thực phẩm sạch
              </span>
              <p className="mt-5 text-center text-base font-semibold">
                Sử dụng công nghệ tiên tiến
              </p>
              <div className="mt-2 h-24 w-24 rounded-md bg-slate-200"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-72 flex max-w-[1200px] xl:flex-col sm:mt-5">
        <div className="xl:fit relative aspect-square w-1/2 xl:mx-auto">
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
            className="absolute bottom-[-40px] left-[-40px] rounded-full border-8 border-white"
          />
        </div>
        <div className="flex w-1/2 flex-col justify-center gap-5 xl:mt-16 xl:w-full xl:items-center xl:text-center sm:px-4">
          <p className="font-grace text-2xl text-secondary-500">
            Our introductions
          </p>
          <h2 className="text-5xl font-bold">
            Agriculture & Organic Product Farm
          </h2>
          <p className="text-3xl font-semibold text-primary-500">
            Agrios is the largest global organic farm.
          </p>
          <p className="text-neutral-text-secondary xl:max-w-[600px]">
            There are many variations of passages of lorem ipsum available but
            the majority have suffered alteration in some form by injected humor
            or random word which don’t look even.
          </p>
          <div className="flex gap-8 sm:flex-col">
            <div className="flex items-center gap-5">
              <VegetableCart />
              <span className="text-xl font-semibold">
                Growing fruits vegetables
              </span>
            </div>
            <div className="flex items-center gap-5">
              <LabIcon />
              <span className="text-xl font-semibold">
                Tips for ripening your fruits
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <i className="text-primary-500">
                <CheckIcon />
              </i>
              <p className="font-semibold">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facere, neque?
              </p>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-primary-500">
                <CheckIcon />
              </i>
              <p className="font-semibold">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facere, neque?
              </p>
            </div>
          </div>

          <button className="w-fit rounded-md bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:opacity-80">
            Discover more
          </button>
        </div>
      </section>

      <div className="w-full pb-10 pt-[100px]">
        <Slider items={banners} />
      </div>

      <section className="relative mt-10 flex h-[400px] w-full items-center justify-center bg-primary-100">
        <div className="text-center">
          <span className="font-grace text-xl font-semibold text-secondary-500">
            Our services
          </span>
          <h2 className="text-3xl font-bold">What We Offer</h2>
        </div>
        <div className="absolute bottom-[-320px] z-10 flex min-w-[1000px] justify-center gap-5">
          <ProductSlider />
        </div>
      </section>
      <section className="pt-[400px]">
        <div className="mx-auto flex max-w-[1200px] gap-4 xl:px-4 lg:flex-col">
          <Image
            src="/images/home/field-img.png"
            alt=""
            width={500}
            height={500}
            className="lg:mx-auto"
          />
          <div className="flex flex-col justify-between lg:gap-4">
            <span className="font-grace text-xl font-semibold text-secondary-500">
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

            <button className="w-fit rounded-md bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:opacity-80">
              Discover more
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10 text-center">
        <h3 className="font-grace text-xl font-semibold text-secondary-500">
          From the blog
        </h3>
        <h2 className="mb-8 text-2xl font-bold">News & Articles</h2>
        <NewsSlider items={newsItems} />
      </section>
      <div className="h-64 w-full bg-primary-100"></div>
    </div>
  );
}
