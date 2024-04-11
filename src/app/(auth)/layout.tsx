import Footer from "@/app/(main)/components/Footer";
import { path } from "@/config/path";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="flex items-center gap-4 bg-neutral-bg-footer/90 p-4">
        <Link href={path.home}>
        <Image src="/logo.png" width={60} height={60} alt="" /></Link>
        <h3 className="text-lg font-semibold text-white">New3T Store</h3>
      </header>
      <main>
        <div className="relative flex min-h-[calc(100vh-92px)] w-full items-center justify-center">
          <Image
            fill
            src="/images/home/home-wallpaper.png"
            alt=""
            className="object-center sm:object-cover"
          />
          <div className="z-10 w-[400px] sm:w-full sm:px-4">{children}</div>
          <div className="w-[600px] sm:hidden">
            <div className="relative h-[200px] w-[200px]"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
