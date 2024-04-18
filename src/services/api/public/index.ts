import { publicApiClient, ApiConfig } from "..";
import { Banner, Category } from "./type";

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
};
