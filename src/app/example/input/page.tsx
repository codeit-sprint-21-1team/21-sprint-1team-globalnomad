"use client";

import { DateInputPicker } from "@/components/ui/DateInputPicker/DateInputPicker";
import { Input } from "@/components/ui/Input/Input";

export default function Page() {
  return (
    <>
      <div className="p-5">
        <Input type="email" placeholder="이메일을 입력하세요" />
      </div>
      <div className="p-5">
        <Input
          type="name"
          labelTxt="닉네임"
          placeholder="닉네임을 입력하세요"
        />
      </div>
      <div className="p-5">
        <Input
          type="password"
          labelTxt="비밀번호"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <div className="p-5">
        <Input
          labelTxt="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          errorTxt="비밀번호는 8자 이상이어야 합니다."
        />
      </div>
      <div className="p-5">
        <Input
          labelTxt="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          disabled
        />
      </div>

      <div className="p-5 w-[400px]">
        <DateInputPicker
          labelTxt="예약 날짜"
          onValueChange={(value) => console.log(value)}
        />
      </div>
    </>
  );
}
