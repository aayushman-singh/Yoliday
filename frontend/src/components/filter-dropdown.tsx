"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

type FilterDropdownProps = {
  onClose: () => void;
  onApply: (filters: {
    domains: string[];
    dateSort: "newest" | "oldest" | null;
  }) => void;
  currentFilters?: {
    domains: string[];
    dateSort: "newest" | "oldest" | null;
  };
};

const availableDomains = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Marketing",
  "Design",
  "Entertainment",
];

export function FilterDropdown({
  onClose,
  onApply,
  currentFilters,
}: FilterDropdownProps) {

  const [selectedDomains, setSelectedDomains] = useState<string[]>(
    currentFilters?.domains || []
  );
  const [dateSort, setDateSort] = useState<"newest" | "oldest" | null>(
    currentFilters?.dateSort || null
  );

  const handleDomainToggle = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleApply = () => {
    onApply({
      domains: selectedDomains,
      dateSort,
    });
    onClose();
  };

  const handleClearAll = () => {
    setSelectedDomains([]);
    setDateSort(null);
  };

  return (
    <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Filter Projects</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Domains */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Domains</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableDomains.map((domain) => (
              <div key={domain} className="flex items-center">
                <input
                  id={`domain-${domain}`}
                  name={`domain-${domain}`}
                  type="checkbox"
                  checked={selectedDomains.includes(domain)}
                  onChange={() => handleDomainToggle(domain)}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label
                  htmlFor={`domain-${domain}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {domain}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sort by Date */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Sort by Date
          </h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="newest"
                name="dateSort"
                type="radio"
                checked={dateSort === "newest"}
                onChange={() => setDateSort("newest")}
                className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="newest" className="ml-3 text-sm text-gray-600">
                Newest first
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="oldest"
                name="dateSort"
                type="radio"
                checked={dateSort === "oldest"}
                onChange={() => setDateSort("oldest")}
                className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="oldest" className="ml-3 text-sm text-gray-600">
                Oldest first
              </label>
            </div>
            {dateSort && (
              <div className="flex items-center">
                <input
                  id="no-sort"
                  name="dateSort"
                  type="radio"
                  checked={dateSort === null}
                  onChange={() => setDateSort(null)}
                  className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="no-sort" className="ml-3 text-sm text-gray-600">
                  No sorting
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={handleClearAll}
          >
            Clear all
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
