"use client";

import { Pagination } from "@/components/ui/Pagination/Pagination";
import { Suspense } from "react";

export default function PaginationPage() {
  return (
    <>
      <h2 className="mb-[40px]">페이지네이션 화면</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Pagination totalPage={10} />
      </Suspense>
    </>
  );
}
