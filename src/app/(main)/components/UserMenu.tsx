"use client";

import { getUserInfo, logout } from "@/app/action";
import { useMessage } from "@/components/Message";
import { path } from "@/config/path";
import { UserInfo } from "@/services/api";
import { useUserStore } from "@/store/user";
import clsx from "clsx";
import { Edit, Key, LogoutCurve, UserOctagon } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function UserMenu() {
  const { msgApi, msgCtxHoler } = useMessage();
  const { setUserInfo, userInfo } = useUserStore();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserInfo(undefined);
    msgApi.success({
      message: "Đăng xuất thành công",
    });
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
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}>
          {userInfo.avatar ? (
            <Image src={userInfo.avatar} fill alt="" />
          ) : (
            <UserOctagon size={24} />
          )}
          <Menu userInfo={userInfo} open={open} handleLogout={handleLogout} />
        </div>
      ) : (
        <Link href={path.login}>
          <UserOctagon
            size={24}
            className="cursor-pointer hover:text-primary-500"
          />
        </Link>
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
  return (
    <div
      className={clsx(
        "absolute right-[-10px] top-[calc(100%+10px)] rounded-md bg-white text-neutral-text-primary shadow-md",
        "invisible translate-x-[400px] opacity-0 transition-[transform,opacity,visibility] duration-300",
        {
          "!visible !translate-x-0 !opacity-100": open,
        },
      )}>
      <div className="border-b border-slate-200 px-4 py-2">
        <span className="block whitespace-nowrap font-semibold text-primary-500">
          {userInfo.name}
        </span>
        <span className="block text-xs text-neutral-text-secondary">
          {userInfo.email}
        </span>
      </div>
      <ul className="py-2">
        <li className="ripple flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-sm px-4 py-1.5 font-semibold">
          <Edit size={18} />
          Cập nhật thông tin
        </li>
        <li className="ripple flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-sm px-4 py-1.5 font-semibold">
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
  );
}

export default UserMenu;
