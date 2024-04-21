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

export const stringTest = (value: string | number, searchStr?: string) => {
  if (!value || !searchStr) {
    return true;
  }

  const normalizedKeyword = searchStr
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");

  const normalizedString = value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");

  return normalizedString.includes(normalizedKeyword);
};
