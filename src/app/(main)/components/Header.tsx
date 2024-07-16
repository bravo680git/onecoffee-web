"use client";

import { path } from "@/config/path";
import clsx from "clsx";
import { Add, ArrowDown2, HambergerMenu } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

export type MenuItem = {
  key: string;
  title: string;
  path: string;
  image?: string;
  children?: MenuItem[];
};

function Header({ menuItems }: { menuItems: MenuItem[] }) {
  const [onInitScroll, setOnInitScroll] = useState(true);
  const [expandItems, setExpandItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleExpand = (e: MouseEvent<SVGElement>, key: string) => {
    e.stopPropagation();
    if (expandItems.includes(key)) {
      setExpandItems(expandItems.filter((item) => item !== key));
    } else {
      setExpandItems([...expandItems, key]);
    }
  };

  useEffect(() => {
    const scrollHandler = () => {
      setOnInitScroll(window.scrollY < 128);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header>
      <div
        className={clsx(
          "fixed left-0 top-0 z-20 flex h-32 w-full items-center justify-center",
          "border-slate-100 bg-white/80 px-10 text-primary-500 backdrop-blur-sm transition-all lg:hidden",
          {
            "!h-14 border-b": !onInitScroll,
          },
        )}>
        <Link
          aria-label="Trang chủ"
          href={path.home}
          className="absolute left-[10%] flex h-16 w-64 items-center gap-2 xl:w-16">
          <Image
            src="/logo-full.png"
            width={onInitScroll ? 200 : 120}
            height={80}
            alt=""
          />
        </Link>

        <ul className="flex h-full items-center gap-4 justify-self-center text-base font-semibold">
          {menuItems.map((item, index) => (
            <li key={index} className="group flex h-full items-center">
              <Link
                href={item.path}
                className="flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 transition-all hover:text-secondary-500">
                {item.title}
                {!!item.children?.length && (
                  <ArrowDown2
                    className="transition-all group-hover:rotate-180"
                    size={16}
                  />
                )}
              </Link>
              {!!item.children?.length && (
                <div
                  className={clsx(
                    "invisible absolute left-0 top-full z-10 w-screen bg-white/80 opacity-0 shadow-lg backdrop-blur-sm duration-700",
                    "translate-y-[40px] transition-all group-hover:visible group-hover:translate-y-0 group-hover:!opacity-100",
                  )}>
                  <ul className="mx-auto flex max-w-[1200px] justify-center gap-8 pb-8 pt-2">
                    {item.children?.map((child, i) => (
                      <li key={i}>
                        <Link
                          href={child.path}
                          className="flex h-full w-full cursor-pointer items-end gap-2 whitespace-nowrap
                          rounded-md px-4 py-2 underline transition-all hover:text-secondary-500">
                          {child.image && (
                            <Image
                              src={child.image}
                              alt=""
                              width={40}
                              height={40}
                            />
                          )}
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={clsx(
          "hidden h-14 items-center justify-between bg-white/20 p-4 backdrop-blur-sm lg:flex",
          "fixed z-20 w-full transition-all",
          { "border-b": !onInitScroll },
        )}>
        <div>
          <HambergerMenu size={24} onClick={() => setOpen(true)} />
        </div>
        <Link href={path.home}>
          <Image src="/logo-full.png" alt="" width={120} height={80} />
        </Link>

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
              "h-full w-0 bg-white/80 p-4 text-neutral-text-primary backdrop-blur-sm transition-all duration-300",
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
            <Link href={path.home} className="flex items-center gap-2">
              <Image src="/logo-full.png" width={200} height={60} alt="" />
            </Link>
            <ul className="mt-8 flex flex-col gap-2 font-semibold">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer border-t border-neutral-placeholder pt-2">
                  <span className="flex items-center gap-1 rounded-md px-2 py-1 hover:text-secondary-500">
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
