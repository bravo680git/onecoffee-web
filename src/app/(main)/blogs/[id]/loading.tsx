import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
  return (
    <div className="w-full">
      <Skeleton className="w-full" height={400} />
      <div className="mx-auto my-28 max-w-[1000px] p-4">
        <Skeleton className="w-full" height={20} />
        <Skeleton width={60} height={8} />
        <Skeleton className="aspect-video w-full" />
        <Skeleton className="mt-5 w-full" count={10} height={10} />
      </div>
    </div>
  );
}

export default Loading;
