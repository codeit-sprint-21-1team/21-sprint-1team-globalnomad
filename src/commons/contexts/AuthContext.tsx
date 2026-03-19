"use client";

import { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/types/user.type";
import { getUserMe, postLogout } from "@/apis/auth.api";

interface AuthContextType {
  user: UserType | null | undefined;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserMe,
    retry: false,
  });

  const { mutate: logout } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      window.location.href = "/";
    },
  });

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider 내에서 사용해주세요");
  return context;
};
