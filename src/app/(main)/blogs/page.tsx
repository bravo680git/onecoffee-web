import { Metadata } from "next";
import { Suspense } from "react";
import BlogList, { BlogListLoading } from "./components/BlogList";
import BlogsByCategory, {
  BlogsByCategoryLoading,
} from "./components/BlogsByCategory";

export const metadata: Metadata = {
  title: "Bài viết",
};

function Blogs({ searchParams }: PageProps<[], ["cat-id"]>) {
  const catId = searchParams["cat-id"];

  return (
    <div className="py-60 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-5 xl:px-4">
        <Suspense key={catId} fallback={<BlogListLoading />}>
          <BlogList catId={catId} />
        </Suspense>
        {!catId && (
          <Suspense fallback={<BlogsByCategoryLoading />}>
            <BlogsByCategory />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Blogs;
