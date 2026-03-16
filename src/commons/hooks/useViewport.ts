"use client";

import { useState, useEffect } from "react";
import { useViewportStore } from "@/commons/zustand/useViewportStore";

const DEFAULT_VIEWPORT = {
  type: "mobile" as const,
  isMobile: true,
  isTablet: false,
  isDesktop: false,
};
/**
 * 뷰 포트 체크 커스텀 훅
 * @returns
 * type: string ("mobile" | "tablet" | "desktop")
 * isMobile: boolean
 * isTablet: boolean
 * isDesktop: boolean
 */
export const useViewport = () => {
  const [isMounted, setIsMounted] = useState(false);
  const viewport = useViewportStore();
  const init = useViewportStore((state) => state.init);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);
    const unsubscribe = init();
    return () => unsubscribe();
  }, [init]);

  return isMounted ? viewport : DEFAULT_VIEWPORT;
};
