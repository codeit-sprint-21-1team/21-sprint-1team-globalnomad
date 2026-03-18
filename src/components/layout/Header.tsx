import { cn } from "@/commons/utils/cn";

import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn("px-5 py-5", className)}>
      <div className="max-w-385 mx-auto h-10 flex items-center justify-between">
        <Link href="/">로고</Link>
        <Link href="/login">로그인</Link>
      </div>
    </header>
  );
}
