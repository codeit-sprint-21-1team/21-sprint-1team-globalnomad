import localFont from "next/font/local";
import "@/commons/styles/globals.css";
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
