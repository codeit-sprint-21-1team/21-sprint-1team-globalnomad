import Link from "next/link";
import Image from "next/image";

interface ReportCardPropsType {
  mode: "reservation" | "activity";
  id: number | undefined;
  title: string;
  description: string;
  imageUrl: string | undefined;
}

export default function ReportCard({
  mode,
  id,
  title,
  description,
  imageUrl,
}: ReportCardPropsType) {
  let linkUrl = "";
  if (mode === "reservation") {
    linkUrl = id ? `/activities/${id}` : "/activities";
  } else {
    linkUrl = id ? `/activities/${id}` : "/mypage/activity/create";
  }

  return (
    <Link
      href={linkUrl}
      className="group block w-full md:max-w-[228px] rounded-2xl md:rounded-3xl shadow-[0_4px_24px_0_#9CB4CA33]"
    >
      <article className="w-full cursor-pointer">
        <div className="relative flex h-[336px] flex-col overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative flex justify-center items-center w-full h-[250px] overflow-hidden rounded-t-2xl md:rounded-t-3xl">
            <Image
              src={imageUrl || "/images/no_list.png"}
              alt="체험 배너 이미지"
              fill={!!imageUrl}
              width={!imageUrl ? 100 : undefined}
              height={!imageUrl ? 100 : undefined}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          <div className="relative h-[146px] px-4 py-4 md:px-7 md:py-5 -mt-8 md:-mt-14 rounded-2xl md:rounded-3xl bg-white">
            <div className="flex flex-col gap-[2px] h-full">
              <h3 className="text-[18px] font-bold tracking-[-2.5%] text-[#1F1F22] truncate">
                {title}
              </h3>
              <div className="grow-1 text-[16px] md:text-[18px] font-medium line-clamp-3">
                {description}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
