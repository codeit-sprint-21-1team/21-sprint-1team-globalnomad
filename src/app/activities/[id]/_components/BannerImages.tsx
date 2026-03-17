import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface SubImage {
  id: number;
  imageUrl: string;
}

interface BannerImagesProps {
  mainImageUrl: string;
  subImages: SubImage[];
}

function ImagePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400">
      <ImageIcon className="w-16 h-16 opacity-40" />
    </div>
  );
}

export function BannerImages({ mainImageUrl, subImages }: BannerImagesProps) {
  return (
    <div className="grid grid-cols-[1fr_1fr] grid-rows-2 h-[245px] md:h-[400px] rounded-xl overflow-hidden gap-1.5 md:gap-2.5">
      <div className="relative row-span-2 overflow-hidden">
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt="메인 배너"
            fill
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {[0, 1].map((i) => (
        <div key={i} className="relative overflow-hidden">
          {subImages[i] ? (
            <Image
              src={subImages[i].imageUrl}
              alt={`서브 이미지 ${i + 1}`}
              fill
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      ))}
    </div>
  );
}
