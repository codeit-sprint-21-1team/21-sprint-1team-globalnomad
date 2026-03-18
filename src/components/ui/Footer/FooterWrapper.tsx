'use client';

import { usePathname } from 'next/navigation';
import Footer from './index';

const HIDDEN_PATHS = ['/login', '/signup'];

export default function FooterWrapper() {
  const pathname = usePathname();
  if (HIDDEN_PATHS.includes(pathname)) return null;
  return <Footer />;
}
