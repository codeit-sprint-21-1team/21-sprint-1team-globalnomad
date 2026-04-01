"use client";

import { useState } from "react";
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
  const count = subImages.length;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] grid-rows-2 h-[245px] md:h-[400px] rounded-xl overflow-hidden gap-1.5 md:gap-2.5">
        <div
          className={`relative overflow-hidden cursor-pointer ${count === 0 ? "col-span-2 row-span-2" : "row-span-2"}`}
          onClick={() => mainImageUrl && setSelectedImage(mainImageUrl)}
        >
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt="메인 배너"
              fill
              className="object-cover hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        {count === 1 && (
          <div
            className="relative overflow-hidden row-span-2 cursor-pointer"
            onClick={() => setSelectedImage(subImages[0].imageUrl)}
          >
            <Image
              src={subImages[0].imageUrl}
              alt="서브 이미지 1"
              fill
              className="object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}

        {count >= 2 &&
          [0, 1].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(subImages[i].imageUrl)}
            >
              <Image
                src={subImages[i].imageUrl}
                alt={`서브 이미지 ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[min(800px,90vw)] h-[min(600px,80vh)]">
            <Image
              src={selectedImage}
              alt="확대 이미지"
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
