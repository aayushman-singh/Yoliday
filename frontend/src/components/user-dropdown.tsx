"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex items-center rounded-full text-sm focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image
              src="/dp.jpg"
              alt="User profile"
              fill // This makes the image fill the container
              className="object-cover" // Ensures the image covers the area while maintaining aspect ratio
              sizes="32px" // Optimization hint
            />
          </div>
          <div className="ml-2 hidden text-sm font-medium text-gray-700 md:block">
            <p>Jane Doe</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>  

          <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
