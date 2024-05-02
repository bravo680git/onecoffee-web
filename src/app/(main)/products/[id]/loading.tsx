import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
  return (
    <div className="w-full">
      <div className="relative flex h-[400px] w-full flex-col items-center justify-end gap-8 pb-20 sm:h-[300px]">
        <Image
          src="/images/page-header-img.png"
          fill
          alt=""
          className="sm:object-cover"
        />
        <h2 className="z-[1] text-3xl font-bold text-white">Sản phẩm</h2>
      </div>
      <div className="mx-auto my-28 max-w-[1200px] xl:max-w-full xl:px-4">
        <section className="w-full">
          <div className="flex gap-12 md:flex-col">
            <div className="w-[600px] shrink-0 xl:w-[400px] md:mx-auto sm:w-full">
              <Skeleton height={600} />
            </div>
            <div className="grow">
              <Skeleton width={200} />
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Skeleton width={60} />
                </div>
                <span className="cursor-pointer text-xs text-blue-400 hover:opacity-80">
                  <Skeleton width={100} />
                </span>
              </div>
              <hr className="mt-2 w-full text-neutral-text-secondary" />

              <div className="mt-5 w-full">
                <Skeleton height={60} />
                <Skeleton height={60} className="mt-4" />
                <hr className="mt-5 text-neutral-text-secondary" />
                <div className="mt-5 w-full">
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </div>

                <div className="mt-5 flex items-center gap-8">
                  <Skeleton height={40} width={80} />
                </div>
                <div className="mt-5 flex gap-2">
                  <Skeleton height={40} width={160} />
                  <Skeleton height={40} width={160} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 w-full">
          <Skeleton count={10} />
        </section>

        <section className="mt-8 w-full">
          <Skeleton height={400} />
        </section>
      </div>
    </div>
  );
}

export default Loading;
