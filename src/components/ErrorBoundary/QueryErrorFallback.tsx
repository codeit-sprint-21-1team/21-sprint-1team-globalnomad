import { type ReactNode } from "react";

import { Button } from "@/components/ui/Buttons/Button";

interface QueryErrorFallbackProps {
  reset: () => void;
  message?: string;
}

function QueryErrorFallback({
  reset,
  message,
}: QueryErrorFallbackProps): ReactNode {
  const displayMessage = message ?? "데이터를 불러오는 데 실패했습니다.";

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-gray-500">
      <p className="text-sm">{displayMessage}</p>
      <Button size="sm" variant="secondary" onClick={reset} className="w-auto px-6">
        다시 시도
      </Button>
    </div>
  );
}

export default QueryErrorFallback;
