"use client";

import type { ReactNode } from "react";
import { cn } from "@/commons/utils/cn";
import Link from "next/link";
import { KaKaoButton } from "./_components/KakaoButton";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isLogin = pathname.includes("login");
  const mode = isLogin ? "login" : "signup";

  return (
    <div className="flex items-center justify-center min-h-[100vh] px-[24px] py-[40px] md:py-[60px] xl:py-[80px]">
      <div className="flex flex-col max-w-[1200px] w-full">
        <header className="flex flex-col items-center mb-[42px] md:mb-[62px]">
          <h1 className="sr-only">{isLogin ? "로그인" : "회원가입"}</h1>
          <Link
            className="flex flex-col items-center gap-[24px]"
            href="/"
            aria-label="글로벌노마드 홈으로 이동"
          >
            <Image
              width={144}
              height={144}
              src="/images/logo-symbol.svg"
              alt=""
              priority
            />

            <Image
              width={255}
              height={31}
              src="/images/logo-text.svg"
              alt="글로벌노마드"
              priority
              className="hidden md:block"
            />
          </Link>
        </header>

        <main>
          {children}

          <section className="flex flex-col gap-[20px] mt-[20px] mb-[24px] md:gap-[30px] md:mt-[30px] md:mb-[30px]">
            <h2
              className={cn(
                "relative flex items-center gap-[14px]",
                "text-[16px] tracking-[-2.5%] font-medium text-[#9FA0A7]",
                "before:content-[''] before:top-[50%] before:left-0 before:flex-1 before:h-[1px] before:bg-[#DDDDDD]",
                "after:content-[''] after:top-[50%] after:left-0 after:flex-1 after:h-[1px] after:bg-[#DDDDDD]",
              )}
            >
              SNS 계정으로 {isLogin ? "로그인" : "회원가입"}하기
            </h2>
            <KaKaoButton mode={mode} />
          </section>
        </main>

        <footer className="text-[16px] tracking-[-2.5%] font-medium text-[#9FA0A7] text-center">
          <span>{isLogin ? "회원이 아니신가요?" : "회원이신가요?"}</span>
          &nbsp;
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
