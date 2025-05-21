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

        <div className="flex flex-1 justify-center md:justify-end">
          <div className="w-full max-w-lg md:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Search projects"
                type="search"
              />
            </div>
          </div>
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
