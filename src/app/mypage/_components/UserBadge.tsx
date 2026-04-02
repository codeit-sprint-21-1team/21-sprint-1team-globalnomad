import Image from "next/image";
import { useUserBadge } from "../_libs/useUserBadge";
import "../_libs/Badge.css";
import Link from "next/link";

export default function UserBadge() {
  const { badgeLevel, badgeName, isLoading } = useUserBadge();
  let badgeImage = "";
  let shineSpeed = "0s";

  if (badgeLevel === 1) {
    badgeImage = "/icons/badge_lv1.svg";
    shineSpeed = "6s";
  } else if (badgeLevel === 2) {
    badgeImage = "/icons/badge_lv2.svg";
    shineSpeed = "4s";
  } else if (badgeLevel === 3) {
    badgeImage = "/images/logo-symbol.svg";
    shineSpeed = "2s";
  }

  if (isLoading) return null;

  return (
    <Link href="/mypage/nomad-report">
      <div className="flex justify-center text-[14px] font-bold leading-none tracking-[-2.5%] text-[#333333] mt-[10px]">
        <div
          className="animate-shine inline-flex items-center justify-center gap-[8px] rounded-full border border-[#EEEEEE] bg-[#F8F9FA] py-[6px] pl-[8px] pr-[12px] shadow-sm"
          style={{ "--shine-speed": shineSpeed } as React.CSSProperties}
        >
          <Image
            width={26}
            height={26}
            src={badgeImage}
            alt={`${badgeName} 아이콘`}
            className="shrink-0"
          />
          <span>{badgeName}</span>
        </div>
      </div>
    </Link>
  );
}
