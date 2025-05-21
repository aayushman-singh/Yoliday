"use client";

import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { MobileNavigation } from "@/components/mobile-navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
} from "lucide-react";

export function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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

        <main className="flex-1 pt-12 overflow-y-auto p-4 pb-24 md:pb-4">
          <div className="mx-auto max-w-7xl">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-4 sm:mb-0 sm:mr-6">
                  <User className="h-12 w-12" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                  <p className="text-sm text-gray-500">Product Manager</p>
                  <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Design
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Management
                    </span>
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                      Strategy
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {["overview", "projects", "settings", "billing"].map(
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

              {/* Overview Tab Content */}
              {activeTab === "overview" && (
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <div className="bg-white overflow-hidden rounded-lg border border-gray-200 shadow">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Personal Information
                        </h3>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              John Doe
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              john.doe@example.com
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              Phone number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              +1 (555) 123-4567
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              Location
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              San Francisco, CA
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="bg-white overflow-hidden rounded-lg border border-gray-200 shadow">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Professional Information
                        </h3>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                              <Briefcase className="h-4 w-4 mr-2" />
                              Job title
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              Product Manager
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                              <Briefcase className="h-4 w-4 mr-2" />
                              Department
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              Product Development
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Joined
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              January 15, 2022
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Skills
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "Product Management",
                                  "UX Design",
                                  "Market Research",
                                  "Agile",
                                  "Scrum",
                                  "Data Analysis",
                                  "Strategic Planning",
                                ].map((skill, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="mt-6 bg-white overflow-hidden rounded-lg border border-gray-200 shadow">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Recent Activity
                        </h3>
                      </div>
                      <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                          {[
                            "Completed project review for Marketing Campaign",
                            "Updated profile information",
                            "Added new project: E-commerce Redesign",
                            "Commented on Design System project",
                            "Uploaded new documents to Mobile App project",
                          ].map((activity, index) => (
                            <li key={index} className="px-4 py-3">
                              <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                                    <span className="text-orange-600 text-xs font-medium">
                                      JD
                                    </span>
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-800">
                                    {activity}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      Date.now() - index * 86400000
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Tab Content */}
              {activeTab === "projects" && (
                <div className="mt-6 text-center py-10 text-gray-500">
                  Your projects will appear here
                </div>
              )}

              {/* Settings Tab Content */}
              {activeTab === "settings" && (
                <div className="mt-6 text-center py-10 text-gray-500">
                  Account settings will appear here
                </div>
              )}

              {/* Billing Tab Content */}
              {activeTab === "billing" && (
                <div className="mt-6 text-center py-10 text-gray-500">
                  Billing information will appear here
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Mobile navigation */}
        <MobileNavigation activeTab="profile" setActiveTab={() => {}} />
      </div>
    </div>
  );
}
