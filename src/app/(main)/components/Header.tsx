"use client";

import clsx from "clsx";
import {
  Add,
  ArrowDown2,
  HambergerMenu,
  SearchNormal1,
  UserOctagon,
} from "iconsax-react";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import Link from "next/link";
import { path } from "@/config/path";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

export type MenuItem = {
  key: string;
  title: string;
  path: string;
  children?: MenuItem[];
};

function Header({ menuItems }: { menuItems: MenuItem[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searching, setSearching] = useState(false);
  const [onInitScroll, setOnInitScroll] = useState(true);
  const [expandItems, setExpandItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleSearch = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (!searching) {
      setSearching(true);
      inputRef.current?.focus();
    }
  };

  const toggleExpand = (e: MouseEvent<SVGElement>, key: string) => {
    e.stopPropagation();
    if (expandItems.includes(key)) {
      setExpandItems(expandItems.filter((item) => item !== key));
    } else {
      setExpandItems([...expandItems, key]);
    }
  };

  useEffect(() => {
    const closeSearchInput = () => {
      setSearching(false);
    };
    const scrollHandler = () => {
      setOnInitScroll(window.scrollY < 128);
    };

    document.body.addEventListener("click", closeSearchInput);
    window.addEventListener("scroll", scrollHandler);

    return () => {
      document.body.removeEventListener("click", closeSearchInput);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header>
      <div
        className={clsx(
          "fixed left-0 top-0 z-20 flex h-32 w-full items-center justify-between",
          "border-slate-100 px-10 text-white transition-all md:hidden",
          {
            "!h-20 bg-neutral-bg-footer/60": !onInitScroll,
          },
        )}>
        <div className="flex h-16 w-64 items-center gap-2 xl:w-16">
          <Image src="/logo.png" width={64} height={64} alt="" />
          <h2 className="text-lg font-bold xl:invisible">New3T store</h2>
        </div>

        <ul className="flex items-center gap-4 justify-self-center font-semibold">
          {menuItems.map((item, index) => (
            <li key={index} className="group relative">
              <Link
                href={item.path}
                className="flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 transition-all hover:bg-primary-500/20">
                {item.title}
                {!!item.children?.length && (
                  <ArrowDown2
                    className="transition-all group-hover:rotate-180"
                    size={16}
                  />
                )}
              </Link>
              <ul
                className={clsx(
                  "invisible absolute left-[50%] top-[calc(100%+4px)] translate-x-[-50%] opacity-0 shadow-lg",
                  "z-10 scale-75 rounded-md transition-all group-hover:visible group-hover:scale-100 group-hover:!opacity-100",
                  {
                    "bg-neutral-bg-footer/60": !onInitScroll,
                  },
                )}>
                {item.children?.map((child, i) => (
                  <li key={i}>
                    <Link
                      href={child.path}
                      className="block h-full w-full cursor-pointer whitespace-nowrap rounded-md px-4 py-2 
                        transition-all hover:bg-primary-500/20">
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="flex w-64 items-center justify-end gap-5 text-neutral-text-secondary xl:w-fit">
          <div className="flex cursor-pointer items-center transition-all hover:text-primary-500">
            <input
              ref={inputRef}
              placeholder="Tìm kiếm gì đó..."
              className={clsx(
                "w-0 border-b-2 border-primary-500 bg-transparent text-white caret-primary-500 transition-all",
                {
                  "!w-40": searching,
                },
              )}
            />
            <SearchNormal1 size={24} onClick={handleSearch} />
          </div>
          {pathname !== path.checkout && <Cart />}
          <UserMenu />
        </div>
      </div>
      <div
        className={clsx(
          "hidden h-14 items-center justify-between p-4 text-neutral-text-secondary md:flex",
          "fixed z-10 w-full transition-all",
          {
            "bg-neutral-bg-footer/90": !onInitScroll,
          },
        )}>
        <div>
          <HambergerMenu size={20} onClick={() => setOpen(true)} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              ref={inputRef}
              placeholder="Tìm kiếm gì đó..."
              className={clsx(
                "w-0 border-b-2 border-primary-500 bg-transparent text-white caret-primary-500 transition-all",
                {
                  "!w-40": searching,
                },
              )}
            />
            <SearchNormal1 size={20} onClick={handleSearch} />
          </div>
          {pathname !== path.checkout && <Cart />}
          <UserMenu />
        </div>
        <div
          className={clsx(
            "invisible fixed left-0 top-0  z-10 h-screen w-screen overflow-hidden bg-black/20 transition-all",
            {
              "!visible": open,
            },
          )}
          onClick={() => setOpen(false)}>
          <div
            className={clsx(
              "h-full w-0 bg-neutral-bg-footer/90 p-4 text-white transition-all duration-300",
              "relative overflow-y-auto overflow-x-hidden whitespace-nowrap opacity-0",
              {
                "!w-[300px] !opacity-100": open,
              },
            )}>
            <Add
              size={32}
              className="absolute right-2 top-2 rotate-45 text-neutral-text-secondary"
              onClick={() => setOpen(false)}
            />
            <div className="flex items-center gap-2">
              <Image src="/logo.png" width={60} height={60} alt="" />
              <h2 className="text-lg font-bold">New3T store</h2>
            </div>
            <ul className="mt-8 flex flex-col gap-2 font-semibold">
              {menuItems.map((item, index) => (
                <li key={index} className="cursor-pointer">
                  <span className="flex items-center gap-1 rounded-md px-2 py-1 transition-all hover:bg-primary-500/20">
                    <Link href={item.path}>{item.title}</Link>
                    {!!item.children?.length && (
                      <ArrowDown2
                        className={clsx("transition-all", {
                          "rotate-180": expandItems.includes(item.key),
                        })}
                        size={16}
                        onClick={(e) => toggleExpand(e, item.key)}
                      />
                    )}
                  </span>
                  <ul
                    className={clsx(
                      "h-0 overflow-hidden transition-all duration-300",
                    )}
                    style={{
                      height: expandItems.includes(item.key)
                        ? 37 * (item.children?.length ?? 0)
                        : undefined,
                    }}>
                    {item.children?.map((child, i) => (
                      <li
                        key={i}
                        className="cursor-pointer whitespace-nowrap rounded-md px-4 py-2 transition-all hover:bg-primary-500/20">
                        <Link href={child.path}>{child.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
