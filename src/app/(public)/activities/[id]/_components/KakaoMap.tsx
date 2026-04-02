"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
  title: string;
}

export default function KakaoMap({ address, title }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<Error | null>(null);

  if (mapError) throw mapError;

  const handleLoad = () => {
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container || container.childElementCount > 0) return;

      const geocoder = new window.kakao.maps.services.Geocoder();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoder.addressSearch(address, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const map = new window.kakao.maps.Map(container, {
            center: coords,
            level: 3,
          });

          const kakaoMapLink = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

          const wrapper = document.createElement("div");
          wrapper.className =
            "flex flex-col items-center drop-shadow-md transition-transform duration-200 hover:scale-105";

          const anchor = document.createElement("a");
          anchor.href = kakaoMapLink;
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          anchor.className =
            "flex items-center gap-2 pl-1.5 pr-4 py-1.5 bg-white rounded-full no-underline";

          const iconDiv = document.createElement("div");
          iconDiv.className =
            "w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0";
          iconDiv.innerHTML = renderToStaticMarkup(
            <MapPin size={16} stroke="white" strokeWidth={2.5} />,
          );

          const span = document.createElement("span");
          span.className =
            "text-sm font-semibold text-gray-900 max-w-[120px] truncate";
          span.textContent = title;

          const tail = document.createElement("div");
          tail.style.cssText =
            "width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid white";

          anchor.append(iconDiv, span);
          wrapper.append(anchor, tail);
          const overlayContent = wrapper;

          const overlay = new window.kakao.maps.CustomOverlay({
            position: coords,
            content: overlayContent,
            yAnchor: 1.0,
          });
          overlay.setMap(map);
        } else {
          setMapError(new Error(`주소를 찾을 수 없습니다: ${address}`));
        }
      });
    });
  };

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        onLoad={handleLoad}
      />
      <span className="mt-4 md:mt-8 text-[16px] md:text-[18px] font-bold">
        오시는 길
      </span>
      <span className="flex gap-0.5 items-center mt-2 mb-3 text-[14px]">
        <MapPin size={16} />
        {address}
      </span>
      <div
        ref={mapRef}
        className="w-full h-[450px] rounded-2xl overflow-hidden mb-5 md:mb-10"
      />
      <hr />
    </>
  );
}
