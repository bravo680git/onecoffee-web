import { Category } from "@/services/api/public/type";
import { QueryKey } from "@/utils/constants";

export const generateMenuItem = (path: string, data: Category["categories"]) =>
  data.map((item) => ({
    ...item,
    key: item.id.toString(),
    title: item.name,
    path: `${path}?${QueryKey.category}=${item.id}`,
  }));

export const generateProductFilter = (
  from?: string,
  to?: string,
  category?: string,
) => {
  const priceRange = [from ? +from : 0, to ? +to : Number.MAX_SAFE_INTEGER];
  const categoryStr = category
    ? JSON.stringify(category.split(",").map((c) => +c))
    : undefined;
  const result: string[] = [];
  if (from && to) {
    result.push(`price:${JSON.stringify(priceRange)}`);
  }
  if (categoryStr) {
    result.push(`category:${categoryStr}`);
  }

  return result.join(";");
};
