"use client";

import { MouseEvent, useEffect, useState } from "react";

import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import { createPortal } from "react-dom";

export type SelectProps = {
  items: { label: string; value: number | string }[];
  placeholder?: string;
  value?: string | number;
  onChange: (v: SelectProps["items"][number]["value"]) => void;
};

function Select({ items = [], placeholder, value, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, w: 0 });

  const displayValue = (() => {
    const label = items.find((item) => item.value === value)?.label;
    return label ? (
      <span className="text-neutral-text-secondary">{label}</span>
    ) : (
      <span className="">{placeholder}</span>
    );
  })();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setOpen(!open);
    let target: HTMLElement = e.target as HTMLElement;
    while (!target?.hasAttribute("data-select")) {
      target = target.parentElement!;
    }
    const rect = target.getBoundingClientRect();
    if (rect) {
      setPosition({
        y: rect.top + rect.height + 6,
        x: rect.x,
        w: rect.width,
      });
    }
  };

  const handleSelect = (value: string | number) => {
    onChange(value);
  };

  useEffect(() => {
    const handleClose = () => {
      setOpen(false);
    };
    setMounted(true);

    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose);
    };
  }, []);

  return (
    <>
      <div
        className="flex h-8 w-full items-center justify-between rounded-md border border-slate-200 px-3"
        onClick={(e) => handleClick(e)}
        data-select>
        {displayValue}
        <ArrowDown2
          className={clsx(
            "text-neutral-text-secondary transition-all duration-300",
            {
              "rotate-180": open,
            },
          )}
          size={16}
        />
      </div>
      {mounted &&
        createPortal(
          <div
            className={clsx(
              "fixed z-10 max-h-40 overflow-y-auto rounded-md bg-white opacity-0 shadow-md duration-300",
              "invisible origin-top scale-0 overflow-hidden transition-[width,height,transform,visibility,opacity]",
              {
                "!visible !scale-100 !opacity-100": open,
              },
            )}
            style={{ width: position.w, top: position.y, left: position.x }}>
            <ul>
              {items.map((item) => (
                <li
                  key={item.value}
                  className="cursor-pointer rounded-sm px-4 py-1 text-neutral-text-secondary transition-all hover:bg-primary-100"
                  onClick={() => handleSelect(item.value)}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>,
          document?.body,
        )}
    </>
  );
}

export default Select;
