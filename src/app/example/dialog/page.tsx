"use client";

import { useDialog } from "@/components/ui/dialog";

function DialogTestButtons() {
  const { showDialog } = useDialog();

  const handleAlert = () => {
    showDialog({
      type: "alert",
      content: "알림 메시지입니다.",
    });
  };

  const handleConfirm = () => {
    showDialog({
      type: "confirm",
      content: "정말로 삭제하시겠습니까?",
      onConfirm: () => alert("확인 클릭됨"),
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <button
        onClick={handleAlert}
        className="rounded-xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
      >
        Alert Dialog 열기
      </button>
      <button
        onClick={handleConfirm}
        className="rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600"
      >
        Confirm Dialog 열기
      </button>
    </div>
  );
}

export default function TestForDialog() {
  return <DialogTestButtons />;
}
