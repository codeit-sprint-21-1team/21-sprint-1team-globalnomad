"use client";

import { LabeledSelect } from "@/components/ui/Select/Select";

const options = [
  { value: "red", label: "빨강" },
  { value: "blue", label: "파랑" },
  { value: "yellow", label: "노랑" },
  { value: "green", label: "녹색" },
  { value: "white", label: "흰색" },
  { value: "black", label: "검정" },
];

const options_time = [
  { value: "0:00", label: "0:00" },
  { value: "1:00", label: "1:00" },
  { value: "2:00", label: "2:00" },
  { value: "3:00", label: "3:00" },
  { value: "4:00", label: "4:00" },
  { value: "5:00", label: "5:00" },
];

export default function SelectPage() {
  return (
    <div className="m-[20px]">
      <div className="mt-[40px]">
        <LabeledSelect
          labelTxt=""
          errorTxt=""
          placeholder="카테고리를 선택해주세요"
          items={options}
          onValueChange={(val) => console.log(val)}
        />
      </div>

      <div className="mt-[40px]">
        <LabeledSelect
          labelTxt=""
          errorTxt=""
          placeholder="0:00"
          items={options_time}
          onValueChange={(val) => console.log(val)}
          className="w-[122px]"
          maxHeight="max-h-[200px]"
        />
      </div>

      <div className="mt-[40px]">
        <LabeledSelect
          labelTxt="카테고리"
          errorTxt=""
          placeholder="카테고리를 선택해주세요"
          items={options}
          onValueChange={(val) => console.log(val)}
        />
      </div>

      <div className="mt-[40px]">
        <LabeledSelect
          labelTxt="카테고리"
          errorTxt="카테고리를 선택해주세요"
          placeholder="카테고리를 선택해주세요"
          items={options}
          onValueChange={(val) => console.log(val)}
        />
      </div>
    </div>
  );
}
