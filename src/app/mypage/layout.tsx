"use client";

import { useViewport } from "@/commons/hooks/useViewport";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SideMenu } from "./_components/SideMenu";
import { cn } from "@/commons/utils/cn";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-center md:gap-[50px] mt-[30px] mb-[30px] xl:mt-[40px] xl:mb-[40px] px-[24px] md:px-[30px]">
        <div className="flex-shrink-0">
          <SideMenu isRootMyPage={isRootMyPage} currentPath={pathname} />
        </div>

        <div
          className={cn(
            isRootMyPage ? "hidden" : "block",
            "flex-grow",
            "w-full",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
