import { cookies } from "next/headers";

export async function apiClient<T = unknown>(
  path: string,
  config?: Parameters<typeof fetch>[1] & { query?: Record<string, string> },
  clientToken?: string,
) {
  const serverToken = cookies().get("token");
  const queryString = new URLSearchParams(config?.query ?? {}).toString();
  const url = path.startsWith("http") ? path : process.env.BASE_URL + path;

  return fetch(url + queryString, {
    ...config,
    headers: {
      ...config?.headers,
      token: clientToken || (serverToken?.value ?? ""),
    },
  }).then((res) => res.json() as T);
}
