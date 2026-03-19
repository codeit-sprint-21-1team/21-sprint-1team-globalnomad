"use client";

import { memo } from "react";
import Link from "next/link";
import { MypageButton } from "@/components/ui/Buttons/MypageButton";
import {
  CircleUserRound,
  MessageSquareText,
  Settings,
  CalendarDays,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/commons/utils/cn";

const ICONS: Record<string, LucideIcon> = {
  user: CircleUserRound,
  reservation: MessageSquareText,
  activity: Settings,
  status: CalendarDays,
};

export const MenuItem = memo(
  ({
    href,
    label,
    iconName,
    isActive,
  }: {
    href: string;
    label: string;
    iconName: string;
    isActive: boolean;
  }) => {
    const Icon = ICONS[iconName];
    return (
      <li className="w-full w-[299px] h-[54px] md:w-[150px] md:h-[48px] xl:w-full hover:bg-sky-50 hover:rounded-xl">
        <MypageButton active={isActive} asChild>
          <Link href={href}>
            {Icon && (
              <Icon
                size={20}
                className={cn(
                  "transition-colors",
                  isActive ? "text-blue-500" : "text-gray-600",
                )}
              />
            )}
            <span>{label}</span>
          </Link>
        </MypageButton>
      </li>
    );
  },
);
MenuItem.displayName = "MenuItem";
