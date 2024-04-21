"use server";

import { ServerError } from "@/config/response";
import { CreateAddressPayload, protectedApi, publicApi } from "@/services/api";

export const getProvinces = async () => {
  try {
    return (await publicApi.getProvinceList()).data?.provinces ?? [];
  } catch {
    return [];
  }
};

export const getDistrictsByProvince = async (code: number) => {
  try {
    return (
      (await publicApi.getDistrictListByProvince(code)).data?.districts ?? []
    );
  } catch {
    return [];
  }
};

export const getWardsByDistrict = async (code: number) => {
  try {
    return (await publicApi.getWardListByDistrict(code)).data?.wards ?? [];
  } catch {
    return [];
  }
};

export const createAddress = async (payload: CreateAddressPayload) => {
  try {
    const data = await protectedApi.createAddress(payload);
    return data;
  } catch (error) {
    return ServerError;
  }
};

export const getAddressList = async () => {
  try {
    const data = await protectedApi.getAddressList();
    return data;
  } catch (error) {
    return ServerError;
  }
};
