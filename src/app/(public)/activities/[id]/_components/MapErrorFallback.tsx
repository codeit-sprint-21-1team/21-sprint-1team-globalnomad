import { MapPin } from "lucide-react";

interface MapErrorFallbackProps {
  address: string;
}

export function MapErrorFallback({ address }: MapErrorFallbackProps): JSX.Element {
  return (
    <>
      <span className="mt-4 md:mt-8 text-[16px] md:text-[18px] font-bold">
        오시는 길
      </span>
      <span className="flex gap-0.5 items-center mt-2 mb-3 text-[14px]">
        <MapPin size={16} />
        {address}
      </span>
      <div className="w-full h-[450px] rounded-2xl mb-5 md:mb-10 flex flex-col items-center justify-center gap-3 bg-gray-100 text-gray-500">
        <MapPin size={32} className="text-gray-400" />
        <p className="text-sm font-medium">주소를 찾을 수 없습니다.</p>
        <a
          href={`https://map.kakao.com/link/search/${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 underline"
        >
          카카오맵에서 직접 검색하기
        </a>
      </div>
      <hr />
    </>
  );
}
