export default function MyActivitySkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between w-full h-[165px] md:w-[456px] md:h-[165px] xl:w-[640px] xl:h-[202px] rounded-[24px] px-[24px] py-[24px] xl:px-[30px] xl:py-[36px] shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] bg-white"
        >
          <div className="flex-col w-[304px] animate-pulse">
            <div className="h-4 w-55 md:h-4 md:w-55 xl:h-5 xl:w-55 bg-gray-200 rounded mb-2" />

            <div className="flex items-center mt-2 gap-2">
              <div className="h-4 w-20 md:h-4 md:w-20 xl:h-4 xl:w-20 bg-gray-200 rounded" />
              <div className="h-5 w-16 md:h-5 md:w-16 xl:h-6 xl:w-16 bg-gray-200 rounded-2xl" />
            </div>

            <div className="h-5 md:h-5 xl:h-6 w-24 bg-gray-200 rounded mt-3" />

            <div className="flex mt-3 md:mt-3 xl:mt-5 gap-2">
              <div className="h-[29px] w-[70px] bg-gray-100 rounded-[8px]" />
              <div className="h-[29px] w-[70px] bg-gray-50 rounded-[8px]" />
            </div>
          </div>

          <div className="w-[82px] h-[82px] xl:w-[142px] xl:h-[142px] bg-gray-200 rounded-[32px] animate-pulse" />
        </div>
      ))}
    </>
  );
}
