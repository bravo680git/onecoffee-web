import { publicApiClient, ApiConfig } from "..";
import {
  Banner,
  Category,
  ProductQueries,
  ProductResponse,
  ProductsResponse,
} from "./type";

export const publicApi = {
  getCategoryList(q?: string, config?: ApiConfig) {
    return publicApiClient<BaseResponse<Category>>("/category", {
      ...config,
      next: { tags: ["category"] },
      query: { name: q },
    });
  },
  getBannerList(config?: ApiConfig) {
    return publicApiClient<BaseResponse<Banner>>("/banner", {
      ...config,
      next: { tags: ["banner"] },
    });
  },
  getProductList(query?: ProductQueries, config?: ApiConfig) {
    return publicApiClient<BaseResponse<ProductsResponse>>("/product", {
      ...config,
      query,
      next: { tags: ["product"] },
    });
  },
  getProductDetail(id: string, config?: ApiConfig) {
    return publicApiClient<BaseResponse<ProductResponse>>(`/product/${id}`, {
      ...config,
      next: { tags: [`product:${id}`] },
    });
  },
};
