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
    <footer className=" w-full border-t border-gray-200 bg-white z-50">
      <div className="mx-auto flex flex-col gap-3 px-6 py-3.5 h-[80px] md:h-[90px] md:flex-row md:items-center md:justify-between md:px-20 xl:px-50 md:gap-0">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-medium  md:order-2">
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="#" className="hover:underline">
            FAQ
          </Link>
        </div>

        <div className="flex items-center justify-between md:contents">
          <span className="text-sm text-gray-400 font-medium md:order-1">
            ©codeit - 2023
          </span>

          <div className="flex items-center gap-4 md:order-3">
            {SNS_LINKS.map(({ href, src, alt }) => (
              <a key={alt} href={href}>
                <Image src={src} alt={alt} width={20} height={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
