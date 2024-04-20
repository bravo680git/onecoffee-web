import { publicApiClient, ApiConfig } from "..";
import {
  Banner,
  Category,
  District,
  ProductQueries,
  ProductResponse,
  ProductsResponse,
  Province,
  Ward,
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
};

export type {
  Banner,
  Category,
  District,
  ProductQueries,
  ProductResponse,
  ProductsResponse,
  Province,
  Ward,
};
