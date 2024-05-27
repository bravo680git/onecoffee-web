import Input from "@/components/Input";
import Select, { SelectProps } from "@/components/Select";
import clsx from "clsx";
import {
  Add,
  ArrowLeft,
  Building,
  Home,
  NotificationCircle,
  Trash,
} from "iconsax-react";
import { useEffect, useState } from "react";
import {
  createAddress,
  deleteAddress,
  getAddressList,
  getDistrictsByProvince,
  getProvinces,
  getWardsByDistrict,
} from "../action";
import { CreateAddressPayload } from "@/services/api";
import { useMessage } from "@/components/Message";
import { useAddressStore } from "@/store/address";
import { useUserStore } from "@/store/user";
import { updateUserInfo } from "@/app/action";
import { useModal } from "@/components/Modal";
import Button from "@/components/Button";

function OrderAddressListModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose(): void;
  onCreated(): void;
}) {
  const { items, setItems, setSelectedItem, selectedItem } = useAddressStore();
  const { userInfo, setUserInfo } = useUserStore();
  const { msgApi, msgCtxHoler } = useMessage();
  const { modalCtxHoler, modelApi } = useModal();

  const [mounted, setMounted] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [loading, setLoading] = useState(false);

  const handleSaveAddress = () => {
    if (!userInfo) {
      return;
    }
    if (!selectedId) {
      msgApi.error({
        message: "Vui lòng chọn địa chỉ nhận hàng",
      });
      return;
    }
    setLoading(true);
    updateUserInfo({
      name: userInfo.name,
      avatar: userInfo.avatar,
      addressId: selectedId,
    })
      .then((res) => {
        if (res?.statusCode && res.statusCode < 400) {
          setSelectedItem(items.find((item) => item.id === selectedId)!);
          setUserInfo({ ...userInfo, addressId: selectedId });
          msgApi.success({
            message: "Cập nhật địa chỉ nhận hàng thành công",
          });
          onClose();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    if (selectedItem?.id === id) {
      modelApi.info({
        title: "Không thể xóa địa chỉ mặc định",
        content: `Địa chỉ đang được chọn làm địa chỉ giao hàng mặc định, 
            chọn một địa chỉ khác làm mặc định trước khi xóa địa chỉ này`,
        async onOk() {},
      });
      return;
    }
    modelApi.error({
      title: "Xác nhận xóa địa chỉ",
      content: "Bạn có chắc chắn muốn xóa địa chỉ này không?",
      async onOk() {
        const res = await deleteAddress(id);
        if (res?.statusCode && res.statusCode < 400) {
          msgApi.success({ message: "Xóa địa chỉ thành công" });
          setItems(items.filter((item) => item.id !== id));
        }
      },
    });
  };

  useEffect(() => {
    getAddressList().then((res) => {
      if (res?.data) {
        setItems(res.data.addresses);
        const defaultAddress = res.data.addresses.find(
          (item) => item.id === userInfo?.addressId,
        );

        if (defaultAddress) {
          setSelectedItem(defaultAddress);
          setSelectedId(defaultAddress.id);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (!open) {
      setSelectedId(userInfo?.addressId);
    }
  }, [open, userInfo]);

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
      {msgCtxHoler}
      {modalCtxHoler}
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
            {items.map((item, i) => (
              <div
                key={i}
                className="ripple relative flex cursor-pointer gap-2 rounded-md border border-slate-200 p-4"
                onClick={() => setSelectedId(item.id)}>
                {item.id !== selectedId && (
                  <button
                    className="absolute right-2 top-2 z-50 rounded-md border border-slate-200 p-1 text-red-500 hover:border-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}>
                    <Trash size={18} />
                  </button>
                )}
                <div
                  className={clsx(
                    "relative h-5 w-5 rounded-full",
                    selectedId === item.id
                      ? "bg-blue-500"
                      : "border border-slate-200",
                  )}>
                  <div className="absolute left-1/2 top-1/2 aspect-square w-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-white"></div>
                </div>
                <div className="">
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    <span>{item.phone}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                      {item.type}
                    </div>
                    <span>{item.address}</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-text-secondary">
                    {`${item.province}, ${item.district}, ${item.ward}`}
                  </p>
                </div>
              </div>
            ))}

            {items.length > 0 ? (
              <Button
                type="primary"
                onClick={handleSaveAddress}
                loading={loading}>
                Lưu
              </Button>
            ) : (
              <p className="text-center text-neutral-text-secondary">
                Chưa có địa chỉ nào ở đây, vui lòng tạo mới
              </p>
            )}
          </div>
        </div>
      </div>
      {mounted && (
        <CreateOrderAddressModal
          open={openCreateModal}
          onCreated={onCreated}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
    </>
  );
}

function CreateOrderAddressModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose(): void;
  onCreated(): void;
}) {
  const { msgApi, msgCtxHoler } = useMessage();
  const { items, setItems } = useAddressStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState<number | string>();
  const [district, setDistrict] = useState<number | string>();
  const [ward, setWard] = useState<number | string>();
  const [address, setAddress] = useState("");
  const [provinceOptions, setProvinceOptions] = useState<SelectProps["items"]>(
    [],
  );
  const [districtOptions, setDistrictOptions] = useState<SelectProps["items"]>(
    [],
  );
  const [wardOptions, setWardOptions] = useState<SelectProps["items"]>([]);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    province?: string;
    district?: string;
    ward?: string;
    address?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [isOffice, setIsOffice] = useState(false);

  const validate = () => {
    let valid = true;
    const _errors = {} as typeof errors;
    if (!name) {
      _errors.name = "Vui lòng nhập họ và tên";
      valid = false;
    }
    if (!phone) {
      _errors.phone = "Vui lòng nhập số điện thoại";
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      _errors.phone = "Định dạng số điện thoại không hợp lệ";
      valid = false;
    }
    if (!address) {
      _errors.address = "Vui lòng nhập địa chỉ chi tiết";
      valid = false;
    }
    if (!province) {
      _errors.province = "Vui lòng chọn tỉnh, thành phố";
      valid = false;
    }
    if (!district) {
      _errors.district = "Vui lòng chọn quận, huyện";
      valid = false;
    }
    if (!ward) {
      _errors.ward = "Vui lòng chọn xã, phường";
      valid = false;
    }
    setErrors(_errors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    const payload: CreateAddressPayload = {
      name,
      phone,
      address,
      province:
        provinceOptions.find((item) => item.value === province)?.label ?? "",
      district:
        districtOptions.find((item) => item.value === district)?.label ?? "",
      ward: wardOptions.find((item) => item.value === ward)?.label ?? "",
      provinceCode: Number(province),
      districtCode: Number(district),
      wardCode: Number(ward),
      zipCode: `${province}-${district}-${ward}`,
      type: isOffice ? "Văn phòng" : "Nhà riêng",
    };
    createAddress(payload)
      .then((res) => {
        if (res?.statusCode && res.statusCode < 400 && res.data) {
          msgApi.success({
            message: "Thêm địa chỉ nhận hàng thành công",
          });
          setItems([res.data.address, ...items]);
          onCreated();
          onClose();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (province) {
      getDistrictsByProvince(Number(province)).then((data) =>
        setDistrictOptions(
          data.map((item) => ({ label: item.name, value: item.code })),
        ),
      );
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      getWardsByDistrict(Number(district)).then((data) =>
        setWardOptions(
          data.map((item) => ({ label: item.name, value: item.code })),
        ),
      );
    }
  }, [district]);

  useEffect(() => {
    getProvinces().then((data) =>
      setProvinceOptions(
        data.map((item) => ({ label: item.name, value: item.code })),
      ),
    );
  }, []);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setAddress("");
      setProvince(undefined);
      setDistrict(undefined);
      setWard(undefined);
      setErrors({});
      setIsOffice(false);
    }
  }, [open]);

  return (
    <>
      {msgCtxHoler}
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
              required
              error={errors.name}
            />
            <Input
              className="order-3 col-span-1 sm:order-2"
              label="Số điện thoại"
              value={phone}
              onChange={setPhone}
              placeholder="Nhập số điện thoại"
              required
              error={errors.phone}
            />
            <Input
              className=" order-2 col-span-1"
              label="Địa chỉ"
              value={address}
              onChange={setAddress}
              placeholder="Số nhà, tên đường"
              required
              error={errors.address}
            />
            <Select
              label="Tỉnh(thành phố)"
              className="order-3"
              items={provinceOptions}
              value={province}
              onChange={setProvince}
              placeholder="Tỉnh"
              required
              error={errors.province}
            />
            <Select
              label="Huyện(Thành phố,quận, thị xã)"
              className="order-3 col-start-2 sm:col-start-1"
              items={districtOptions}
              value={district}
              onChange={setDistrict}
              placeholder="Huyện"
              required
              error={errors.district}
            />
            <Select
              label="Xã(phường)"
              className="order-3 col-start-2 sm:col-start-1"
              items={wardOptions}
              value={ward}
              onChange={setWard}
              placeholder="Xã"
              required
              error={errors.ward}
            />
          </div>
          <div className="flex gap-5">
            <div
              className={clsx(
                "flex cursor-pointer items-center gap-2 rounded-md border",
                "border-slate-200 p-3 text-neutral-text-secondary transition-all duration-300",
                {
                  "bg-primary-500/80 text-white": !isOffice,
                },
              )}
              onClick={() => setIsOffice(false)}>
              <Home variant="Bold" size={24} />
              <span className="font-semibold">Nhà riêng</span>
            </div>
            <div
              className={clsx(
                "flex cursor-pointer items-center gap-2 rounded-md border",
                "border-slate-200 p-3 text-neutral-text-secondary transition-all duration-300",
                {
                  "bg-primary-500/80 text-white": isOffice,
                },
              )}
              onClick={() => setIsOffice(true)}>
              <Building variant="Bold" size={24} />
              <span className="font-semibold">Văn phòng</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={handleSubmit} loading={loading} type="primary">
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export { CreateOrderAddressModal, OrderAddressListModal };
