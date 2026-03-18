import { cn } from "@/commons/utils/cn";

export default function MyProfilePage() {
  return (
    <main className="px-[24px] py-[10px] md:px-0 md:py-0 xl:px-0 xl:py-0">
      <header className="mt-[10px]">
        <div
          className={cn(
            "w-full",
            "font-bold text-lg leading-[100%] tracking-[-2.5%] text-[#1F1F22]",
            "align-middle mt-[10px]",
          )}
        >
          내 정보
        </div>

        <div
          className={cn(
            "text-sm leading-[-2.5%] align-middle text-[#84858C]",
            "mt-[4px]",
          )}
        >
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </div>
      </header>

      <section className="mt-[20px] md:mt-[24px] xl:mt-[24px]">
        <article>
          <h2>1111</h2>
          <p>22222</p>
        </article>
      </section>
    </main>
  );
}
