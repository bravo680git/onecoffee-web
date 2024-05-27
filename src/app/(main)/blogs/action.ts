"use server";

import { publicApi } from "@/services/api";

export const loadMoreBlogs = async (page: number, size: number) => {
  try {
    return (
      (
        await publicApi.getBlogList({
          page: page.toString(),
          limit: size.toString(),
        })
      )?.data?.blogs ?? []
    );
  } catch (error) {
    return [];
  }
};
