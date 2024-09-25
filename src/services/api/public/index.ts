import { ApiConfig, publicApiClient } from "..";
import {
  Banner,
  BlogQueries,
  BlogType,
  BlogsByCategoryType,
  Category,
  District,
  ProductQueries,
  ProductRateType,
  ProductRatesResponse,
  ProductType,
  Province,
  ResponseMeta,
  Ward,
} from "./type";

export const publicApi = {
  getCategoryList(q?: string, config?: ApiConfig) {
    return publicApiClient<BaseResponse<Category[]>>("/category", {
      ...config,
      next: { tags: ["category"] },
      query: { name: q },
    });
  },
  getBannerList(config?: ApiConfig) {
    return publicApiClient<BaseResponse<Banner[]>>("/banner", {
      ...config,
      next: { tags: ["banner"] },
    });
  },
  getProductList(query?: ProductQueries, config?: ApiConfig) {
    return publicApiClient<BaseResponse<ProductType[], ResponseMeta>>(
      "/product",
      {
        ...config,
        query,
        next: { tags: ["product"] },
      },
    );
  },
  getProductDetail(id: string) {
    return publicApiClient<BaseResponse<ProductType>>(`/product/${id}`, {
      next: { tags: [`product-${id}`] },
    });
  },
  getProvinceList() {
    return publicApiClient<
      BaseResponse<{
        provinces: Province[];
      }>
    >("/province");
  },
  getDistrictListByProvince(code: number) {
    return publicApiClient<
      BaseResponse<{
        districts: District[];
      }>
    >(`/province/district/${code}`);
  },
  getWardListByDistrict(code: number) {
    return publicApiClient<
      BaseResponse<{
        wards: Ward[];
      }>
    >(`/province/ward/${code}`);
  },
  getProductRates(productId: string) {
    return publicApiClient<BaseResponse<ProductRatesResponse>>(
      `/product/rate/${productId}`,
      { next: { tags: [`rate-${productId}`] } },
    );
  },
  getBlogList(query?: BlogQueries) {
    return publicApiClient<BaseResponse<BlogType[], ResponseMeta>>("/blog", {
      next: { tags: ["blog"] },
      query,
    });
  },
  getBlogDetail(slug: string) {
    return publicApiClient<BaseResponse<BlogType>>(`/blog/${slug}`, {
      next: { tags: [`blog-${slug}`] },
    });
  },
  getCategoryBlogs(limit = 3) {
    return publicApiClient<BaseResponse<BlogsByCategoryType[]>>(
      "/blog/by-category",
      {
        query: { limit: limit.toString() },
        next: { tags: ["blog"] },
      },
    );
  },
};

export type {
  Banner,
  Category,
  District,
  ProductQueries,
  ProductRateType,
  ProductRatesResponse,
  Province,
  Ward,
  BlogType,
  BlogQueries,
  BlogsByCategoryType,
  ProductType,
};
