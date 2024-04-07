import React from "react";
import Footer from "./components/Footer";
import Header, { type MenuItem } from "./components/Header";
import { path } from "@/config/path";

const menuItems: MenuItem[] = [
  {
    key: "home",
    title: "Trang chủ",
    path: path.home,
  },
  {
    key: "about",
    title: "Về chúng tôi",
    path: "/about",
  },
  {
    key: "product",
    title: "Sản phẩm",
    path: path.products,
    children: [
      {
        key: "rice",
        title: "Gạo",
        path: `${path.products}?c=gao`,
      },
      {
        key: "cf",
        title: "Cafe",
        path: `${path.products}?c=cafe`,
      },
      {
        key: "other",
        title: "Thực phẩm khác",
        path: `${path.products}?c=thuc-pham-khac`,
      },
    ],
  },
  {
    key: "blog",
    title: "Bài viết",
    path: "/blogs",
    children: [
      {
        key: "tip",
        title: "Mẹo vặt",
        path: "/blogs/tip",
      },
      {
        key: "news",
        title: "Tin tức",
        path: "/blogs/news",
      },
      {
        key: "sale",
        title: "Chương trình ưu đãi",
        path: "/blogs/sale",
      },
    ],
  },
  {
    key: "contact",
    title: "Liên hệ",
    path: "/contact",
  },
];

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header menuItems={menuItems} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
