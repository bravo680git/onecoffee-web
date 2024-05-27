import { path } from "@/config/path";
import { BlogType } from "@/services/api";
import { QueryKey } from "@/utils/constants";
import { fromNow, getPlainTextFromHtml } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";

function LargeItem({ data }: { data: BlogType }) {
  return (
    <Link href={`${path.blogs}/${data.slug}`} className="block w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl md:rounded-md">
        <Image
          src={data.thumbnail}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="mt-2 line-clamp-2 text-ellipsis text-xl font-bold hover:underline">
          {data.title}
        </h2>
      </div>
      <p className="mt-2">{getPlainTextFromHtml(data.content)}</p>
      <span className="mt-1 text-xs text-neutral-text-secondary">
        {fromNow(data.updatedAt)}
      </span>
    </Link>
  );
}

function MediumItem({
  data,
  showCategory,
}: {
  data: BlogType;
  showCategory?: boolean;
}) {
  return (
    <Link
      href={`${path.blogs}/${data.slug}`}
      className="grid w-full grid-cols-3 gap-4">
      <div className="relative col-span-1 aspect-video overflow-hidden rounded-md">
        <Image
          src={data.thumbnail}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2 sm:gap-0">
        {showCategory && (
          <Link href={`${path.blogs}?${QueryKey.category}=${data.category.id}`}>
            <span className="font-semibold text-neutral-text-secondary hover:underline">
              #{data.category.name}
            </span>
          </Link>
        )}
        <div>
          <h2 className="line-clamp-2 text-ellipsis text-base font-semibold hover:underline">
            {data.title}
          </h2>
        </div>
        {!showCategory && (
          <p className="line-clamp-3 text-ellipsis">
            {getPlainTextFromHtml(data.content)}
          </p>
        )}
        <span className="text-xs text-neutral-text-secondary">
          {fromNow(data.updatedAt)}
        </span>
      </div>
    </Link>
  );
}

function SmallItem({ data }: { data: BlogType }) {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="relative col-span-1 aspect-video overflow-hidden rounded-md">
        <Image
          src={data.thumbnail}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <Link href={`${path.blogs}/${data.slug}`}>
          <h2 className="line-clamp-2 text-ellipsis font-semibold hover:underline">
            {data.title}
          </h2>
        </Link>
        <span className="text-xs text-neutral-text-secondary">
          {fromNow(data.updatedAt)}
        </span>
      </div>
    </div>
  );
}

export { LargeItem, MediumItem, SmallItem };
