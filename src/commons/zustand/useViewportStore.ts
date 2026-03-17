import { create } from "zustand";
import { VIEWPORT_QUERIES } from "@/commons/consts/viewport";

type ViewportType = "mobile" | "tablet" | "desktop";
interface ViewportState {
  type: ViewportType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  init: () => () => void;
}

const getViewportType = (): ViewportType => {
  if (typeof window === "undefined") return "mobile";
  if (window.matchMedia(VIEWPORT_QUERIES.mobile).matches) return "mobile";
  if (window.matchMedia(VIEWPORT_QUERIES.tablet).matches) return "tablet";
  return "desktop";
};

export const useViewportStore = create<ViewportState>((set) => {
  let initialized = false;

  return {
    type: "mobile",
    isMobile: true,
    isTablet: false,
    isDesktop: false,
    init: () => {
      if (typeof window === "undefined" || initialized) return () => {};
      initialized = true;

      const handleChange = () => {
        const nextType = getViewportType();
        set({
          type: nextType,
          isMobile: nextType === "mobile",
          isTablet: nextType === "tablet",
          isDesktop: nextType === "desktop",
        });
      };

      handleChange();

      const mqls = Object.values(VIEWPORT_QUERIES).map((query) => {
        const mql = window.matchMedia(query);
        mql.addEventListener("change", handleChange);
        return mql;
      });

      return () => {
        mqls.forEach((mql) => mql.removeEventListener("change", handleChange));
        initialized = false;
      };
    },
  };
});
