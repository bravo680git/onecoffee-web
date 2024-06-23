import { UserInfo } from "../protected";

export type Category = {
  categories: {
    id: number;
    name: string;
    parentId?: number;
    image?: string;
  }[];
};

type Banner = {
  banners: {
    id: number;
    image: string;
    caption?: string;
    link: string;
  }[];
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
  extraOptions: {
    name: string;
    price: number;
  }[];
  pin: boolean;
};

type ResponseMeta = {
  total: number;
  lastPage: number;
  perPage: number;
  currentPage: number;
};

type ProductsResponse = {
  products: ProductType[];
  meta: ResponseMeta;
};

type ProductResponse = {
  product: ProductType;
  averageRate: number;
  totalRate: number;
};

type ProductQueries = {
  name?: string;
  page?: string;
  limit?: string;
  sort?: string;
  filter?: string;
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
  thumbnail: string;
  categoryId: number;
  category: Category["categories"][number];
  seoKeyword: string;
  seoDescription: string;
  updatedAt: string;
};

type BlogQueries = {
  page?: string;
  limit?: string;
  title?: string;
  filter?: string;
};

type BlogsResponse = {
  blogs: BlogType[];
  meta: ResponseMeta;
};

type BlogsByCategoryType = {
  id: number;
  name: string;
  blogs: BlogType[];
};
