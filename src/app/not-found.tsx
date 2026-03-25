"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import { Button } from "@/components/ui/Buttons/Button";
import { cn } from "@/commons/utils/cn";

export default function NotFoundPage({
  isFullPage = true,
}: {
  isFullPage?: boolean;
}) {
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        isFullPage
          ? "min-h-[100vh]"
          : "min-h-[calc(100vh-152px)] md:min-h-[calc(100vh-172px)]",
      )}
    >
      <EmptyState message="존재하지 않는 페이지입니다.">
        <Button className="w-[182px]" onClick={handleGoHome}>
          홈으로 가기
        </Button>
      </EmptyState>
    </div>
  );
}
