"use client";

import Image from "next/image";
import "./KakaoLoading.css";

export default function KaKaoLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-[100vh]">
      <div className="relative flex items-center justify-center w-40 h-40 animate-scale-pulse">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-[#3D9EF2] rounded-full animate-spin"></div>

        <Image
          width={100}
          height={100}
          src="/images/logo-symbol.svg"
          alt="지구"
          priority
          className="z-10"
        />
      </div>
      <p className="text-[20px] tracking-[-5%] font-bold text-[#9FA0A7]">
        카카오 인증 정보를 확인하고 있어요
      </p>
    </div>
  );
}
