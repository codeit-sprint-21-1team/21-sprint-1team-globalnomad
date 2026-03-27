import localFont from "next/font/local";
import "@/commons/styles/globals.css";
import { Metadata } from "next";
import ReactQueryProvider from "@/commons/contexts/ReactQueryProvider";
import { AuthProvider } from "@/commons/contexts/AuthContext";
import { DialogProvider } from "@/components/ui/Dialog";
import { ModalProvider } from "@/components/ui/Modal";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: "글로벌 노마드 | Global Nomad",
    template: "%s | 글로벌 노마드",
  },
  description:
    "전 세계의 특별한 체험을 탐색하고 간편하게 예약하세요. 지도와 캘린더 SDK를 활용하여 나만의 액티비티를 즐기는 가장 스마트한 방법, 글로벌 노마드입니다.",
  keywords: [
    "글로벌노마드",
    "GlobalNomad",
    "체험탐색",
    "액티비티예약",
    "여행체험",
    "캘린더예약",
    "지도기능",
  ],
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "글로벌 노마드 | Global Nomad - 특별한 체험 탐색과 예약",
    description:
      "SDK 리서치 역량을 바탕으로 구현된 정교한 지도와 캘린더 뷰를 통해, 복잡한 체험 탐색부터 예약 신청까지 유기적으로 경험해보세요.",
    url: "https://21-sprint-1team-globalnomad.vercel.app",
    siteName: "글로벌 노마드",
    images: [
      {
        url: "/images/og_image.png",
        width: 1200,
        height: 630,
        alt: "글로벌 노마드 메인 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "글로벌 노마드 | Global Nomad",
    description:
      "다양한 체험 상품 탐색부터 실시간 예약 신청까지, 글로벌 노마드에서 당신만의 특별한 일상을 완성해보세요.",
    images: ["/images/og_image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={pretendard.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <DialogProvider>
              <ModalProvider>{children}</ModalProvider>
            </DialogProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
