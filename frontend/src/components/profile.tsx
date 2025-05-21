"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { MobileNavigation } from "@/components/mobile-navigation";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    title: "Manager",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    jobTitle: "Product Manager",
    department: "Product Development",
    joinedDate: "January 15, 2022",
    skills: [
      "Product Management",
      "UX Design",
      "Market Research",
      "Agile",
      "Scrum",
      "Data Analysis",
      "Strategic Planning",
    ],
    tags: ["Design", "Management", "Strategy"],
    profileImage: "/dp.jpg",
    isLoading: true,
  });

  const [editData, setEditData] = useState({ ...profileData });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${baseUrl}/profile`);
        const data = await response.json();
        setProfileData((prev) => ({ ...prev, ...data, isLoading: false }));
        setEditData((prev) => ({ ...prev, ...data, isLoading: false }));
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        setProfileData((prev) => ({ ...prev, isLoading: false }));
      }
    };
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${baseUrl}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editData,
          skills: JSON.stringify(editData.skills),
          tags: JSON.stringify(editData.tags),
        })
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfileData((prev) => ({ ...prev, ...updatedData }));
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData({ ...editData, [field]: value });
  };

  const renderEditableField = (
    field: string,
    value: string,
    icon: React.ReactNode
  ) =>
    isEditing ? (
      <input
        type="text"
        value={editData[field as keyof typeof editData] as string}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
      />
    ) : (
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    );
    interface SidebarProps {
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
    
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden bg-gray-200">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 pt-12 overflow-y-auto p-4 pb-24 md:pb-4">
          <div className="mx-auto max-w-7xl">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                  <Image
                    src={profileData.profileImage}
                    alt="User profile"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96px, 96px"
                    priority
                  />
                </div>
                <div className="text-center sm:text-left">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="text-2xl font-bold text-gray-900 border border-gray-300 rounded-md px-2 py-1"
                      />
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="text-sm text-gray-500 border border-gray-300 rounded-md px-2 py-1 mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {profileData.name}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {profileData.title}
                      </p>
                    </>
                  )}
                  <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                    {profileData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          index % 3 === 0
                            ? "bg-blue-100 text-blue-800"
                            : index % 3 === 1
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                      >
                        <Save className="h-4 w-4 mr-2" /> Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md"
                      >
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditClick}
                      className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-md"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </button>
                  )}
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
                        className={`py-4 px-1 text-sm font-medium border-b-2 ${
                          activeTab === tab
                            ? "border-orange-700 text-orange-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </nav>
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-lg shadow">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-gray-900">
                          Personal Information
                        </h3>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          {[
                            {
                              label: "Full name",
                              field: "name",
                              icon: <User className="h-4 w-4 mr-2" />,
                            },
                            {
                              label: "Email address",
                              field: "email",
                              icon: <Mail className="h-4 w-4 mr-2" />,
                            },
                            {
                              label: "Phone number",
                              field: "phone",
                              icon: <Phone className="h-4 w-4 mr-2" />,
                            },
                            {
                              label: "Location",
                              field: "location",
                              icon: <MapPin className="h-4 w-4 mr-2" />,
                            },
                          ].map(({ label, field, icon }) => (
                            <div
                              key={field}
                              className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                              <dt className="text-sm font-medium text-gray-500 flex items-center">
                                {icon}
                                {label}
                              </dt>
                              {renderEditableField(
                                field,
                                profileData[
                                  field as keyof typeof profileData
                                ] as string,
                                icon
                              )}
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-gray-900">
                          Recent Activity
                        </h3>
                      </div>
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
                              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <span className="text-orange-600 text-xs font-medium">
                                  {profileData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
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
              )}

              {/* Other Tabs */}
              {activeTab !== "overview" && (
                <div className="mt-6 text-center py-10 text-gray-500">
                  {activeTab === "projects" && "Your projects will appear here"}
                  {activeTab === "settings" &&
                    "Account settings will appear here"}
                  {activeTab === "billing" &&
                    "Billing information will appear here"}
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
