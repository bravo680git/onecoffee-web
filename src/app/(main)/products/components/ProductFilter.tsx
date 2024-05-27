"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Select, { SelectProps } from "@/components/Select";
import { Category } from "@/services/api/public/type";
import { QueryKey } from "@/utils/constants";
import clsx from "clsx";
import { Setting5 } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderType } from "../constants";

const orderItems: SelectProps["items"] = [
  {
    label: "Nổi bật",
    value: OrderType.popular,
  },
  {
    label: "Mới nhất",
    value: OrderType.newest,
  },
  {
    label: "Giá thấp đến cao",
    value: OrderType.priceAsc,
  },
  {
    label: "Giá cao đến thấp",
    value: OrderType.priceDesc,
  },
];

function OrderSelect() {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<number | string>(
    new URLSearchParams(searchParams).get(QueryKey.sort) ?? orderItems[0].value,
  );

  useEffect(() => {
    const search = new URLSearchParams(searchParams.toString());
    search.set(QueryKey.sort, value.toString());
    push(`${pathname}?${search}`, { scroll: false });
  }, [searchParams, value, pathname, push]);

  return (
    <div className="w-40">
      <Select
        items={orderItems}
        value={value}
        onChange={setValue}
        showError={false}
        allowSearch={false}
      />
    </div>
  );
}

function ProductFilter({
  categories = [],
}: {
  categories: Category["categories"];
}) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const [values, setValues] = useState<number[]>([]);
  const [priceFrom, setPriceFrom] = useState(
    searchParams.get(QueryKey.from) ?? "",
  );
  const [priceTo, setPriceTo] = useState(searchParams.get(QueryKey.to) ?? "");

  const handleCheck = (check: boolean, v: number) => {
    if (!check) {
      setValues(values.filter((item) => item !== v));
    } else {
      setValues([...values, v]);
    }
  };

  const handleFilter = () => {
    const search = new URLSearchParams(searchParams);
    if (!isNaN(Number(priceFrom)) && priceFrom) {
      search.set(QueryKey.from, priceFrom);
    } else {
      search.delete(QueryKey.from);
    }
    if (!isNaN(Number(priceTo)) && priceTo) {
      search.set(QueryKey.to, priceTo);
    } else {
      search.delete(QueryKey.to);
    }
    if (values.length > 0) {
      search.set(QueryKey.category, values.join(","));
    } else {
      search.delete(QueryKey.category);
    }
    push(`${pathname}?${search.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const result = searchParams.get(QueryKey.category);
    setValues(result ? result.split(",").map((c) => +c) : []);
  }, [searchParams]);

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
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
        <span className="mx-auto w-fit">-</span>
        <input
          type="number"
          placeholder="đ Đến"
          className="w-20 rounded-md border border-slate-200 px-2 py-1 caret-primary-500"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
        />
      </div>

      <h3 className="mb-2 mt-4 text-base font-semibold text-secondary-500">
        Danh mục
      </h3>
      <div className="flex flex-col gap-2">
        {categories.map((item) => (
          <Checkbox
            key={item.id}
            label={item.name}
            value={values.includes(item.id)}
            onChange={(c) => handleCheck(c, item.id)}
          />
        ))}
      </div>

      <Button className="mt-3" type="primary" onClick={handleFilter}>
        Áp dụng
      </Button>
    </div>
  );
}

function ProductFilterBtn({
  categories = [],
}: {
  categories: Category["categories"];
}) {
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
        <ProductFilter categories={categories} />
      </div>
    </div>
  );
}

export { OrderSelect, ProductFilter, ProductFilterBtn };
