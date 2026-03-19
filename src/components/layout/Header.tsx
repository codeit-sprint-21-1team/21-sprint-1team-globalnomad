"use client";

import { useAuth } from "@/commons/contexts/AuthContext";
import { cn } from "@/commons/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "px-2.5 md:px-5 py-2.5 md:py-5",
        className,
      )}
    >
      <div className="max-w-385 mx-auto h-10 flex items-center justify-between">
        <Link href="/">
          <div className="md:hidden">
            <Image
              src="/images/logo-symbol.svg"
              alt="글로벌노마드 홈"
              width={28}
              height={28}
              priority
            />
          </div>

          <div className="hidden md:block">
            <Image
              src="/images/logo-full.svg"
              alt="글로벌노마드 홈"
              width={174}
              height={28}
              priority
            />
          </div>
        </Link>
        {user ? (
          <>
            {user.nickname}
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          </>
        ) : (
          <Link href="/login">로그인</Link>
        )}
      </div>
    </header>
  );
}
