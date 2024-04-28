import { BreadcrumbItem } from "@/components/Breadcrumb";
import { path } from "@/config/path";
import { Suspense } from "react";
import PageHeader from "../components/PageHeader";
import BlogList, { BlogListLoading } from "./components/BlogList";
import BlogsByCategory, {
  BlogsByCategoryLoading,
} from "./components/BlogsByCategory";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: "Trang chủ",
    url: path.home,
  },
  {
    title: "Bài viết",
  },
];

function Blogs({ searchParams }: PageProps<[], ["cat-id"]>) {
  const catId = searchParams["cat-id"];

  return (
    <div>
      <PageHeader title="Bài viết" breadcrumbItems={breadcrumbItems} />
      <div className="mx-auto my-28 grid max-w-[1200px] grid-cols-3 gap-5 xl:px-4 md:my-6">
        <Suspense fallback={<BlogListLoading />}>
          <BlogList catId={catId} />
        </Suspense>
        <Suspense fallback={<BlogsByCategoryLoading />}>
          <BlogsByCategory />
        </Suspense>
      </div>
    </div>
  );
}

export default Blogs;
