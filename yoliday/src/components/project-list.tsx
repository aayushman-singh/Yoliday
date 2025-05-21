"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { FilterDropdown } from "@/components/filter-dropdown";
import { ProjectModal } from "@/components/project-modal";
const baseUrl=process.env.NEXT_PUBLIC_BASE_URL
export function ProjectList() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState<{
    domains: string[];
    dateSort: "newest" | "oldest" | null;
  }>({ domains: [], dateSort: null });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyFilters = (filters: {
    domains: string[];
    dateSort: "newest" | "oldest" | null;
  }) => {
    setFilters(filters);
  };

  const handleCardClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const queryParams = new URLSearchParams();

        filters.domains.forEach((d) => queryParams.append("domain", d));
        if (filters.dateSort) {
          queryParams.append(
            "sort",
            filters.dateSort === "newest" ? "desc" : "asc"
          );
        }

        const res = await fetch(
          `${baseUrl}/projects?${queryParams.toString()}`
        );
        const data = await res.json();

        setProjects(
          data.projects.map((p) => ({
            ...p,
            date: p.date,
            image: p.image_url,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, [filters]);

  return (
    <div>
      {/* Filter Button - Desktop only */}
      <div className="hidden md:flex items-center justify-end mb-4">
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>

          {isFilterOpen && (
            <FilterDropdown
              onClose={() => setIsFilterOpen(false)}
              onApply={handleApplyFilters}
            />
          )}
        </div>
      </div>

      {/* Project Cards */}
      <div className="flex flex-col gap-6 pb-28 md:pb-6">
        {" "}
        {/* extra bottom space for mobile filter button */}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleCardClick(project)}
          />
        ))}
      </div>

      {/* Filter Button - Mobile Fixed */}
      <div className="fixed bottom-16 left-0 right-0 px-4 md:hidden z-30 flex justify-center">
        <div className="w-full max-w-[200px]">
          {" "}
          {/* Added container div */}
          <button
            type="button"
            className="w-full inline-flex justify-center items-center rounded-md border border-gray-300 bg-amber-600 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-amber-500 focus:outline-none"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          {isFilterOpen && (
            <div className="absolute bottom-14 left-0 right-0">
              {" "}
              {/* Adjusted positioning */}
              <FilterDropdown
                onClose={() => setIsFilterOpen(false)}
                onApply={handleApplyFilters}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
