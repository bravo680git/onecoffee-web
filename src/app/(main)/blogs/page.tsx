import { BreadcrumbItem } from "@/components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import { path } from "@/config/path";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: "Trang chủ",
    url: path.home,
  },
  {
    title: "Bài viết",
  },
];

function Blogs() {
  return (
    <div>
      <PageHeader title="Bài viết" breadcrumbItems={breadcrumbItems} />
    </div>
  );
}

export default Blogs;
