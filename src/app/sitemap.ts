import { MetadataRoute } from "next";
import { path } from "../config/path";
import { publicApi } from "../services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = (await publicApi.getProductList())?.data?.products ?? [];
  const blogs = (await publicApi.getBlogList())?.data?.blogs ?? [];

  return [
    {
      url: path.home,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...products.map((item) => ({
      url: `${path.products}/${item.slug}`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "weekly" as const,
    })),
    ...blogs.map((item) => ({
      url: `${path.blogs}/${item.slug}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    })),
  ];
}
