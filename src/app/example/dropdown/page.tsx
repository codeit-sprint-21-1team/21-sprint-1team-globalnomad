"use client";

import { useState } from "react";
import { DropdownMenuCheckboxItem } from "@/components/ui/Dropdown/DropdownMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/Dropdown/Button";

export default function DropdownPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <h2 className="mb-[40px]">드롭다운 화면</h2>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>가격</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
              checked={showStatusBar ?? false}
              onCheckedChange={setShowStatusBar}
            >
              옵션1 선택됨
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              옵션2
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              옵션3
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
