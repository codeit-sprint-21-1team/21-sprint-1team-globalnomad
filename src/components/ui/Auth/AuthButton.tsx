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
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback>{user.nickname}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/mypage" className="w-full">
                마이페이지
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full cursor-pointer"
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
