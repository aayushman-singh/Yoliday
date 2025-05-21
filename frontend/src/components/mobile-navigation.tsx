"use client";

import { Home, Bookmark, Share2, Award } from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileNavigation({
  activeTab,
  setActiveTab,
}: MobileNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex flex-1 flex-col items-center justify-center py-2 ${
            activeTab === "projects" ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="mt-1 text-xs">Projects</span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex flex-1 flex-col items-center justify-center py-2 ${
            activeTab === "saved" ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <Bookmark className="h-6 w-6" />
          <span className="mt-1 text-xs">Saved</span>
        </button>

        <button
          onClick={() => setActiveTab("shared")}
          className={`flex flex-1 flex-col items-center justify-center py-2 ${
            activeTab === "shared" ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <Share2 className="h-6 w-6" />
          <span className="mt-1 text-xs">Shared</span>
        </button>

        <button
          onClick={() => setActiveTab("achievements")}
          className={`flex flex-1 flex-col items-center justify-center py-2 ${
            activeTab === "achievements" ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <Award className="h-6 w-6" />
          <span className="mt-1 text-xs">Achievements</span>
        </button>
      </div>
    </div>
  );
}
