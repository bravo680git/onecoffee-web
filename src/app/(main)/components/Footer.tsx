import { path } from "@/config/path";
import { publicApi } from "@/services/api";
import { fromNow } from "@/utils/functions";
import {
  Facebook,
  Youtube,
  Instagram,
  Call,
  Location,
  Send2,
} from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

const exploreItems = [
  {
    title: "Về chúng tôi",
    url: "#",
  },
  {
    title: "Sản phẩm",
    url: path.products,
  },
  {
    title: "Bài viết",
    url: path.blogs,
  },
  {
    title: "Liên hệ",
    url: "#",
  },
];

async function Footer() {
  const news =
    (await publicApi.getBlogList({ limit: "2" })).data?.blogs?.slice(0, 2) ??
    [];

  return (
    <footer>
      <div className="min-h-[510px] bg-neutral-bg-footer py-28 xl:py-10">
        <div className="mx-auto flex max-w-[1200px] flex-wrap xl:px-4">
          <div className="w-[300px] xl:w-1/2 sm:w-full">
            <div className="flex h-10 w-full items-center gap-2">
              <Image src="/logo.png" alt="" height={40} width={40} />
              <h1 className="text-3xl font-bold text-white">New3T</h1>
            </div>
            <p className="mt-2 text-neutral-text-secondary">
              Cung cấp những sản phẩm chất lượng với giá cả ưu đãi nhất.
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50
                   text-white transition-all hover:bg-primary-500/30">
                <Facebook width={20} height={20} />
              </Link>
              <Link
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50
                   text-white transition-all hover:bg-primary-500/30">
                <Youtube width={20} height={20} />
              </Link>
              <Link
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50
                   text-white transition-all hover:bg-primary-500/30">
                <Instagram width={20} height={20} />
              </Link>
            </div>
          </div>
          <div className="w-[170px] pl-4 xl:w-1/2 md:mt-5 sm:w-full">
            <h2 className="text-2xl font-semibold text-white">Khám phá</h2>
            <div className="h-1.5 w-20 rounded-full bg-primary-500"></div>
            <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-text-secondary">
              {exploreItems.map((item) => (
                <Link
                  href={item.url}
                  key={item.title}
                  className="flex items-center gap-2 font-semibold transition-all hover:text-primary-500">
                  <LeafIcon />
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[360px] pl-4 xl:mt-5 xl:w-1/2 sm:w-full">
            <h2 className="text-2xl font-semibold text-white">Tin mới</h2>
            <div className="h-1.5 w-20 rounded-full bg-primary-500"></div>
            <div className="mt-4 flex flex-col gap-4">
              {news.map((item, i) => (
                <Link
                  key={i}
                  href={`${path.blogs}/${item.slug}`}
                  className="px-16 md:px-0">
                  <h3 className="line-clamp-2 font-semibold text-white hover:underline">
                    {item.title}
                  </h3>
                  <span className="text-secondary-500">
                    {fromNow(item.updatedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[360px]  pl-4 xl:mt-5 xl:w-1/2 sm:w-full">
            <h2 className="text-2xl font-semibold text-white">Liên hệ</h2>
            <div className="h-1.5 w-20 rounded-full bg-primary-500"></div>
            <div className="mt-4 flex flex-col gap-2 text-neutral-text-secondary">
              <div className="flex items-center gap-2">
                <Call size={16} className="text-secondary-500" />
                <span>0388 070 776</span>
              </div>
              <div className="flex items-center gap-2">
                <EmailIcon />
                <span>iambravo680@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Location size={16} className="text-secondary-500" />
                <span>
                  14 Đinh Tiên Hoàng, phường 6, quận 10, TP Hồ Chí Minh
                </span>
              </div>
              <form className="flex h-14 w-full overflow-hidden rounded-md">
                <input
                  type="text"
                  placeholder="Địa chỉ email của bạn"
                  className="grow pl-4 caret-primary-500"
                />
                <button className="flex h-full w-20 cursor-pointer items-center justify-center bg-primary-500 text-white">
                  <Send2 />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1F1E17]">
        <div
          className="mx-auto flex min-h-[70px] max-w-[1200px] items-center justify-between 
        text-neutral-text-secondary xl:px-5 md:items-center md:py-4 sm:flex-col">
          <span>&copy; 2024 by bravo680</span>
          <span>
            <Link className="underline" href="#">
              Quyền và nghĩa vụ
            </Link>{" "}
            |
            <Link className="underline" href="#">
              {" "}
              Điều khoản bảo mật
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none">
      <path
        d="M11.1152 0.185547C11.0632 0.0683594 10.9753 0.00651073 10.8516 0C10.7279 -0.00651073 10.6335 0.0488281 10.5684 0.166016C10.4186 0.426433 10.2396 0.664062 10.0312 0.878906C9.82292 1.08724 9.59342 1.26628 9.34277 1.41602C9.09212 1.56575 8.82357 1.67969 8.53711 1.75781C8.25065 1.83594 7.95117 1.875 7.63867 1.875H6.07617C5.56185 1.875 5.07682 1.97266 4.62109 2.16797C4.16536 2.36328 3.7666 2.63184 3.4248 2.97363C3.08301 3.31543 2.81445 3.71419 2.61914 4.16992C2.42383 4.61914 2.32617 5.10417 2.32617 5.625C2.32617 5.6901 2.32943 5.75684 2.33594 5.8252C2.34245 5.89355 2.34896 5.96029 2.35547 6.02539C2.66797 5.80404 3.01628 5.59245 3.40039 5.39062C3.77799 5.1888 4.19792 5.01302 4.66016 4.86328C5.1224 4.71354 5.62695 4.59635 6.17383 4.51172C6.7207 4.42057 7.31315 4.375 7.95117 4.375C8.03581 4.375 8.10905 4.40592 8.1709 4.46777C8.23275 4.52962 8.26367 4.60286 8.26367 4.6875C8.26367 4.77214 8.23275 4.84538 8.1709 4.90723C8.10905 4.96908 8.03581 5 7.95117 5C6.7207 5 5.66276 5.16276 4.77734 5.48828C3.89193 5.8138 3.15137 6.19954 2.55566 6.64551C1.95996 7.09147 1.49609 7.54883 1.16406 8.01758C0.838542 8.48633 0.617188 8.86068 0.5 9.14062C0.434896 9.29688 0.434896 9.45475 0.5 9.61426C0.565104 9.77376 0.679036 9.88607 0.841797 9.95117C0.998047 10.0163 1.15592 10.0163 1.31543 9.95117C1.47493 9.88607 1.58724 9.77539 1.65234 9.61914C1.67188 9.58008 1.78743 9.37826 1.99902 9.01367C2.21061 8.64909 2.5638 8.25846 3.05859 7.8418C3.22135 8.05664 3.41341 8.26497 3.63477 8.4668C3.86263 8.66862 4.12142 8.84115 4.41113 8.98438C4.70085 9.1276 5.01823 9.23503 5.36328 9.30664C5.70833 9.37826 6.07943 9.39453 6.47656 9.35547C7.24479 9.29688 7.94792 9.0918 8.58594 8.74023C9.22396 8.38867 9.77409 7.92969 10.2363 7.36328C10.6986 6.79688 11.0599 6.13932 11.3203 5.39062C11.5742 4.64844 11.7012 3.85742 11.7012 3.01758C11.7012 2.52279 11.6507 2.03125 11.5498 1.54297C11.4489 1.05469 11.304 0.602214 11.1152 0.185547Z"
        fill="#A5A49A"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none">
      <g clipPath="url(#clip0_4140_677)">
        <path
          d="M14.2207 5.22266C14.2663 5.17708 14.321 5.17025 14.3848 5.20215C14.4486 5.23405 14.4805 5.2819 14.4805 5.3457V10.9375C14.4805 11.3021 14.3529 11.612 14.0977 11.8672C13.8424 12.1224 13.5326 12.25 13.168 12.25H1.79297C1.42839 12.25 1.11849 12.1224 0.863281 11.8672C0.608073 11.612 0.480469 11.3021 0.480469 10.9375V5.3457C0.480469 5.2819 0.510091 5.23405 0.569336 5.20215C0.628581 5.17025 0.685547 5.17708 0.740234 5.22266C1.05013 5.45964 1.48307 5.7832 2.03906 6.19336C2.59505 6.60352 3.57031 7.31445 4.96484 8.32617C5.2474 8.53581 5.61654 8.80697 6.07227 9.13965C6.52799 9.47233 6.9974 9.63411 7.48047 9.625C7.97266 9.63411 8.44661 9.47005 8.90234 9.13281C9.35807 8.79557 9.72721 8.52669 10.0098 8.32617C11.4043 7.31445 12.3773 6.60352 12.9287 6.19336C13.4801 5.7832 13.9108 5.45964 14.2207 5.22266ZM7.48047 8.75C7.16146 8.75911 6.80371 8.61328 6.40723 8.3125C6.01074 8.01172 5.69857 7.7793 5.4707 7.61523C3.6569 6.30273 2.51758 5.47103 2.05273 5.12012C1.58789 4.76921 1.14583 4.42969 0.726562 4.10156C0.653646 4.03776 0.594401 3.96029 0.548828 3.86914C0.503255 3.778 0.480469 3.68229 0.480469 3.58203V3.0625C0.480469 2.69792 0.608073 2.38802 0.863281 2.13281C1.11849 1.8776 1.42839 1.75 1.79297 1.75H13.168C13.5326 1.75 13.8424 1.8776 14.0977 2.13281C14.3529 2.38802 14.4805 2.69792 14.4805 3.0625V3.58203C14.4805 3.68229 14.4577 3.778 14.4121 3.86914C14.3665 3.96029 14.3073 4.03776 14.2344 4.10156C13.8151 4.42969 13.373 4.76921 12.9082 5.12012C12.4434 5.47103 11.304 6.30273 9.49023 7.61523C9.26237 7.7793 8.9502 8.01172 8.55371 8.3125C8.15723 8.61328 7.79948 8.75911 7.48047 8.75Z"
          fill="#EEC044"
        />
      </g>
      <defs>
        <clipPath id="clip0_4140_677">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="matrix(1 0 0 -1 0.480469 14)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Footer;
