"use server";

import { cookies } from "next/headers";

export const checkLogin = async () => {
  const token = cookies().get("_token")?.value;
  return !!token;
};
