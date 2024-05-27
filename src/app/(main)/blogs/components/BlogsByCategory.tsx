import Skeleton from "react-loading-skeleton";
import { SmallItem } from "./BlogItem";
import { publicApi } from "@/services/api";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { path } from "@/config/path";
import { QueryKey } from "@/utils/constants";

async function BlogsByCategory() {
  const items = (await publicApi.getCategoryBlogs())?.data?.blogs;
  if (!items) {
    return <NotFound />;
  }

  return (
    <div className="col-span-1 flex flex-col gap-5 lg:hidden">
      {items.map((item, index) => (
        <div key={index}>
          <Link
            href={`${path.blogs}?${QueryKey.category}=${item.id}`}
            className="text-lg font-semibold text-neutral-text-secondary hover:underline">
            #{item.name}
          </Link>
          <hr className="mb-3 mt-1 text-neutral-text-secondary" />
          <div className="flex flex-col gap-3">
            {item.blogs.map((blog, i) => (
              <SmallItem key={i} data={blog} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogsByCategoryLoading() {
  return (
    <div className="col-span-1 flex flex-col gap-5 lg:hidden">
      {[1, 2].map((i) => (
        <div key={i}>
          <Skeleton width={200} height={16} />
          <hr className="mb-3 mt-3 text-neutral-text-secondary" />
          <div className="flex flex-col gap-3">
            <div className="grid w-full grid-cols-3 gap-4">
              <Skeleton className="col-span-1 aspect-video" />
              <div className="col-span-2 flex flex-col">
                <Skeleton className="w-full" height={12} count={2} />
                <Skeleton height={6} width={40} />
              </div>
            </div>
            <div className="grid w-full grid-cols-3 gap-4">
              <Skeleton className="col-span-1 aspect-video" />
              <div className="col-span-2 flex flex-col">
                <Skeleton className="w-full" height={12} count={2} />
                <Skeleton height={6} width={40} />
              </div>
            </div>
            <div className="grid w-full grid-cols-3 gap-4">
              <Skeleton className="col-span-1 aspect-video" />
              <div className="col-span-2 flex flex-col">
                <Skeleton className="w-full" height={12} count={2} />
                <Skeleton height={6} width={40} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogsByCategory;
