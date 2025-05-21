"use client";

import { SetStateAction, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { MobileNavigation } from "../components/mobile-navigation";
import { PlusCircle } from "lucide-react";

export function Inputs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("forms");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="hidden md:flex" open={false} setOpen={function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } />

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-orange-500 pt-5 pb-4">
            <Sidebar open={false} setOpen={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            } } />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden bg-gray-200">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 pt-12 overflow-y-auto p-4 pb-24 md:pb-4">
          <div className="mx-auto max-w-7xl">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-900">
                  Input Management
                </h1>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  New Input
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {["forms", "templates", "submissions", "settings"].map(
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

              {/* Forms Tab Content */}
              {activeTab === "forms" && (
                <div className="mt-6">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Form Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Created
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Submissions
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {[
                          {
                            name: "Contact Form",
                            created: "2023-05-12",
                            submissions: 145,
                            status: "Active",
                          },
                          {
                            name: "Feedback Survey",
                            created: "2023-06-23",
                            submissions: 87,
                            status: "Active",
                          },
                          {
                            name: "Event Registration",
                            created: "2023-07-05",
                            submissions: 32,
                            status: "Draft",
                          },
                          {
                            name: "Newsletter Signup",
                            created: "2023-08-18",
                            submissions: 213,
                            status: "Active",
                          },
                          {
                            name: "Customer Support",
                            created: "2023-09-02",
                            submissions: 56,
                            status: "Inactive",
                          },
                        ].map((form, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {form.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(form.created).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {form.submissions}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  form.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : form.status === "Draft"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {form.status}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href="#"
                                className="text-orange-600 hover:text-orange-900"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Templates Tab Content */}
              {activeTab === "templates" && (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Contact Form",
                    "Feedback Survey",
                    "Event Registration",
                    "Newsletter Signup",
                    "Customer Support",
                    "Job Application",
                  ].map((template, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow hover:shadow-md transition-shadow"
                    >
                      <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900">
                          {template} Template
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          A pre-designed template for {template.toLowerCase()}{" "}
                          collection.
                        </p>
                        <div className="mt-4 flex justify-end">
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none">
                            Use Template
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Submissions Tab Content */}
              {activeTab === "submissions" && (
                <div className="mt-6 text-center py-10 text-gray-500">
                  Select a form to view submissions
                </div>
              )}

              {/* Settings Tab Content */}
              {activeTab === "settings" && (
                <div className="mt-6 max-w-3xl">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Notification Settings
                      </h3>
                      <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>
                          Configure how you receive notifications for form
                          submissions.
                        </p>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="email-notifications"
                              name="email-notifications"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="email-notifications"
                              className="font-medium text-gray-700"
                            >
                              Email Notifications
                            </label>
                            <p className="text-gray-500">
                              Receive an email for each form submission.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="dashboard-notifications"
                              name="dashboard-notifications"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="dashboard-notifications"
                              className="font-medium text-gray-700"
                            >
                              Dashboard Notifications
                            </label>
                            <p className="text-gray-500">
                              Show notifications in the dashboard.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Mobile navigation */}
        <MobileNavigation activeTab="inputs" setActiveTab={() => {}} />
      </div>
    </div>
  );
}
