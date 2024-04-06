import Image from "next/image";
import { Edit, Edit2, Moneys } from "iconsax-react";
import clsx from "clsx";

function Checkout() {
  return (
    <div>
      <div className="flex h-[240px] items-end justify-center bg-neutral-bg-footer/90 pb-8">
        <h3 className="text-xl font-bold text-white">Xác nhận đơn hàng</h3>
      </div>
      <div className="flex min-h-[calc(100vh-240px)] gap-5 bg-gray-100 px-5 py-10 lg:flex-col">
        <div className="flex grow flex-col gap-5">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              Địa chỉ nhận hàng
              <i className="ripple cursor-pointer rounded-full p-1 text-neutral-text-secondary hover:opacity-80">
                <Edit2 size={16} />
              </i>
            </h3>
            <div>
              <span>Nguyen Van A</span>
              <span className="ml-4">01234567890</span>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                  Văn phòng
                </div>
                <span>
                  Xóm ngọc thạnh B, thôn Ngọc Thạnh 1, xã Phước An, huyện Tuy
                  Phước, tỉnh Bình Định
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
            <PItem className="border-b border-b-slate-200" />
            <PItem className="border-b border-b-slate-200" />
            <PItem />
          </div>
        </div>
        <div className="w-[400px] shrink-0 lg:w-full">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Phương thức thanh toán
            </h3>
            <div className="ripple mt-4 cursor-pointer rounded-md border border-slate-200 p-4">
              <div className="mt-3 flex gap-2">
                <Moneys size={20} className="text-neutral-text-secondary" />
                <span className="font-semibold">Thanh toán khi nhận hàng</span>
                <div className="relative ml-auto h-5 w-5 rounded-full bg-blue-500">
                  <div className="absolute left-1/2 top-1/2 h-3/5 w-3/5 translate-x-[-50%] translate-y-[-50%] rounded-full bg-white"></div>
                </div>
              </div>
              <p className="mt-4 text-neutral-text-secondary">
                Thanh toán khi đơn hàng được giao đến bạn
              </p>
            </div>

            <h3 className="mb-4 mt-5 text-lg font-semibold">
              Tổng kết đơn hàng
            </h3>
            <div className="border-b border-slate-200 pb-4">
              <div className="flex justify-between">
                <span className="text-neutral-text-secondary">
                  Tổng tạm tính
                </span>
                <span className="font-semibold">&#8363;20000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-text-secondary">
                  Phí vận chuyển
                </span>
                <span className="font-semibold">&#8363;16000</span>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <span>Tổng cộng</span>
                <span className="text-lg font-semibold text-primary-500">
                  &#8363;36000
                </span>
              </div>
              <button
                className="ripple transition- all mt-4 w-full rounded-md bg-primary-500
                py-2 font-semibold text-white duration-300 active:shadow-primary">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PItem({ className }: { className?: string }) {
  return (
    <div className={clsx("flex gap-4 pb-2 sm:flex-wrap sm:gap-0", className)}>
      <div className="relative h-20 w-20 shrink-0">
        <Image src="/images/product/apple.png" alt="" fill />
      </div>
      <div className="grow sm:w-[calc(100%-96px)] sm:grow-0">
        <h4 className="font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, soluta.
        </h4>
        <span className="text-neutral-text-secondary">Đen, M</span>
      </div>
      <div className="flex w-36 flex-col sm:w-full sm:flex-row sm:gap-2">
        <span className="text-lg font-bold text-primary-500">
          &#8363;143000
        </span>
        <span className="text-neutral-text-secondary line-through">
          &#8363;143000
        </span>
        <span>-52%</span>
      </div>
      <span className="sm:full block w-24 shrink-0">
        Số lượng: <span className="font-bold">1</span>
      </span>
    </div>
  );
}

export default Checkout;
