import { cn } from "@/commons/utils/cn";
import { KaKaoButton } from "./KakaoButton";

interface SocialAuthSectionProps {
  mode: "login" | "signup";
}

export default function SocialAuthSection({ mode }: SocialAuthSectionProps) {
  return (
    <section className="flex flex-col gap-[20px] mt-[20px] mb-[24px] md:gap-[30px] md:mt-[30px] md:mb-[30px]">
      <h2
        className={cn(
          "relative flex items-center gap-[14px]",
          "text-[16px] tracking-[-2.5%] font-medium text-[#9FA0A7]",
          "before:content-[''] before:top-[50%] before:left-0 before:flex-1 before:h-[1px] before:bg-[#DDDDDD]",
          "after:content-[''] after:top-[50%] after:left-0 after:flex-1 after:h-[1px] after:bg-[#DDDDDD]",
        )}
      >
        SNS 계정으로 {mode === "login" ? "로그인" : "회원가입"}하기
      </h2>
      <KaKaoButton mode={mode} />
    </section>
  );
}
