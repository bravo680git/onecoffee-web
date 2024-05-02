import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import Image from "next/image";

function PageHeader({
  breadcrumbItems,
  title,
}: {
  title: string;
  breadcrumbItems: BreadcrumbItem[];
}) {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-end gap-8 pb-20 sm:h-[300px]">
      <Image
        src="/images/page-header.jpg"
        fill
        alt=""
        className="object-cover brightness-50"
      />
      <Breadcrumb items={breadcrumbItems} />
      <h2 className="z-[1] text-3xl font-bold text-white sm:text-xl">
        {title}
      </h2>
    </div>
  );
}

export default PageHeader;
