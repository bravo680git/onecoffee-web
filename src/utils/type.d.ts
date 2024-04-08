type PageProps<
  P extends string[],
  S extends string[],
  T extends object = {},
> = {
  params: Record<P[number], string>;
  searchParams: Record<S[number], string>;
} & T;

type BaseResponse<T = unknown> = {
  status: number;
  message: string;
  data?: T;
};
