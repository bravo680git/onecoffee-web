"use client";
import { useState } from "react";

import { BlogType } from "@/services/api";
import { MediumItem } from "./BlogItem";
import { loadMoreBlogs } from "../action";
import Button from "@/components/Button";

function BlogListPagination({
  firstPageItems,
  size,
  total,
  showCategory,
}: {
  firstPageItems: BlogType[];
  size: number;
  total: number;
  showCategory?: boolean;
}) {
  const [items, setItems] = useState(firstPageItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    loadMoreBlogs(page + 1, size)
      .then((res) => {
        setItems([...items, ...res]);
        setPage(page + 1);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <MediumItem key={index} data={item} showCategory={showCategory} />
      ))}
      {items.length < total - 1 && (
        <div className="mt-4">
          <Button onClick={loadMore} loading={loading} className="mx-auto">
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
}

export default BlogListPagination;
