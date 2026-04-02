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
  const { isTablet, isDesktop } = useViewport();
  const pathname = usePathname();
  const router = useRouter();
  const isRootMyPage = pathname === "/mypage";

  useEffect(() => {
    if ((isTablet || isDesktop) && isRootMyPage) {
      router.replace("/mypage/user-info");
    }
  }, [isRootMyPage, router, isTablet, isDesktop]);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex-1 max-w-[1200px] w-full mx-auto px-6">
          <div className="flex md:gap-[50px] mt-[30px] mb-[30px] xl:mt-[40px] xl:mb-[40px]">
            <SideMenu isRootMyPage={isRootMyPage} currentPath={pathname} />

            <div
              className={cn(
                isRootMyPage ? "hidden" : "block",
                "flex-grow",
                "w-full",
                "min-w-0",
              )}
            >
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
