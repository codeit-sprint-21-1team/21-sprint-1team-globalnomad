"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/commons/contexts/AuthContext";

export function useRequireAuth() {
  const { user } = useAuth();
  const router = useRouter();

  return (action: () => void) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    action();
  };
}
