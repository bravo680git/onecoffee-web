import { apiClient } from "..";
import { Province, PublicData } from "./type";

const BASE_URL = "https://vn-public-apis.fpo.vn";

export const publicApi = {
  getAllProvince() {
    const url = BASE_URL + "/provinces/getAll?limit=-1";
    return apiClient<PublicData<Province[]>>(url);
  },
  getDistrictByProvinceId(provinceCode: string) {
    const url = BASE_URL + `/districts/getByProvince`;
    return apiClient(url, { query: { provinceCode } });
  },
};
