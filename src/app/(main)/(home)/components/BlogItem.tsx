import { path } from "@/config/path";
import { BlogType } from "@/services/api";
import { fromNow, getPlainTextFromHtml } from "@/utils/functions";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

function BlogItem({ item, className }: { item: BlogType; className?: string }) {
  return (
    <Link
      href={`${path.blogs}/${item.slug}`}
      className={clsx(
        "group relative mx-auto flex w-full flex-col rounded-md bg-white shadow-md",
        className,
      )}>
      <div className="relative aspect-video w-full overflow-hidden rounded-t-md">
        <Image
          src={item.thumbnail}
          alt=""
          fill
          className="transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-4 text-left">
        <span className="text-xs text-neutral-text-secondary">
          {fromNow(item.updatedAt)}
        </span>
        <h3 className="line-clamp-1 text-ellipsis font-bold" title={item.title}>
          {item.title}
        </h3>
        <p className="line-clamp-3 text-ellipsis text-xs">
          {getPlainTextFromHtml(item.content)}
        </p>
      </div>
    </Link>
  );
}

export default BlogItem;
