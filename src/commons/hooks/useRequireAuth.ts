"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/commons/contexts/AuthContext";

export function useRequireAuth() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (action: () => void) => {
    if (!user) {
      router.push(`/auth/login?redirect=${pathname}`);
      return;
    }
    action();
  };
}
