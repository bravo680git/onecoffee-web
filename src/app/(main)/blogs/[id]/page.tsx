import NotFound from "@/app/not-found";
import "@/assets/css/quill.css";
import { path } from "@/config/path";
import { publicApi } from "@/services/api";
import { IMG_BLUR_HASH } from "@/utils/constants";
import { fromNow } from "@/utils/functions";
import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const data = (await publicApi.getBlogDetail(params.id))?.data;
  return {
    title: data?.title,
    description: data?.seoDescription,
    keywords: data?.seoKeyword,
    openGraph: {
      images: data?.thumbnail,
    },
  };
};

async function BlogDetail({ params }: PageProps<["id"], []>) {
  const id = params.id;
  const data = (await publicApi.getBlogDetail(id))?.data;

  if (!data) {
    return <NotFound />;
  }

  return (
    <div>
      <div
        className={clsx(
          "relative mx-auto aspect-[16/5] w-full md:aspect-video",
          {
            "h-[200px]": !data.thumbnail,
          },
        )}>
        {data.thumbnail ? (
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={IMG_BLUR_HASH}
          />
        ) : null}
      </div>
      <div className="mx-auto mb-28 mt-10 max-w-[1000px] lg:px-4">
        {data.category && (
          <Link
            href={`${path.blogs}?cat-id=${data.categoryId}`}
            className="font-semibold text-neutral-text-secondary underline">
            #{data.category.name}
          </Link>
        )}
        <h1 className="mt-4 text-3xl font-bold sm:text-xl">{data.title}</h1>
        <span className="mt-2 text-xs text-neutral-text-secondary">
          {fromNow(data.updatedAt)}
        </span>
        <div className="ql-snow mt-5">
          <div
            className="view ql-editor"
            dangerouslySetInnerHTML={{ __html: data.content ?? "" }}></div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
