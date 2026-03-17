import Image from "next/image";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface SubImage {
  id: number;
  imageUrl: string;
}

interface BannerImagesProps {
  mainImageUrl: string;
  subImages: SubImage[];
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
