import Image from "next/image";
import Link from "next/link";

const SNS_LINKS = [
  {
    href: "https://www.facebook.com/",
    src: "/icons/facebook.svg",
    alt: "Facebook",
  },
  {
    href: "https://www.instagram.com/",
    src: "/icons/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://www.youtube.com/",
    src: "/icons/youtube.svg",
    alt: "YouTube",
  },
  { href: "https://x.com/", src: "/icons/X.svg", alt: "X" },
];

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white z-50">
      <div className="mx-auto flex flex-col gap-3 px-6 py-5 h-[116px] md:h-[140px] md:flex-row md:items-center md:justify-between md:px-20 xl:px-50 md:gap-0">
        <div className="flex items-center justify-center gap-6 text-md text-gray-600 font-medium  md:order-2">
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="#" className="hover:underline">
            FAQ
          </Link>
        </div>

        <div className="flex items-center justify-between md:contents">
          <span className="text-md text-gray-400 font-medium md:order-1">
            ©codeit - 2026
          </span>

          <div className="flex items-center gap-4 md:order-3">
            {SNS_LINKS.map(({ href, src, alt }) => (
              <a key={alt} href={href}>
                <Image src={src} alt={alt} width={24} height={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
