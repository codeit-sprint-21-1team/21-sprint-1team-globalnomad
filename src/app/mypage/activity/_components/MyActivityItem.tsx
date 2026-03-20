import Image from "next/image";
import { Activity } from "@/types/myActivities.type";

export default function MyActivityItem({
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
  category,
}: Activity) {
  return (
    <div className="flex justify-between w-full h-full md:w-[456px] md:h-[165px] xl:w-[640px] xl:h-[202px] rounded-[24px] px-[24px] py-[24px] md:px-[24px] md:py-[24px] xl:px-[30px] xl:py-[36px] shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
      <div className="flex-col w-[304px] h-auto text-gray-950 rounded-lg">
        <h3 className="text-[16px] xl:text-lg font-bold leading-none tracking-[-2.5%]">
          {title}
        </h3>
        <div className="flex items-center mt-[6px] xl:mt-[8px]">
          <div className="flex items-center font-medium text-[13px] xl:text-[16px] text-gray-500">
            ⭐ {rating.toFixed(1)} ({reviewCount})
          </div>
          {/* TODO:: 별이모지로 임시로 넣어 놓음 (추후 변경) */}

          <span className="text-[10px] font-bold leading-none tracking-[-2.5%] bg-amber-300 px-[10px] py-[5px] ml-[10px] rounded-2xl">
            {category}
          </span>
        </div>

        {/* TODO:: toLocaleString() (추후 변경) */}
        <div className="mt-[10px] xl:mt-[12px]">
          <span className="text-[16px] xl:text-lg font-extrabold text-gray-950">
            ₩{price.toLocaleString()}
            <span className="font-medium text-[16px] leading-none tracking-[-2.5%] text-gray-500">
              / 인
            </span>
          </span>
        </div>

        <div className="flex mt-[12px] xl:mt-[20px]">
          <button className="w-[70px] h-[29px] border rounded-[8px] bg-white px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-gray-600">
            수정하기
          </button>
          <button className="w-[70px] h-[29px] rounded-[8px] bg-gray-50 px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-gray-600 ml-[8px]">
            삭제하기
          </button>
        </div>
      </div>

      <div className="flex w-[82px] h-[82px]  xl:w-[142px] xl:h-[142px] gap-1">
        <Image
          src={bannerImageUrl}
          alt={title}
          unoptimized
          width={142}
          height={142}
          className="object-cover w-full h-full rounded-[32px]"
        />
      </div>
    </div>
  );
}
