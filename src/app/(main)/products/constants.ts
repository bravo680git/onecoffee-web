export enum OrderType {
  popular = "popular",
  newest = "newest",
  priceAsc = "price-asc",
  priceDesc = "price-desc",
}

export const ORDER_TYPE_DIST: Record<string, string | undefined> = {
  [OrderType.popular]: "buy:desc",
  [OrderType.newest]: undefined,
  [OrderType.priceAsc]: "price:asc",
  [OrderType.priceDesc]: "price:desc",
};
