import { apiClient, ApiConfig } from "..";
import { Category } from "./type";

export const publicApi = {
  getCategoryList(q?: string, config?: ApiConfig) {
    return apiClient<BaseResponse<Category>>("/category", {
      ...config,
      query: { name: q },
    });
  },
};
