import { StarRating } from "@/components/ui/StarRating/StarRating";

export default function StarPage() {
  return (
    <>
      <h2 className="mb-[40px]">StarRating 컴포넌트 예시</h2>
      <ul className="flex flex-col gap-[20px]">
        <li>
          <p>score=1 → 별 1개</p>
          <StarRating score={1} />
        </li>
        <li>
          <p>score=3 → 별 3개</p>
          <StarRating score={3} />
        </li>
        <li>
          <p>score=3.5 → 별 4개 (반올림)</p>
          <StarRating score={3.5} />
        </li>
        <li>
          <p>score=5 → 별 5개</p>
          <StarRating score={5} />
        </li>
        <li>
          <p>score=0.3 → 별 1개 (최소)</p>
          <StarRating score={0.3} />
        </li>
        <li>
          <p>score=6 → 별 5개 (최대)</p>
          <StarRating score={6} />
        </li>
      </ul>
    </>
  );
}
