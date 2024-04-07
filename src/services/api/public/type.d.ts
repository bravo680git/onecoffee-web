export type Province = {
  _id: string;
  name: string;
  code: string;
};

type District = Province;
type Ward = Province;
type PublicData<T = unknown> = {
  data: {
    data: T;
  };
};
