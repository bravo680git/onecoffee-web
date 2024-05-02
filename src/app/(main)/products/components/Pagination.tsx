"use client";
import { QueryKey } from "@/utils/constants";
import clsx from "clsx";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({
  pageCount,
  currentPage,
}: {
  pageCount: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handlePaginate = (page: number | "-1" | "+1") => {
    if (page === currentPage) {
      return;
    }
    const search = new URLSearchParams(searchParams);
    if (typeof page === "number") {
      search.set(QueryKey.page, page.toString());
    } else if (page === "-1") {
      search.set(QueryKey.page, `${currentPage - 1}`);
    } else if (page === "+1") {
      search.set(QueryKey.page, `${currentPage + 1}`);
    }

    push(`${pathname}?${search.toString()}`);
  };

  return (
    <div className="col-span-3 flex justify-center gap-2 text-neutral-text-secondary sm:col-span-2">
      <button
        className={clsx("paginate-btn ripple", {
          "cursor-not-allowed opacity-80": currentPage === 1,
        })}
        onClick={currentPage === 1 ? undefined : () => handlePaginate("-1")}>
        <ArrowLeft2 variant="Outline" size={16} />
      </button>
      {Array(pageCount)
        .fill(0)
        .map((_, i) => (
          <button
            key={i}
            className={clsx("paginate-btn ripple font-semibold", {
              "bg-primary-500 text-white": i + 1 === currentPage,
            })}
            onClick={() => handlePaginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      <button
        className={clsx("paginate-btn ripple", {
          "cursor-not-allowed opacity-80": currentPage === pageCount,
        })}
        onClick={currentPage === 1 ? undefined : () => handlePaginate("+1")}>
        <ArrowRight2 variant="Outline" size={16} />
      </button>
    </div>
  );
}

export default Pagination;
