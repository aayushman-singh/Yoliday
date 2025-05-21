"use client";

import { useRef, useEffect, useState } from "react";

type FilterDropdownProps = {
  onClose: () => void;
  onApply: (filters: {
    domains: string[];
    dateSort: "newest" | "oldest" | null;
  }) => void;
};

export function FilterDropdown({ onClose, onApply }: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [dateSort, setDateSort] = useState<"newest" | "oldest" | null>(null);

  const handleCheckbox = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="fixed bottom-24 left-1/2 z-50 w-64 -translate-x-1/2 transform rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
             sm:absolute sm:bottom-auto sm:left-auto sm:right-0 sm:mt-2 sm:translate-x-0 sm:transform sm:origin-top-right"
    >
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">Domain</h3>
        <div className="mt-2 space-y-2">
          {["Frontend", "Backend", "UI/UX", "Graphic Design"].map((domain) => (
            <div className="flex items-center" key={domain}>
              <input
                type="checkbox"
                checked={selectedDomains.includes(domain)}
                onChange={() => handleCheckbox(domain)}
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label className="ml-2 text-sm text-gray-700">{domain}</label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">Date</h3>
          <div className="mt-2 space-y-2">
            {["newest", "oldest"].map((option) => (
              <div className="flex items-center" key={option}>
                <input
                  type="radio"
                  checked={dateSort === option}
                  onChange={() => setDateSort(option as "newest" | "oldest")}
                  className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label className="ml-2 text-sm text-gray-700 capitalize">
                  {option} first
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
            onClick={() => {
              onApply({ domains: selectedDomains, dateSort });
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
