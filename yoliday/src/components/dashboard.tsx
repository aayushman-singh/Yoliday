"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { MobileNavigation } from "../components/mobile-navigation";
import {
  LineChart,
  PieChart,
  Activity,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeUsers: 0,
    completedOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Simulate fetching dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/dashboard/stats`
        );
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          // Fallback to dummy data if API fails
          setStats({
            totalProjects: 124,
            activeUsers: 843,
            completedOrders: 56,
            revenue: 12480,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Fallback to dummy data
        setStats({
          totalProjects: 124,
          activeUsers: 843,
          completedOrders: 56,
          revenue: 12480,
        });
      }
    };

    fetchStats();
  }, []);

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
              <h1 className="text-xl font-semibold text-gray-900 mb-6">
                Dashboard Overview
              </h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                      <Activity className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Projects
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {stats.totalProjects}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Active Users
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {stats.activeUsers}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <ShoppingCart className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Completed Orders
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {stats.completedOrders}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Revenue
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            ${stats.revenue.toLocaleString()}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Monthly Revenue
                  </h3>
                  <div className="mt-4 h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <LineChart className="h-10 w-10 text-gray-400" />
                    <span className="ml-2 text-gray-500">
                      Revenue chart visualization
                    </span>
                  </div>
                </div>

                <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Project Categories
                  </h3>
                  <div className="mt-4 h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <PieChart className="h-10 w-10 text-gray-400" />
                    <span className="ml-2 text-gray-500">
                      Categories chart visualization
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Activity
                </h3>
                <div className="mt-4 bg-white overflow-hidden rounded-lg border border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <li key={item} className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              User {item} completed a project
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {new Date(
                                Date.now() - item * 3600000
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
        </main>

        {/* Mobile navigation */}
        <MobileNavigation activeTab="dashboard" setActiveTab={() => {}} />
      </div>
    </div>
  );
}
