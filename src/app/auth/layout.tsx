"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthLogo from "./_components/AuthLogo";
import SocialAuthSection from "./_components/SocialAuthSection";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.includes("login");

  return (
    <div className="flex items-center justify-center min-h-[100vh] px-[24px] md:px-[52px] py-[40px] md:py-[60px] xl:py-[80px]">
      <div className="flex flex-col max-w-[640px] w-full">
        <header className="flex flex-col items-center mb-[42px] md:mb-[62px]">
          <h1 className="sr-only">{isLogin ? "로그인" : "회원가입"}</h1>
          <AuthLogo />
        </header>

        <main>
          {children}

          <SocialAuthSection mode={isLogin ? "login" : "signup"} />
        </main>

        <footer className="flex items-center justify-center gap-[4px] text-[16px] tracking-[-2.5%] font-medium text-[#9FA0A7] text-center">
          <span>{isLogin ? "회원이 아니신가요?" : "회원이신가요?"}</span>
          <Link
            className="underline"
            href={isLogin ? "/auth/signup" : "/auth/login"}
          >
            {isLogin ? "회원가입하기" : "로그인하기"}
          </Link>
        </footer>
      </div>
    </div>
  );
}
