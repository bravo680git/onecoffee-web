import { BreadcrumbItem } from "@/components/Breadcrumb";
import { path } from "@/config/path";
import { protectedApi } from "@/services/api";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import OrderItem from "./components/OrderItem";

const breakCrumbItems: BreadcrumbItem[] = [
  {
    title: "Trang chủ",
    url: path.home,
  },
  {
    title: "Đơn hàng",
  },
];

async function Orders() {
  const items = (await protectedApi.getUserOrderList()).data?.orders;
  if (!items) {
    return;
  }

  return (
    <div>
      <PageHeader title="Đơn hàng của tôi" breadcrumbItems={breakCrumbItems} />
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
