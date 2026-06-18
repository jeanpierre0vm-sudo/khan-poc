"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/poc", label: "PoC" },
  { href: "/screener", label: "Screener" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
        {links.map(({ href, label }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive
                  ? "text-white border-b-2 border-blue-400 pb-0.5"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {label}
            </Link>
          );
        })}
    </nav>
  );
}
