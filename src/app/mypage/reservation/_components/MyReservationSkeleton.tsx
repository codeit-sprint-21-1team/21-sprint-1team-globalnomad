import { cn } from "@/commons/utils/cn";

export default function MyReservationSkeleton({
  count = 1,
}: {
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col w-full gap-[12px] mb-[18px]">
          <div
            className={`xl:hidden pt-[20px] ${
              i === 0 ? "border-t-0" : "border-t border-gray-200"
            }`}
          >
            <div className="w-[100px] h-[20px] bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="relative w-full h-[136px] md:h-[153px] xl:h-[181px] rounded-[24px] shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] overflow-hidden bg-white">
            <div
              className={cn(
                "absolute left-0 top-0 z-10 flex flex-col",
                "w-[calc(100%-136px)] md:w-[calc(100%-153px)] xl:w-[calc(100%-181px)]",
                "h-full p-[20px] bg-white",
              )}
            >
              <div className="w-[50px] h-[24px] bg-gray-100 rounded-[24px] animate-pulse" />

              <div className="w-[80%] h-[18px] xl:h-[22px] bg-gray-200 rounded mt-[8px] animate-pulse" />

              <div className="flex items-center mt-[4px] xl:mt-[8px]">
                <div className="w-[60%] h-[14px] xl:h-[18px] bg-gray-100 rounded animate-pulse" />
              </div>

              <div className="flex justify-between items-end mt-auto">
                <div className="flex items-baseline gap-1">
                  <div className="w-[70px] h-[20px] xl:h-[24px] bg-gray-200 rounded animate-pulse" />
                  <div className="w-[40px] h-[16px] bg-gray-100 rounded animate-pulse" />
                </div>

                <div className="hidden xl:flex gap-[12px]">
                  <div className="w-[75px] h-[29px] bg-gray-100 rounded-[8px] animate-pulse" />
                  <div className="w-[75px] h-[29px] bg-gray-100 rounded-[8px] animate-pulse" />
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-0 w-[136px] h-[136px] md:w-[153px] md:h-[153px] xl:w-[181px] xl:h-[181px] bg-gray-200 animate-pulse" />
          </div>

          <div className="flex xl:hidden justify-end gap-[12px]">
            <div className="w-[49.5%] h-[37px] bg-gray-100 rounded-[8px] animate-pulse" />
            <div className="w-[49.5%] h-[37px] bg-gray-100 rounded-[8px] animate-pulse" />
          </div>
        </div>
      ))}
    </>
  );
}
