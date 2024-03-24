import { cookies } from "next/headers";

export async function apiClient<T = unknown>(
  path: string,
  config?: Parameters<typeof fetch>[1]
) {
  const token = cookies().get("token");

  return fetch(process.env.BASE_URL + path, {
    ...config,
    headers: {
      ...config?.headers,
      token: token?.value ?? "",
    },
  }).then((res) => res.json() as T);
}
