export const VIEWPORT_BREAKPOINTS = { TABLET: 768, DESKTOP: 1280 } as const;
export const VIEWPORT_QUERIES = {
  mobile: `(max-width: ${VIEWPORT_BREAKPOINTS.TABLET - 1}px)`,
  tablet: `(min-width: ${VIEWPORT_BREAKPOINTS.TABLET}px) and (max-width: ${VIEWPORT_BREAKPOINTS.DESKTOP - 1}px)`,
  desktop: `(min-width: ${VIEWPORT_BREAKPOINTS.DESKTOP}px)`,
} as const;
