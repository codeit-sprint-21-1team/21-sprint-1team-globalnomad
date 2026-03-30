"use client";

import { useRef } from "react";
import PreviewItem from "./PreviewItem";
import { Plus } from "lucide-react";

interface ImageUploaderProps {
  maxCount?: number;
  value?: (File | string)[];
  onChange?: (files: (File | string)[]) => void;
}

export default function ImageUploader({
  maxCount = 4,
  value = [],
  onChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = maxCount;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !onChange) return;

    const newFiles = [...value, ...Array.from(files)].slice(0, MAX_IMAGES);

    onChange(newFiles);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    if (!onChange) return;

    const filteredFiles = value.filter((_, i) => i !== index);
    onChange(filteredFiles);
  };

  return (
    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full flex-nowrap">
      <div
        onClick={() =>
          value.length < MAX_IMAGES && fileInputRef.current?.click()
        }
        className="w-[128px] h-[128px] flex flex-col items-center justify-center border border-[#E0E0E5] rounded-[16px] cursor-pointer hover:bg-gray-50 transition shrink-0"
      >
        <Plus className="text-gray-400" size={24} />
        <span className="text-[10px] text-gray-400 mt-1">
          {value.length}/{MAX_IMAGES}
        </span>
      </div>

      {value.map((item, index) => {
        const src = typeof item === "string" ? item : URL.createObjectURL(item);
        return (
          <PreviewItem
            key={src}
            src={src}
            onRemove={() => removeImage(index)}
          />
        );
      })}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
