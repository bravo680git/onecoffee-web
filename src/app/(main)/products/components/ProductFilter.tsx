"use client";

import { useState, useEffect } from "react";
import Select, { SelectProps } from "@/components/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Checkbox from "@/components/Checkbox";
import { Setting5 } from "iconsax-react";
import clsx from "clsx";

const orderItems: SelectProps["items"] = [
  {
    label: "Nổi bật",
    value: "popular",
  },
  {
    label: "Mới nhất",
    value: "newest",
  },
  {
    label: "Giá thấp đến cao",
    value: "asc",
  },
  {
    label: "Giá cao đến thấp",
    value: "desc",
  },
];

function OrderSelect() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState<number | string>(
    new URLSearchParams(searchParams).get("sort") ?? orderItems[0].value,
  );

  useEffect(() => {
    const search = new URLSearchParams(searchParams.toString());
    search.set("sort", value.toString());
    push(`${pathname}?${search}`, { scroll: false });
  }, [searchParams, value, pathname, push]);

  return (
    <div className="w-40">
      <Select
        items={orderItems}
        value={value}
        onChange={setValue}
        showError={false}
      />
    </div>
  );
}

function ProductFilter() {
  const [values, setValues] = useState<number[]>([]);

  const handleCheck = (check: boolean, v: number) => {
    if (!check) {
      setValues(values.filter((item) => item !== v));
    } else {
      setValues([...values, v]);
    }
  };
  return (
    <div className="w-full rounded-md border border-slate-200 bg-white p-4">
      <h3 className="mb-2 text-base font-semibold text-secondary-500">
        Khoảng giá
      </h3>
      <div className="flex grow-0 items-center text-neutral-text-secondary">
        <input
          type="number"
          placeholder="đ Từ"
          className="w-20 rounded-md  border border-slate-200 px-2 py-1 caret-primary-500"
        />
        <span className="mx-auto w-fit">-</span>
        <input
          type="number"
          placeholder="đ Đến"
          className="w-20 rounded-md border border-slate-200 px-2 py-1 caret-primary-500"
        />
      </div>

      <h3 className="mb-2 mt-4 text-base font-semibold text-secondary-500">
        Danh mục
      </h3>
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Checkbox
            key={i}
            label="San pham"
            value={values.includes(i)}
            onChange={(c) => handleCheck(c, i)}
          />
        ))}
      </div>

      <button className="ripple mt-3 rounded-md bg-primary-500 px-4 py-1 font-semibold text-white">
        Áp dụng
      </button>
    </div>
  );
}

function ProductFilterBtn() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => {
      setOpen(false);
    };

    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose);
    };
  }, []);
  return (
    <div
      className="relative hidden xl:block"
      onClick={(e) => {
        e.stopPropagation();
        setOpen(true);
      }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-neutral-text-secondary">
        <Setting5 size={18} variant="Bold" />
      </button>
      <div
        className={clsx(
          "absolute right-[110%] top-0 z-50 w-[240px] sm:left-1/2 sm:right-[unset] sm:top-[110%] sm:translate-x-[-50%]",
          "origin-top scale-0 transition-all duration-300",
          {
            "!scale-100": open,
          },
        )}>
        <ProductFilter />
      </div>
    </div>
  );
}

export { OrderSelect, ProductFilter, ProductFilterBtn };
