import { publicApiClient, ApiConfig } from "..";
import { Category } from "./type";

export const publicApi = {
  getCategoryList(q?: string, config?: ApiConfig) {
    return publicApiClient<BaseResponse<Category>>("/category", {
      ...config,
      query: { name: q },
    });
  },
};
