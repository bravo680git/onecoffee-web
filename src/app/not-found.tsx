import { path } from "@/config/path";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 p-4">
      <Link
        href={path.home}
        className="fixed left-5 top-5 aspect-video w-[200px] sm:relative sm:left-0 sm:top-0 sm:w-40">
        <Image src="/logo.png" fill alt="one coffee" objectFit="contain" />
      </Link>
      <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-xl">
        <Image src="/images/404.jpg" alt="404" fill />
      </div>
      <p className="mt-5 text-lg font-bold">
        Có sự cố xảy ra khi tải trang, vui lòng thử lại sau
      </p>
      <Link
        href={path.home}
        className="font-semibold text-primary-500 hover:underline">
        Trở về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;
