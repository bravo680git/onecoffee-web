import { CoffeeIcon, TiktokIcon } from "@/components/Icons";
import { path } from "@/config/path";
import { CONTACT } from "@/utils/contact";
import { Facebook, Instagram, Location } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "./Header";

async function Footer({ blogMenuItems = [] }: { blogMenuItems: MenuItem[] }) {
  const exploreItems: MenuItem[] = [
    {
      title: "Sản phẩm",
      path: path.products,
      key: "product",
    },
    ...blogMenuItems,
  ];

  return (
    <footer>
      <div className="min-h-[510px] bg-neutral-bg-footer py-28 xl:py-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-5 gap-10 xl:px-6 lg:grid-cols-2 sm:grid-cols-1">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <Link href="https://new3t.com">
                <Image src="/new3t-logo.png" alt="" width={80} height={80} />
              </Link>
              <Link
                href={path.home}
                className="flex h-10 w-full items-center gap-2">
                <Image src="/logo-dark.png" alt="" height={40} width={160} />
              </Link>
            </div>
            <p className="mt-3 text-neutral-text-secondary">
              <b>ONe Coffee</b> không đơn giản là những hương vị nguyên bản tự
              nhiên. Từng giọt cà phê, từng hương trà đều chứa đựng một phần của
              trái tim và tâm hồn của <b>ONe</b> và bạn.
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href={CONTACT.facebook}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-black/50
                   text-white transition-all hover:bg-primary-500/30">
                <Facebook size={20} />
              </Link>
              {/* <Link
                href={CONTACT.youtube}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-black/50
                   text-white transition-all hover:bg-primary-500/30">
                <Youtube size={20} />
              </Link> */}
              <Link
                href={CONTACT.instagram}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-black/50
                   text-white transition-all hover:bg-primary-500/30">
                <Instagram size={20} />
              </Link>
              <Link
                href={CONTACT.tiktok}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-black/50
                   text-xl text-white transition-all hover:bg-primary-500/30">
                <TiktokIcon />
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-lg text-white">Giới thiệu</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-text-secondary">
              {exploreItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.key}
                  className="flex items-center gap-2 transition-all hover:underline">
                  <CoffeeIcon />
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg text-white">Điều khoản</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-text-secondary">
              <Link
                href={`${path.blogs}/dieu-khoan`}
                className="flex items-center gap-2 transition-all hover:underline">
                <h3>Điều khoản sử dụng</h3>
              </Link>
              <Link
                href={`${path.blogs}/quyen-rieng-tu`}
                className="flex items-center gap-2 transition-all hover:underline">
                <h3>Chính sách quyền riêng tư</h3>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-lg text-white">Liên hệ</h2>
            <div className="mt-4 flex flex-col gap-2 text-neutral-text-secondary">
              {/* <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-2 hover:underline">
                <Call size={16} className="text-secondary-500" />
                <span>{CONTACT.phone}</span>
              </a> */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 hover:underline">
                <EmailIcon />
                <span>{CONTACT.email}</span>
              </a>
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                className="flex items-center gap-2 hover:underline">
                <Location size={32} className="text-secondary-500" />
                <span>{CONTACT.address}</span>
              </a>
            </div>
          </div>

          <div className="mt-4 hidden aspect-video w-full sm:block">
            <iframe
              src={CONTACT.embedMapUrl}
              width="100%"
              height="100%"
              loading="lazy"></iframe>
          </div>
        </div>
      </div>
      <div className="bg-[#1F1E17]">
        <div
          className="mx-auto flex min-h-[70px] max-w-[1200px] items-center justify-between 
        text-neutral-text-secondary xl:px-5 md:items-center md:py-4 sm:flex-col">
          <span>&copy; 2024 by New3T</span>
          <span>Sản phẩm của công ty cổ phần Thuận Tất Thành</span>
        </div>
      </div>
    </footer>
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
          fill="#F0A500"
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
