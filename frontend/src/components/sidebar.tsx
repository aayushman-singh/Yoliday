"use client";
import Image from "next/image";
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
interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string
}

export function Sidebar({ open, setOpen, className }: SidebarProps) {

  const pathname = usePathname();

  // Determine which link should be active
  const getActiveLink = () => {
    // First check for non-portfolio matches
    const nonPortfolioMatch = links.find(
      (link) => link.href !== "/" && pathname.startsWith(link.href)
    );

    // If found, return it
    if (nonPortfolioMatch) return nonPortfolioMatch.href;

    // Otherwise check for portfolio match
    if (pathname === "/" || pathname === "/portfolio") return "/";

    // No matches
    return null;
  };

  const activeLink = getActiveLink();

  return (
    <div className={`flex w-64 flex-col bg-orange-600 ${className}`}>
      <div className="flex h-16 pt-10 items-center pl-4">
        <div className="flex items-center">
          <Image
            src="/logo.png" // Path to the logo image in the public folder
            alt="YOLIDAY Logo"
            width={128} // Set the width you want
            height={40} // Set the height you want
            className="object-contain" // Ensures the image retains its aspect ratio
          />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <nav className="flex-1 space-y-1 px-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = href === activeLink;

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
