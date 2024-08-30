type PageProps<
  P extends string[],
  S extends string[],
  T extends object = {},
> = {
  params: Record<P[number], string>;
  searchParams: Record<S[number], string>;
} & T;

type BaseResponse<T = null, M = null> = {
  statusCode: number;
  message: string;
  data?: T;
  meta: M;
};
