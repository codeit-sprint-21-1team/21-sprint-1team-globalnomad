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
    <>
      <Header />
      <div className="flex max-w-[490px] mx-auto mt-[30px] md:max-w-[684px] md:min-h-[370px] md:mx-auto md:mt-[30px] xl:max-w-[980px] xl:min-h-[450px] xl:mx-auto xl:mt-[40px]">
        <div className="flex-shrink-0 mx-auto">
          <SideMenu isRootMyPage={isRootMyPage} currentPath={pathname} />
        </div>

        <div
          className={cn(
            isRootMyPage ? "hidden" : "block",
            "w-full pb-[200px]",
            "md:block md:ml-[50px] md:w-[456px] flex-1 md:pb-[250px]",
            "xl:pb-[250px]",
          )}
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
