import { cookies } from "next/headers";

export type ApiConfig = Parameters<typeof fetch>[1];

export async function apiClient<T = unknown>(
  path: string,
  config?: ApiConfig & {
    query?: Record<string, string | undefined>;
  },
  clientToken?: string,
) {
  const serverToken = cookies().get("token");
  const queryString = new URLSearchParams(
    Object.keys(config?.query ?? {}).reduce<Record<string, string>>(
      (acc, crr) => {
        const value = config?.query?.[crr];
        if (value) {
          acc[crr] = value;
        }
        return acc;
      },
      {},
    ),
  ).toString();
  const url = path.startsWith("http") ? path : process.env.BASE_URL + path;

  return fetch(url + queryString, {
    ...config,
    headers: {
      ...config?.headers,
      token: clientToken || (serverToken?.value ?? ""),
    },
  }).then((res) => res.json() as T);
}
