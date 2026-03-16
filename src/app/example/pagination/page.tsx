import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination/Pagination";

export default function PaginationPage() {
  return (
    <>
      <h2 className="mb-[40px]">페이지네이션 화면</h2>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" disabled />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
