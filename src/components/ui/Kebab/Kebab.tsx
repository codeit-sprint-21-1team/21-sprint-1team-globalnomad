"use client";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { EllipsisVertical } from "lucide-react";

interface KebabProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function Kebab({ onEdit, onDelete }: KebabProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button className="flex items-center justify-center rounded p-1 hover:bg-gray-100 focus:outline-none">
          <EllipsisVertical className="size-5 text-gray-600" />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={4}
          className="z-50 min-w-[120px] rounded-lg border border-gray-200 bg-white  shadow-md"
        >
          <DropdownMenuPrimitive.Item
            onSelect={onEdit}
            className="cursor-pointer px-4 py-3 rounded-lg text-center text-sm font-medium text-gray-800 outline-none hover:bg-gray-50"
          >
            수정하기
          </DropdownMenuPrimitive.Item>
          <DropdownMenuPrimitive.Item
            onSelect={onDelete}
            className="cursor-pointer px-4 py-3 rounded-lg text-center text-sm font-medium text-gray-800 outline-none hover:bg-gray-50"
          >
            삭제하기
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
