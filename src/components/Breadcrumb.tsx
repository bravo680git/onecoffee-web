import Link from "next/link";
import React from "react";

export type BreadcrumbItem = {
  title: string;
  url?: string;
};

function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="z-[1] mx-auto flex w-fit gap-2 font-semibold text-white">
      {items.map((item, index) =>
        index !== items.length - 1 ? (
          <React.Fragment key={index}>
            <Link href={item.url!} className="transition-all hover:underline">
              {item.title}
            </Link>
            <span>/</span>
          </React.Fragment>
        ) : (
          <span key={index}>{item.title}</span>
        ),
      )}
    </div>
  );
}

export default Breadcrumb;
