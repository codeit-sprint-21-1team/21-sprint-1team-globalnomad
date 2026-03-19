"use client";

import { Star } from "lucide-react";
import { cn } from "@/commons/utils/cn";

interface StarRatingProps {
  score: number;
  className?: string;
}

export function StarRating({ score, className }: StarRatingProps) {
  const count = Math.min(5, Math.max(1, Math.round(score)));

  return (
    <div className={cn("flex items-center gap-0.1", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-[16px] fill-yellow-500 text-yellow-500" />
      ))}
    </div>
  );
}
