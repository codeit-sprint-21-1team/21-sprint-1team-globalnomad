"use client";
import { Kebab } from "@/components/ui/Kebab";

export default function KebabPage() {
  return (
    <>
      <h2 className="mb-10">케밥 메뉴 예시</h2>

      <div className="relative w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="absolute right-2 top-2">
          <Kebab
            onEdit={() => alert("수정하기")}
            onDelete={() => alert("삭제하기")}
          />
        </div>
        <p className="text-sm text-gray-700">카드 타이틀</p>
        <p className="mt-1 text-xs text-gray-400">카드 설명 텍스트입니다.</p>
      </div>
    </>
  );
}
