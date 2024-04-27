export enum ORDER_STATUS {
  NEW = "NEW",
  CONFIRMED = "CONFIRMED",
  DELIVERING = "DELIVERING",
  SUCCESS = "SUCCESS",
  CANCEL = "CANCEL",
  NOT_EXECUTE = "NOT_EXECUTE",
  FAIL = "FAIL",
}

export const ORDER_STATUS_DIST = {
  [ORDER_STATUS.NEW]: {
    title: "Đã tiếp nhận",
    content:
      "Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian sớm nhất",
    color: "#3498db",
  },
  [ORDER_STATUS.CONFIRMED]: {
    title: "Đã xác nhận",
    content: "Đơn hàng đã được xác nhận và chuẩn bị vận chuyển",
    color: "#27ae60",
  },
  [ORDER_STATUS.DELIVERING]: {
    title: "Đang vận chuyển",
    content: "Đơn hàng đang được vận chuyển đến với bạn",
    color: "#f39c12",
  },
  [ORDER_STATUS.SUCCESS]: {
    title: "Thành công",
    content: "Đơn hàng đã được giao thành công",
    color: "#2ecc71",
  },
  [ORDER_STATUS.CANCEL]: {
    title: "Đã hủy",
    content: "Đơn hàng bị hủy",
    color: "#e74c3c",
  },
  [ORDER_STATUS.NOT_EXECUTE]: {
    title: "Không tiếp nhận",
    content: "Đơn hàng không được thực hiện",
    color: "#95a5a6",
  },
  [ORDER_STATUS.FAIL]: {
    title: "Thất bại",
    content: "Đơn hàng được không vận chuyển được đến bạn",
    color: "#c0392b",
  },
};
