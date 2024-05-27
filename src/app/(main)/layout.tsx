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
      .then((data) => data?.data?.categories)
      .catch()) ?? [];

  const productCategories = generateMenuItem(
    path.products,
    categories.filter((item) => item.parentId === CATEGORY.PRODUCT),
  );
  const blogCategories = generateMenuItem(
    path.blogs,
    categories.filter((item) => item.parentId === CATEGORY.BLOG),
  );

  const menuItems: MenuItem[] = [
    ...productCategories.slice(0, 2),
    {
      key: "product",
      title: "Sản phẩm",
      path: path.products,
      children: productCategories,
    },
    {
      key: "blog",
      title: "Bài viết",
      path: path.blogs,
      children: blogCategories,
    },
    ...blogCategories.slice(0, 2),
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
