"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ProjectList } from "@/components/project-list";
import { MobileNavigation } from "@/components/mobile-navigation";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-orange-500 pt-5 pb-4">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden bg-gray-200">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-12 pb-24 md:pb-4">
          <div className="mx-auto max-w-7xl">
            {/* Content container with white background and rounded corners */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-16 md:mb-4">
              {/* Heading */}
              <h1 className="text-xl font-semibold text-gray-900 mb-4">
                Portfolio
              </h1>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {["projects", "saved", "shared", "achievements"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                          activeTab === tab
                            ? "border-orange-700 text-orange-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </nav>
              </div>

              {/* Filter button (desktop only) */}
              <div className="hidden md:flex justify-end mt-4 mb-4"></div>

              {/* Tab content */}
              <div className="mt-2">
                {activeTab === "projects" && <ProjectList />}
                {activeTab === "saved" && (
                  <div className="text-center py-10 text-gray-500">
                    No saved projects yet
                  </div>
                )}
                {activeTab === "shared" && (
                  <div className="text-center py-10 text-gray-500">
                    No shared projects yet
                  </div>
                )}
                {activeTab === "achievements" && (
                  <div className="text-center py-10 text-gray-500">
                    No achievements yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Mobile navigation */}
        <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
