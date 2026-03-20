import { cn } from "@/commons/utils/cn";
import { useState, memo } from "react";
import { ProfileSection } from "./ProfileSection";
import { MenuItem } from "./MenuItem";

const MENU_ITEMS = [
  { href: "/mypage/user-info", label: "내 정보", iconName: "user" },
  { href: "/mypage/reservation", label: "예약내역", iconName: "reservation" },
  { href: "/mypage/activity", label: "내 체험 관리", iconName: "activity" },
  {
    href: "/mypage/reservation-status",
    label: "예약 현황",
    iconName: "status",
  },
];

export const SideMenu = memo(
  ({
    isRootMyPage,
    currentPath,
  }: {
    isRootMyPage: boolean;
    currentPath: string;
  }) => {
    const [imageSrc, setImageSrc] = useState<string>(
      "/images/blank_profile.png",
    );

    return (
      <aside
        className={cn(
          isRootMyPage ? "block" : "hidden",
          "w-[327px] mx-auto",
          "md:block md:w-[178px] md:h-auto",
          "xl:w-[290px] xl:h-auto",
          "bg-white shadow-[0px_4px_24px_0px_#9CB4CA33]",
          "border border-solid rounded-xl",
          "py-6 px-[14px]",
          "border-gray-50",
        )}
      >
        <ProfileSection imageSrc={imageSrc} />
        <nav>
          <ul className="flex flex-col items-center md:gap-[12px] xl:gap-[14px] mt-[24px]">
            {MENU_ITEMS.map((item) => (
              <MenuItem
                key={item.href}
                href={item.href}
                label={item.label}
                iconName={item.iconName}
                isActive={currentPath === item.href}
              />
            ))}
          </ul>
        </nav>
      </aside>
    );
  },
);
SideMenu.displayName = "SideMenu";
