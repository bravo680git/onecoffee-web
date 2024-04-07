import Input from "@/components/Input";
import Select from "@/components/Select";
import clsx from "clsx";
import { Add, ArrowLeft } from "iconsax-react";
import { useEffect, useState } from "react";

function OrderAddressListModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose(): void;
}) {
  const [mounted, setMounted] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleClose = () => {
      onClose();
    };

    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className={clsx(
          "invisible fixed bottom-0 left-0 right-0 top-0 z-20 bg-black/20 transition-all",
          {
            "!visible": open,
          },
        )}
        data-dialog-open={open}>
        <div
          className={clsx(
            "fixed right-0 top-0 h-full w-0 overflow-hidden bg-white opacity-0 transition-all duration-300",
            {
              "w-[500px] !opacity-100 sm:w-full": open,
            },
          )}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 p-4 shadow-md">
            <ArrowLeft
              size={20}
              className="cursor-pointer text-neutral-text-secondary hover:opacity-80"
              onClick={onClose}
            />
            <h3 className="text-lg font-semibold">Địa chỉ giao hàng</h3>
            <button
              className="ripple ml-auto flex items-center gap-1 rounded-md px-2 py-0.5 text-primary-500"
              onClick={() => {
                setOpenCreateModal(true);
                onClose();
              }}>
              <Add size={20} />
              <span>Thêm địa chỉ mới</span>
            </button>
          </div>
          <div className="flex h-[calc(100vh-60px)] flex-col gap-4 p-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="ripple flex cursor-pointer gap-2 rounded-md border border-slate-200 p-4">
                <div className="relative h-5 w-5 rounded-full bg-blue-500">
                  <div className="absolute left-1/2 top-1/2 aspect-square w-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-white"></div>
                </div>
                <div className="">
                  <div className="flex items-center gap-2">
                    <span>Nguyen Van A</span>
                    <span>0123456789</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                      Văn phòng
                    </div>
                    <span>Xóm ngọc thạnh B, thôn Ngọc Thạnh 1</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-text-secondary">
                    Postcode: HCM-Q12-TCH
                  </p>
                </div>
              </div>
            ))}
            <button
              className="ripple w-full rounded-md bg-primary-500 py-2 font-semibold text-white
                transition-all duration-300 active:shadow-primary">
              Lưu
            </button>
          </div>
        </div>
      </div>
      {mounted && (
        <CreateOrderAddressModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
    </>
  );
}

function CreateOrderAddressModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose(): void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState<number | string>();
  const [district, setDistrict] = useState<number | string>();
  const [ward, setWard] = useState<number | string>();
  const [address, setAddress] = useState("");

  return (
    <div
      className={clsx(
        "invisible fixed bottom-0 left-0 right-0 top-0 z-20 rounded-md bg-black/20 opacity-0 transition-all",
        {
          "!visible !opacity-100": open,
        },
      )}
      data-dialog-open={open}>
      <div
        className={clsx(
          "fixed left-1/2 top-1/2 overflow-hidden bg-white p-4 opacity-0 transition-all duration-300",
          "max-h-[80vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-md",
          {
            "!opacity-100": open,
          },
        )}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Thêm địa chỉ giao hàng</h3>
          <Add
            size={30}
            className="rotate-45 cursor-pointer text-neutral-text-secondary hover:opacity-80"
            onClick={onClose}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
          <Input
            className="order-1 col-span-1"
            label="Họ và tên"
            value={name}
            onChange={setName}
            placeholder="Nhập họ và tên của bạn"
          />
          <Input
            className="order-3 col-span-1 sm:order-2"
            label="Số điện thoại"
            value={phone}
            onChange={setPhone}
            placeholder="Nhập số điện thoại"
          />
          <Input
            className=" order-2 col-span-1"
            label="Địa chỉ"
            value={address}
            onChange={setAddress}
            placeholder="Số nhà, tên đường"
          />
          <Select
            label="Tỉnh(thành phố)"
            className="order-3"
            items={[]}
            value={province}
            onChange={setProvince}
            placeholder="Tỉnh"
          />
          <Select
            label="Huyện(Thành phố,quận, thị xã)"
            className="order-3 col-start-2 sm:col-start-1"
            items={[]}
            value={district}
            onChange={setDistrict}
            placeholder="Huyện"
            disabled
          />
          <Select
            label="Xã(phường)"
            className="order-3 col-start-2 sm:col-start-1"
            items={[]}
            value={ward}
            onChange={setWard}
            placeholder="Xã"
            disabled
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="ripple rounded-md border border-slate-200 px-4 py-1.5 text-neutral-text-secondary"
            onClick={onClose}>
            Hủy
          </button>
          <button
            className="ripple rounded-md bg-primary-500 px-4 py-1.5 font-semibold text-white 
            transition-all duration-300 active:shadow-primary">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export { CreateOrderAddressModal, OrderAddressListModal };
