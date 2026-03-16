"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination/Pagination";

export default function PaginationPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <h2 className="mb-[40px]">페이지네이션 화면</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(1)}
                isActive={currentPage === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(2)}
                isActive={currentPage === 2}
              >
                2
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(3)}
                isActive={currentPage === 3}
              >
                3
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(4)}
                isActive={currentPage === 4}
              >
                4
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(5)}
                isActive={currentPage === 5}
              >
                5
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(5, currentPage + 1))}
                disabled={currentPage === 5}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Suspense>
    </>
  );
}
