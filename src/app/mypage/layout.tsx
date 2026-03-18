"use client";

import { useViewport } from "@/commons/hooks/useViewport";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SideMenu } from "./_components/SideMenu";
import { cn } from "@/commons/utils/cn";

export default function MyPageRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTablet } = useViewport();
  const pathname = usePathname();
  const router = useRouter();
  const isRootMyPage = pathname === "/mypage";

  useEffect(() => {
    if (isTablet && isRootMyPage) {
      router.replace("/mypage/reservation");
    }
  }, [isRootMyPage, router, isTablet]);

  return (
    <div className="flex max-w-[490px] mx-auto mt-[30px] md:max-w-[684px] md:mx-auto md:mt-[30px] xl:max-w-[980px] xl:mx-auto xl:mt-[40px]">
      <SideMenu isRootMyPage={isRootMyPage} currentPath={pathname} />

      <div
        className={cn(
          isRootMyPage ? "hidden" : "block",
          "w-full",
          "md:block md:ml-[50px] flex-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}
