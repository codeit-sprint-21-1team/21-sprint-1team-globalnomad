"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import authLogoData from "../_libs/auth_logo.json";
import { LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/commons/utils/cn";
import Link from "next/link";
import Image from "next/image";

export default function AuthLogo() {
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      lottieRef.current?.play();

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        lottieRef.current?.pause();
      }, 500);
    };

    window.addEventListener("typing-start", handleTyping);

    return () => {
      window.removeEventListener("typing-start", handleTyping);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return (
    <Link
      className="flex flex-col items-center"
      href="/"
      aria-label="글로벌노마드 홈으로 이동"
    >
      <div
        style={{
          width: "300px",
          height: "300px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/images/logo-symbol.svg"
          alt="글로벌노마드 로고"
          width={144}
          height={144}
          priority
          className={cn(
            "absolute transition-opacity duration-300",
            isLottieLoaded ? "opacity-0" : "opacity-100",
          )}
        />

        <Lottie
          lottieRef={lottieRef}
          animationData={authLogoData}
          autoplay={false}
          loop={true}
          onDOMLoaded={() => setIsLottieLoaded(true)}
          className={cn(
            "absolute transition-opacity duration-300",
            isLottieLoaded ? "opacity-100" : "opacity-0",
          )}
          style={{
            top: "50%",
            left: "50%",
            width: "144px",
            height: "144px",
            transform: "translate(-50%, -50%) scale(4.4) translate(3.5px, 2px)",
          }}
        />
      </div>

      <Image
        width={255}
        height={31}
        src="/images/logo-text.svg"
        alt="글로벌노마드"
        priority
        className="hidden md:block mt-[-53.5px]"
      />
    </Link>
  );
}
