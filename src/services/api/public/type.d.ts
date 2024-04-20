export type Category = {
  categories: {
    id: number;
    name: string;
    parentId?: number;
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
    values: string[];
    price: number;
    stockQuantity: number;
  }[];
  averageRate: number;
  totalRate: number;
};

type ProductsResponse = {
  products: ProductType[];
  meta: {
    total: number;
    lastPage: number;
    perPage: number;
    currentPage: number;
  };
};

type ProductResponse = {
  product: ProductType;
};

type ProductQueries = {
  name?: string;
  page?: string;
  limit?: string;
  sort?: string;
  filter?: string;
};
