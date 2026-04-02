import { type ReactNode } from "react";

export function ReviewListSkeleton(): ReactNode {
  return (
    <section className="mb-20 md:mb-30 animate-pulse">
      <div className="flex items-center gap-2 mb-3 md:mb-5 mt-4 md:mt-8">
        <div className="h-5 w-16 bg-gray-200 rounded" />
        <div className="h-5 w-8 bg-gray-200 rounded" />
      </div>

      <div className="flex flex-col items-center mb-6 gap-2">
        <div className="h-8 w-12 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>

      <ul className="flex flex-col gap-8 md:gap-5 mb-7">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-2">
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded" />
      </div>
    </section>
  );
}
