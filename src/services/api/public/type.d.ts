import { UserInfo } from "../protected";

export type Category = {
  id: number;
  name: string;
  parentId?: number;
  image?: string;
};

type Banner = {
  id: number;
  image: string;
  caption?: string;
  link: string;
};

type ProductType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price?: number;
  minPrice: number;
  maxPrice: number;
  stockQuantity?: number;
  salePercent: number;
  unit: string;
  seoKeyword: string;
  seoDescription: string;
  category: Category["categories"][number];
  variantProps?: {
    type: string;
    values: string[];
  }[];
  variants?: {
    id: number;
    values: string[];
    price: number;
    stockQuantity: number;
  }[];
  averageRate: number;
  extraOptions?: {
    name: string;
    price: number;
  }[];
  pin: boolean;
};

type ResponseMeta = {
  total: number;
  size: number;
  current: number;
};

type ProductQueries = {
  name?: string;
  page?: string;
  limit?: string;
  sort?: string;
  category?: string;
  price?: string;
  pin?: string;
};

type Province = {
  name: string;
  code: number;
};
type District = Province;
type Ward = Province;

type ProductRateType = {
  id: number;
  rating: number;
  comment: string;
  product: ProductType;
  variant?: unknown;
  user: UserInfo;
  createdAt: string;
};

type ProductRatesResponse = {
  rates: ProductRateType[];
  averageRate: number;
  totalRate: number;
  countRate: Record<number, number>;
};

type BlogType = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  categoryId: number;
  category: Category;
  seoKeyword: string;
  seoDescription: string;
  updatedAt: string;
  createdAt?: string;
};

type BlogQueries = {
  page?: string;
  limit?: string;
  title?: string;
  category?: string;
};

type BlogsByCategoryType = {
  id: number;
  name: string;
  blogs: BlogType[];
};
