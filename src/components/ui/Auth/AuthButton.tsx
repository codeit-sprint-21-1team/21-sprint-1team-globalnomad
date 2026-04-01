import { useAuth } from "@/commons/contexts/AuthContext";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Dropdown/DropdownMenu";
import { Skeleton } from "../Skeleton/Skeleton";

export default function AuthButton() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profileImageUrl} alt="프로필 메뉴 열기" />
            <AvatarFallback className="overflow-hidden">
              {user.nickname.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="z-50 min-w-[120px] rounded-lg border border-gray-200 bg-white p-0 shadow-md"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer px-4 py-3 rounded-lg justify-center text-sm font-medium text-gray-800 outline-none hover:bg-gray-50 focus:bg-[#E5F3FF]">
              <Link href="/mypage" className="w-full text-center">
                마이페이지
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-4 py-3 rounded-lg justify-center text-sm font-medium text-gray-800 outline-none hover:bg-gray-50 focus:bg-[#E5F3FF]"
              onClick={logout}
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <div className="flex gap-4">
        <Link href="/auth/login">로그인</Link>
        <Link href="/auth/signup">회원가입</Link>
      </div>
    );
  }
}
