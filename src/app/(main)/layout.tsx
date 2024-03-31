import React from "react";
import Footer from "./components/Footer";
import Header, { type MenuItem } from "./components/Header";

const menuItems: MenuItem[] = [
  {
    key: "home",
    title: "Trang chủ",
    path: "/",
  },
  {
    key: "about",
    title: "Về chúng tôi",
    path: "/about",
  },
  {
    key: "product",
    title: "Sản phẩm",
    path: "/products",
    children: [
      {
        key: "rice",
        title: "Gạo",
        path: "/products/rice",
      },
      {
        key: "cf",
        title: "Cafe",
        path: "/products/coffee",
      },
      {
        key: "other",
        title: "Thực phẩm khác",
        path: "/products/other",
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
