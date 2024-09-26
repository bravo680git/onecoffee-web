import { cookies } from "next/headers";

export type ApiConfig = Parameters<typeof fetch>[1];

const generateUrl = (baseUrl: string, path: string) => {
  return path.startsWith("http") ? path : baseUrl + path;
};

const generateQueryString = (query?: Record<string, string | undefined>) => {
  return (
    "?" +
    new URLSearchParams(
      Object.keys(query ?? {}).reduce<Record<string, string>>((acc, crr) => {
        const value = query?.[crr];
        if (value) {
          acc[crr] = value;
        }
        return acc;
      }, {}),
    ).toString()
  );
};

export async function protectedApiClient<T = unknown>(
  path: string,
  config?: ApiConfig & {
    query?: Record<string, string | undefined>;
  },
) {
  const serverToken = cookies().get("_token");
  const queryString = generateQueryString(config?.query);

  const url = generateUrl(process.env.BASE_URL, path);

  const requestHeader = config?.headers ?? {};

  if (config?.body && !(config.body instanceof FormData)) {
    (requestHeader as Record<string, string>)["Content-Type"] =
      "Application/json";
  }

  return fetch(url + queryString, {
    ...config,
    headers: {
      ...requestHeader,
      Authorization: serverToken?.value ? `Bearer ${serverToken.value}` : "",
    },
  }).then((res) => {
    if (res.status === 401) {
      cookies().delete("_token");
    }

    return res.ok ? (res.json() as T) : undefined;
  });
}

export async function publicApiClient<T = unknown>(
  path: string,
  config?: ApiConfig & {
    query?: Record<string, string | undefined>;
  },
) {
  const queryString = generateQueryString(config?.query);

  const url = generateUrl(process.env.BASE_URL, path);

  return fetch(url + queryString, {
    ...config,
  }).then((res) => (res.ok ? (res.json() as T) : undefined));
}
