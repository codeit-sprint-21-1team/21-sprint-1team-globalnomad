import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CloudRender from "@/components/ui/CloudRender";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-sky-300 to-white">
      <CloudRender />
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
