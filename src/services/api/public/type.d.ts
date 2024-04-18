export type Category = {
  category: {
    id: number;
    name: string;
    parentId?: number;
  }[];
};

type Banner = {
  banners: {
    id: number;
    image: string;
    caption?: string;
    link: string;
  }[];
};
