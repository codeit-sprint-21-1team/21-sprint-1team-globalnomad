import Image from "next/image";
import { useUserBadge } from "../_libs/useUserBadge";
import "../_libs/Badge.css";

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
    <div className="flex justify-center text-[15px] font-bold leading-none tracking-[-2.5%] text-[#333333] mt-[24px]">
      <div
        className="animate-shine inline-flex items-center justify-center gap-[8px] rounded-full border border-[#EEEEEE] bg-[#F8F9FA] py-[6px] pl-[8px] pr-[12px] shadow-sm"
        style={{ "--shine-speed": shineSpeed } as React.CSSProperties}
      >
        <Image
          width={28}
          height={28}
          src={badgeImage}
          alt={`${badgeName} 아이콘`}
          className="shrink-0"
        />
        <span>{badgeName}</span>
      </div>
    </div>
  );
}
