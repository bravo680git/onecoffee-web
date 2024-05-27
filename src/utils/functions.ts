export const transformCurrency = (price?: number, salePercent?: number) => {
  if (!price) return 0 + "₫";
  let prePrice = price;
  if (salePercent) {
    prePrice = (prePrice * (100 - salePercent)) / 100;
  }
  const parts = prePrice.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".") + "₫";
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

export const fromNow = (dateTime: string) => {
  const date = new Date(dateTime);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 60) {
    return "Gần đây";
  } else if (diff < 60 * 60) {
    return `${Math.round(diff / 60)} phút trước`;
  } else if (diff < 60 * 60 * 24) {
    return `${Math.round(diff / 60 / 60)} giờ trước`;
  } else {
    return date.toLocaleString("vi", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }
};

export const getPlainTextFromHtml = (input: string) => {
  return input.replace(/<[^>]+>|&[^;]+;/g, " ").slice(0, 300) + "...";
};
