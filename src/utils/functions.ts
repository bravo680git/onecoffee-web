export const transformCurrency = (price?: number, salePercent?: number) => {
  if (!price) return "₫" + 0;
  let prePrice = price;
  if (salePercent) {
    prePrice = (prePrice * (100 - salePercent)) / 100;
  }
  const parts = prePrice.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return "₫" + parts.join(".");
};
