import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  enabled?: boolean;
  loading?: boolean;
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

function useInfiniteScroll({
  onIntersect,
  enabled = true,
  loading = false,
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
}: UseInfiniteScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      observer.disconnect();
    };
  }, [onIntersect, enabled, loading, threshold, root, rootMargin]);

  return targetRef;
}

export default useInfiniteScroll;
