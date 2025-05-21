"use client";

import {
  LayoutDashboard,
  FolderKanban,
  FileInput,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/",
    label: "Portfolio",
    icon: FolderKanban,
  },
  {
    href: "/inputs",
    label: "Inputs",
    icon: FileInput,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: UserCircle,
  },
];

export function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`flex w-64 flex-col bg-orange-600 ${className}`}>
      <div className="flex h-16 items-center pl-4"> {/* Added pl-4 for left padding */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-orange-600 font-bold">Y</span>
          </div>
          <span className="ml-2 text-white font-bold">YOLIDAY</span>
        </div>
      </div>
    
  
  
      <div className="mt-5 flex flex-1 flex-col">
        <nav className="flex-1 space-y-1 px-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href) || 
            (href === '/portfolio' && pathname === '/');

            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all
                  ${
                    isActive
                      ? "text-orange-800 bg-gradient-to-r from-white/60 to-transparent"
                      : "text-white hover:bg-white/10"
                  }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
