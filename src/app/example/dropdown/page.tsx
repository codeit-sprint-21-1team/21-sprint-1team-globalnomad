"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/Dropdown/DropdownMenu";
import { DropdownButton } from "@/components/ui/Dropdown/Button";

export default function DropdownPage() {
  const [selectedOption, setSelectedOption] = useState("옵션1");

  return (
    <>
      <h2 className="mb-[40px]">드롭다운 화면</h2>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownButton>{selectedOption}</DropdownButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
            >
              <DropdownMenuRadioItem value="옵션1">옵션1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="옵션2">옵션2</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="옵션3">옵션3</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
