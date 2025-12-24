"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  items?: { name: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  // Default path generator if items not provided
  const breadcrumbs = items || [
    { name: "Home", href: "/" },
    ...paths.map((path, idx) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
      href: "/" + paths.slice(0, idx + 1).join("/"),
    })),
  ];

  return (
    <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-muted">
      {breadcrumbs.map((item, idx) => (
        <div key={item.href} className="flex items-center space-x-2">
          {idx === 0 ? (
            <Link href={item.href} className="hover:text-primary transition-colors flex items-center">
              <Home className="w-3 h-3 mr-1" />
              {item.name}
            </Link>
          ) : (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.name}
            </Link>
          )}
          {idx < breadcrumbs.length - 1 && (
            <ChevronRight className="w-3 h-3 opacity-30" />
          )}
        </div>
      ))}
    </nav>
  );
}
