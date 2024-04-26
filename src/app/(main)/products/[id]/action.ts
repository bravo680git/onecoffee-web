"use server";

import { ServerError } from "@/config/response";
import { CreateRatePayload, protectedApi } from "@/services/api";
import { revalidateTag } from "next/cache";

export const createRate = async (payload: CreateRatePayload) => {
  try {
    return await protectedApi.createRate(payload);
  } catch (error) {
    return ServerError;
  }
};

export const revalidate = (productId: string) => {
  revalidateTag(`rate-${productId}`);
  revalidateTag(`product`);
  revalidateTag(`product-${productId}`);
};
