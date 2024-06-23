import NotFound from "@/app/not-found";
import { publicApi } from "@/services/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LargeItem } from "./BlogItem";
import BlogListPagination from "./BlogListPagination";

const PAGE_SIZE = 12;

async function BlogList({ catId }: { catId?: string }) {
  const data = (
    await publicApi.getBlogList({
      filter: catId ? `category:[${catId}]` : undefined,
      limit: PAGE_SIZE.toString(),
      page: "1",
    })
  )?.data;

  if (!data || !data.blogs.length) {
    return "Không có bài viết nào, vui lòng quay lại sau";
  }

  const firstItem = data.blogs[0];
  const items = data.blogs.slice(1);

  return (
    <div className="col-span-2 lg:col-span-3">
      {catId && (
        <>
          <span className="text-xl font-semibold text-neutral-text-secondary">
            #{firstItem.category.name}
          </span>
          <hr className="mb-3 mt-1 text-neutral-text-secondary" />
        </>
      )}

      {!catId && (
        <>
          <LargeItem data={firstItem} />
          <hr className="my-5 text-neutral-text-secondary" />
        </>
      )}
      <BlogListPagination
        key={catId}
        showCategory={!catId}
        firstPageItems={!catId ? items : data.blogs}
        size={PAGE_SIZE}
        total={data.meta.total}
      />
    </div>
  );
}

export function BlogListLoading() {
  return (
    <div className="col-span-2 lg:col-span-3">
      <Skeleton height={16} width={200} className="mb-3" />

      <div className="flex w-full flex-col gap-2">
        <Skeleton className="aspect-video w-full" borderRadius={16} />
        <Skeleton count={1} height={14} />
        <Skeleton count={3} height={10} />
      </div>
      <hr className="my-5 text-neutral-text-secondary" />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="col-span-1 aspect-video" />
          <div className="col-span-2">
            <Skeleton className="w-full" count={1} height={12} />
            <Skeleton className="my-0" count={3} height={8} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="col-span-1 aspect-video" />
          <div className="col-span-2">
            <Skeleton className="w-full" count={1} height={12} />
            <Skeleton className="my-0" count={3} height={8} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
