import { Add, Minus } from "iconsax-react";

function ProductPrice() {
  return (
    <div className="mt-5 w-full">
      <span className="text-xl font-bold text-primary-500">50000d</span>
      <div className="text-neutral-text-secondary">
        <span className="line-through">180000d</span>
        <span className="ml-2 font-semibold">-20%</span>
      </div>
      <hr className="mt-5 text-neutral-text-secondary" />
      <div className="mt-5">
        <span className="font-semibold text-neutral-text-secondary">
          Màu sắc
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="ripple rounded-md border border-slate-200 px-3 py-1.5">
            Blue
          </button>
          <button className="ripple rounded-md border border-slate-200 px-3 py-1.5">
            Red
          </button>
          <button className="ripple rounded-md border border-slate-200 px-3 py-1.5">
            Green
          </button>
        </div>
      </div>
      <div className="mt-5">
        <span className="font-semibold text-neutral-text-secondary">
          Màu sắc
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="ripple rounded-md border border-slate-200 px-3 py-1.5">
            Blue
          </button>
          <button className="ripple rounded-md border border-slate-200 px-3 py-1.5">
            Red
          </button>
          <button className="ripple rounded-md border border-slate-200 px-3 py-1.5">
            Green
          </button>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-8">
        <span className="font-semibold text-neutral-text-secondary">
          Số lượng
        </span>
        <div className="flex h-8 items-stretch divide-x overflow-hidden rounded-md border border-slate-200">
          <i className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary">
            <Minus size={16} />
          </i>
          <span className="px-3 py-1 font-semibold">2</span>
          <i className="ripple flex cursor-pointer items-center justify-center px-2 text-neutral-text-secondary">
            <Add size={16} />
          </i>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <button className="active:shadow-primary ripple rounded-md bg-primary-500 px-3 py-1.5 font-semibold text-white transition-all">
          Mua ngay
        </button>
        <button className="active:shadow-secondary ripple rounded-md bg-secondary-500 px-3 py-1.5 font-semibold text-white transition-all">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default ProductPrice;
