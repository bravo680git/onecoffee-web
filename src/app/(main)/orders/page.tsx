import { path } from "@/config/path";
import { protectedApi } from "@/services/api";
import Link from "next/link";
import OrderItem from "./components/OrderItem";

async function Orders() {
  const items = (await protectedApi.getUserOrderList()).data?.orders;
  if (!items) {
    return;
  }

  return (
    <div>
      <div className="flex h-[240px] items-end justify-center bg-neutral-bg-footer/90 pb-8">
        {/* <h3 className="text-xl font-bold text-white">Đơn hàng của tôi</h3> */}
      </div>
      <div className="bg-gray-100">
        <div className="mx-auto flex min-h-[calc(100vh-240px)] max-w-[800px] flex-col gap-5 px-5 py-10">
          {items.map((item, index) => (
            <OrderItem data={item} key={index} />
          ))}
          {items.length === 0 && (
            <p className="text-center text-neutral-text-secondary">
              Bạn chưa có đơn hàng nào.{" "}
              <Link
                href={path.products}
                className="text-neutral-text-primary hover:underline">
                Bắt đầu mua sắm ngay
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
