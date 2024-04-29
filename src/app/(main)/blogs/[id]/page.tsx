import NotFound from "@/app/not-found";
import "@/assets/css/quill.css";
import { BreadcrumbItem } from "@/components/Breadcrumb";
import { path } from "@/config/path";
import { publicApi } from "@/services/api";
import { fromNow } from "@/utils/functions";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import { Metadata } from "next";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: "Trang chủ",
    url: path.home,
  },
  {
    title: "Bài viết",
    url: path.blogs,
  },
];

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const data = (await publicApi.getBlogDetail(params.id)).data?.blog;
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
  const data = (await publicApi.getBlogDetail(id)).data?.blog;

  if (!data) {
    return <NotFound />;
  }

  breadcrumbItems[2] = {
    title: data.title,
  };

  return (
    <div>
      <PageHeader title="Lorem 1" breadcrumbItems={breadcrumbItems} />
      <div className="mx-auto my-28 max-w-[1000px] lg:px-4">
        <h1 className="text-3xl font-bold sm:text-xl">{data.title}</h1>
        <span className="mt-2 text-xs text-neutral-text-secondary">
          {fromNow(data.updatedAt)}
        </span>
        <div className="relative mx-auto mt-5 aspect-video w-full">
          <Image src={data.thumbnail} alt={data.title} fill />
        </div>
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
