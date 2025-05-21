"use client";

import { Bell, Menu, Search } from "lucide-react";
import { UserDropdown } from "@/components/user-dropdown";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <Bell className="h-6 w-6" />
          </button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
