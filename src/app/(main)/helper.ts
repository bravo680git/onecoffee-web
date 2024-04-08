import { path } from "@/config/path";
import { Category } from "@/services/api/public/type";

export const generateMenuItem = (data: Category["category"]) =>
  data.map((item) => ({
    key: item.id.toString(),
    title: item.name,
    path: `${path.products}?c=${item.id}`,
  }));
