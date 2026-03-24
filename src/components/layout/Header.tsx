"use client";

import { cn } from "@/commons/utils/cn";
import Image from "next/image";
import Link from "next/link";

import AuthButton from "../ui/Auth/AuthButton";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "relative top-0 z-50 border-b border-gray-200 bg-white",
        className,
      )}
    >
      <div className="mx-auto flex h-[70px] items-center justify-between px-6 md:h-[80px] md:px-20 xl:px-50">
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
        <AuthButton />
      </div>
    </header>
  );
}
