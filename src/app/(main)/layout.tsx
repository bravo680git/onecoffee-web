import { path } from "@/config/path";
import { publicApi } from "@/services/api/public";
import { CATEGORY } from "@/utils/constants";
import React from "react";
import Footer from "./components/Footer";
import Header, { type MenuItem } from "./components/Header";
import { generateMenuItem } from "./helper";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const categories =
    (await publicApi
      .getCategoryList()
      .then((data) => data.data?.category)
      .catch()) ?? [];

  const productCategories = categories.filter(
    (item) => item.parentId === CATEGORY.PRODUCT,
  );
  const blogCategories = categories.filter(
    (item) => item.parentId === CATEGORY.BLOG,
  );

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
      children: generateMenuItem(productCategories),
    },
    {
      key: "blog",
      title: "Bài viết",
      path: path.blogs,
      children: generateMenuItem(blogCategories),
    },
    {
      key: "contact",
      title: "Liên hệ",
      path: "/contact",
    },
  ];

  return (
    <div>
      <Header menuItems={menuItems} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
