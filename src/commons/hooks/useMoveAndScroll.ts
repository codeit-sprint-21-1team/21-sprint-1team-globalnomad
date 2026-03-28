"use client";

import { useRouter } from "next/navigation";

export function useMoveAndScroll() {
  const router = useRouter();

  const moveToBottom = (href: string) => {
    router.push(href);

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  return { moveToBottom };
}
