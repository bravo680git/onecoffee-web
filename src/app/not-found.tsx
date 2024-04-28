import { path } from "@/config/path";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 bg-[#1F1E17] p-4">
      <div className="relative aspect-square w-full max-w-[600px] overflow-hidden rounded-xl">
        <Image src="/images/404.jpg" alt="404" fill />
      </div>
      <p className="mt-2 text-lg font-bold text-white">
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
