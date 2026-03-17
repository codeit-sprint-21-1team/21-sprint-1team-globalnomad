import { Image as ImageIcon } from "lucide-react";

export default function ImagePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400">
      <ImageIcon className="w-16 h-16 opacity-40" />
    </div>
  );
}
