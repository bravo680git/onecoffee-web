"use client";

import { useState, useEffect, MouseEvent, useRef } from "react";
import {
  Add,
  ArrowDown2,
  HambergerMenu,
  SearchNormal1,
  ShoppingCart,
} from "iconsax-react";
import Image from "next/image";
import clsx from "clsx";

export type MenuItem = {
  key: string;
  title: string;
  path?: string;
  children?: MenuItem[];
};

function Header({ menuItems }: { menuItems: MenuItem[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searching, setSearching] = useState(false);
  const [onInitScroll, setOnInitScroll] = useState(true);
  const [expandItems, setExpandItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

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
      setOnInitScroll(window.scrollY < 200);
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
          "flex h-32 px-10 items-center border-slate-100 justify-between fixed top-0 left-0 w-full z-20 text-white transition-all md:hidden",
          {
            "bg-neutral-bg-footer/60 !h-20": !onInitScroll,
          }
        )}>
        <div className="h-16 flex items-center gap-2 w-64 xl:w-16">
          <Image src="/logo.png" width={64} height={64} alt="" />
          <h2 className="text-lg font-bold xl:invisible">New3T store</h2>
        </div>

        <ul className="flex gap-4 items-center justify-self-center font-semibold">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer relative group flex items-center gap-1 transition-all hover:bg-primary-500/20 py-1 px-2 rounded-md">
              {item.title}
              {!!item.children?.length && (
                <ArrowDown2
                  className="group-hover:rotate-180 transition-all"
                  size={16}
                />
              )}
              <ul
                className={clsx(
                  "absolute shadow-lg left-[50%] translate-x-[-50%] top-[calc(100%+4px)] invisible",
                  "group-hover:visible transition-all z-10 rounded-md scale-75 group-hover:scale-100",
                  {
                    "bg-neutral-bg-footer/60": !onInitScroll,
                  }
                )}>
                {item.children?.map((child, i) => (
                  <li
                    key={i}
                    className="whitespace-nowrap px-4 py-2 cursor-pointer hover:bg-primary-500/20 rounded-md transition-all">
                    {child.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="flex gap-5 text-neutral-text-secondary w-64 justify-end xl:w-fit">
          <div className="cursor-pointer hover:text-primary-500 transition-all flex items-center">
            <input
              ref={inputRef}
              placeholder="Tìm kiếm gì đó..."
              className={clsx(
                "border-b-2 border-primary-500 caret-primary-500 transition-all w-0 bg-transparent text-white",
                {
                  "!w-40": searching,
                }
              )}
            />
            <SearchNormal1 size={24} onClick={handleSearch} />
          </div>
          <CartBtn />
        </div>
      </div>
      <div
        className={clsx(
          "hidden md:flex h-14 p-4 items-center justify-between text-neutral-text-secondary",
          "transition-all fixed w-full z-10",
          {
            "bg-neutral-bg-footer/90": !onInitScroll,
          }
        )}>
        <div>
          <HambergerMenu size={20} onClick={() => setOpen(true)} />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              ref={inputRef}
              placeholder="Tìm kiếm gì đó..."
              className={clsx(
                "border-b-2 border-primary-500 caret-primary-500 transition-all w-0 bg-transparent text-white",
                {
                  "!w-40": searching,
                }
              )}
            />
            <SearchNormal1 size={20} onClick={handleSearch} />
          </div>
          <CartBtn />
        </div>
        <div
          className={clsx(
            "h-screen fixed z-10 left-0  w-screen bg-black/20 top-0 invisible overflow-hidden transition-all",
            {
              "!visible": open,
            }
          )}
          onClick={() => setOpen(false)}>
          <div
            className={clsx(
              "w-0 bg-neutral-bg-footer/90 text-white h-full p-4 transition-all duration-300",
              "overflow-x-hidden overflow-y-auto relative opacity-0 whitespace-nowrap",
              {
                "!w-[300px] !opacity-100": open,
              }
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
            <ul className="flex flex-col font-semibold mt-8 gap-2">
              {menuItems.map((item, index) => (
                <li key={index} className="cursor-pointer">
                  <span className="flex items-center gap-1 hover:bg-primary-500/20 py-1 px-2 rounded-md transition-all">
                    {item.title}
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
                      "transition-all duration-300 overflow-hidden h-0"
                    )}
                    style={{
                      height: expandItems.includes(item.key)
                        ? 37 * (item.children?.length ?? 0)
                        : undefined,
                    }}>
                    {item.children?.map((child, i) => (
                      <li
                        key={i}
                        className="whitespace-nowrap px-4 py-2 cursor-pointer hover:bg-primary-500/20 rounded-md transition-all">
                        {child.title}
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

function CartBtn() {
  return (
    <div className="relative cursor-pointer hover:text-primary-500 transition-all">
      <ShoppingCart size={24} />
      <div
        className="absolute w-4 h-4 text-[10px] flex items-center justify-center
         bg-primary-500 text-white font-bold rounded-full top-[-8px] right-[-8px]">
        5
      </div>
    </div>
  );
}

export default Header;
