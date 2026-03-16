import { Button } from "@/components/ui/Buttons/Button";
import { FilterButton } from "@/components/ui/Buttons/FilterButton";
import { MypageButton } from "@/components/ui/Buttons/MypageButton";
import Image from "next/image";
import Link from "next/link";

export default function ButtonPage() {
  return (
    <>
      <h2 className="mb-[40px]">버튼 컴포넌트 목록 화면</h2>
      <ul className="flex flex-col gap-[20px]">
        <li>
          <p>기본 버튼 - lg 사이즈</p>
          <Button variant="default" size="lg">
            label
          </Button>
          <Button variant="default" size="lg" disabled>
            label
          </Button>
        </li>
        <li>
          <p>기본 버튼 md 사이즈</p>
          <Button variant="default" size="md">
            label
          </Button>
        </li>
        <li>
          <p>기본 버튼 sm 사이즈</p>
          <Button variant="default" size="sm">
            label
          </Button>
        </li>
        <li>
          <p>세컨더리 버튼 - lg 사이즈</p>
          <Button variant="secondary" size="lg">
            label
          </Button>
          <Button variant="secondary" size="lg" className="disabled">
            label
          </Button>
        </li>
        <li>
          <p>세컨더리 버튼 md 사이즈</p>
          <Button variant="secondary" size="md">
            label
          </Button>
        </li>
        <li>
          <p>세컨더리 버튼 sm 사이즈</p>
          <Button variant="secondary" size="sm">
            label
          </Button>
        </li>
        <li>
          <p>버튼 안에 이미지 - lg 사이즈</p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">
              <Image
                width={24}
                height={24}
                src="/icons/kakao.svg"
                alt="카카오 아이콘"
              />
              카카오 로그인
            </Link>
          </Button>
        </li>
        <li>
          <p>버튼 안에 링크 - lg 사이즈</p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">로그인하러 가기</Link>
          </Button>
        </li>
        <li>
          <p>마이페이지 버튼 - active 속성 사용</p>
          <MypageButton>
            <Image
              width={24}
              height={24}
              src="/icons/kakao.svg"
              alt="카카오 아이콘"
            />
            label
          </MypageButton>
          <MypageButton active={true}>
            <Image
              width={24}
              height={24}
              src="/icons/kakao.svg"
              alt="카카오 아이콘"
            />
            label
          </MypageButton>
        </li>
        <li>
          <p>필터 버튼 - active 속성 사용</p>
          <FilterButton>
            <Image
              width={24}
              height={24}
              src="/icons/kakao.svg"
              alt="카카오 아이콘"
            />
            label
          </FilterButton>
          <FilterButton active={true}>
            <Image
              width={24}
              height={24}
              src="/icons/kakao.svg"
              alt="카카오 아이콘"
            />
            label
          </FilterButton>
        </li>
      </ul>
    </>
  );
}
