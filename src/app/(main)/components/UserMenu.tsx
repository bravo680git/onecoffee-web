"use client";

import { getUserInfo, logout, updateUserInfo, upload } from "@/app/action";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMessage } from "@/components/Message";
import { path } from "@/config/path";
import { UpdateUserInfoPayload, UserInfo } from "@/services/api";
import { useUserStore } from "@/store/user";
import clsx from "clsx";
import {
  Add,
  Edit,
  Key,
  LogoutCurve,
  ShoppingCart,
  UserOctagon,
} from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function UserMenu() {
  const { msgApi, msgCtxHoler } = useMessage();
  const { setUserInfo, userInfo } = useUserStore();
  const { push } = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserInfo(undefined);
    msgApi.success({
      message: "Đăng xuất thành công",
    });
    setTimeout(() => {
      push(path.home);
    }, 500);
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res.data) {
        setUserInfo(res.data.user);
      }
    });

    const handleClose = () => {
      setOpen(false);
    };

    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {msgCtxHoler}
      {userInfo ? (
        <div
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center
            rounded-full bg-black/40"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}>
          {userInfo.avatar ? (
            <Image src={userInfo.avatar} fill alt="" className="rounded-full" />
          ) : (
            <UserOctagon size={24} />
          )}
        </div>
      ) : (
        <Link href={path.login}>
          <UserOctagon
            size={24}
            className="cursor-pointer hover:text-primary-500"
          />
        </Link>
      )}
      {userInfo && (
        <Menu userInfo={userInfo} open={open} handleLogout={handleLogout} />
      )}
    </>
  );
}

function Menu({
  userInfo,
  open,
  handleLogout,
}: {
  userInfo: UserInfo;
  open: boolean;
  handleLogout(): void;
}) {
  const { push } = useRouter();
  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "fixed right-5 top-[100px] rounded-md bg-white text-neutral-text-primary shadow-md md:top-[60px]",
          "invisible translate-x-[400px] opacity-0 transition-[transform,opacity,visibility] duration-300",
          {
            "!visible !translate-x-0 !opacity-100": open,
          },
        )}>
        <div className="cursor-default border-b border-slate-200 px-4 py-2">
          <span className="block whitespace-nowrap font-semibold text-primary-500">
            {userInfo.name}
          </span>
          <span className="block text-xs text-neutral-text-secondary">
            {userInfo.email}
          </span>
        </div>
        <ul className="py-2">
          <li
            className="ripple flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-sm px-4 py-1.5 font-semibold"
            onClick={() => push(path.orders)}>
            <ShoppingCart size={18} />
            Đơn hàng của tôi
          </li>
          <li
            className="ripple flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-sm px-4 py-1.5 font-semibold"
            onClick={() => setOpenEditInfoModal(true)}>
            <Edit size={18} />
            Cập nhật thông tin
          </li>
          <li
            className="ripple flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-sm px-4 py-1.5 font-semibold"
            onClick={() => push(path.changePassword)}>
            <Key size={18} />
            Đổi mật khẩu
          </li>
          <li
            className="ripple flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-sm px-4 py-1.5 font-semibold"
            onClick={handleLogout}>
            <LogoutCurve size={18} />
            Đăng xuất
          </li>
        </ul>
      </div>
      <UpdateUserInfoModal
        userInfo={userInfo}
        open={openEditInfoModal}
        onClose={() => setOpenEditInfoModal(false)}
      />
    </>
  );
}

function UpdateUserInfoModal({
  userInfo,
  onClose,
  open,
}: {
  userInfo: UserInfo;
  open: boolean;
  onClose(): void;
}) {
  const { msgApi, msgCtxHoler } = useMessage();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Partial<UpdateUserInfoPayload>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name) {
      setErrors({ name: "Họ và tên không được bỏ trống" });
      return;
    }

    let avatar = userInfo.avatar;
    try {
      if (file) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file);
        const uploadRes = await upload(formData);

        if (uploadRes.statusCode < 400) {
          avatar = uploadRes.data?.image?.url;
        } else {
          return Promise.reject();
        }
      }

      const res = await updateUserInfo({
        name,
        avatar,
        addressId: userInfo.addressId,
      });
      if (res.statusCode < 400) {
        setUserInfo(res.data?.user);
        msgApi.success({
          message: "Cập nhật thông tin thành công",
        });
      } else {
        return Promise.reject();
      }
    } catch (error) {
      msgApi.error({
        message: "Có lỗi xảy ra, vui lòng thử lại sau",
      });
    } finally {
      onClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (userInfo && open) {
      setName(userInfo.name);
    } else {
      setName("");
      setFile(undefined);
    }
  }, [userInfo, open]);

  return (
    <>
      {msgCtxHoler}
      {mounted &&
        createPortal(
          <div
            className={clsx(
              "fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/20 transition-all duration-300",
              open ? "visible opacity-100" : "invisible opacity-0",
            )}
            data-dialog-open={open}>
            <div
              className={clsx(
                "relative w-[300px] rounded-md bg-white p-4 transition-all duration-300",
                open ? "visible opacity-100" : "invisible opacity-0",
              )}>
              <h3 className="text-base font-semibold">Cập nhật thông tin</h3>
              <div
                className="absolute right-2 top-2 cursor-pointer rounded-full p-1 
            text-neutral-text-secondary hover:bg-black/10"
                onClick={onClose}>
                <Add className="rotate-45" size={24} />
              </div>
              <div className="mt-5">
                <div className="flex justify-center">
                  <div
                    className="relative flex h-20 w-20 items-center 
                justify-center overflow-hidden rounded-full border-2 border-blue-200">
                    <Image
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : userInfo.avatar
                            ? userInfo.avatar
                            : "/images/user.webp"
                      }
                      alt=""
                      fill
                      className="object-cover object-center"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0])}
                      multiple={false}
                      className="absolute left-0 top-0 block h-full w-full cursor-pointer opacity-0"
                    />
                  </div>
                </div>
                <Input
                  label="Họ và tên"
                  placeholder="Nhập họ và tên của bạn"
                  value={name}
                  onChange={setName}
                  error={errors.name}
                />
                <div className="mt-4 flex justify-end gap-2">
                  <Button onClick={onClose}>Hủy</Button>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}>
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default UserMenu;
