"use client";

import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { FilterDropdown } from "@/components/filter-dropdown";
import { ProjectModal } from "@/components/project-modal";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type ProjectListProps = {
  page: number;
  setPage: (p: number) => void;
  source?: "projects" | "saved";
};

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  domain: string;
  author: string;
};

type Filters = {
  domains: string[];
  dateSort: "newest" | "oldest" | null;
};

export function ProjectList({
  page,
  setPage,
  source = "projects",
}: ProjectListProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Store all fetched projects for client-side filtering
  const [filters, setFilters] = useState<Filters>({
    domains: [],
    dateSort: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = (filters: Filters) => {
    setFilters(filters);
    setPage(1);
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const applySearch = (projects: Project[]) => {
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.domain.toLowerCase().includes(query) ||
        project.author.toLowerCase().includes(query)
    );
  };

  const applyFilters = (projects: Project[]) => {
    let filtered = [...projects];

    if (filters.domains.length > 0) {
      filtered = filtered.filter((project) =>
        filters.domains.includes(project.domain)
      );
    }

    if (filters.dateSort) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return filters.dateSort === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    return filtered;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());

        filters.domains.forEach((d) => queryParams.append("domain", d));
        if (filters.dateSort) {
          queryParams.append(
            "sort",
            filters.dateSort === "newest" ? "desc" : "asc"
          );
        }
        if (searchQuery) {
          queryParams.append("search", searchQuery);
        }

        const res = await fetch(
          `${baseUrl}/${source}?${queryParams.toString()}`
        );
        const data = await res.json();

        const fetchedProjects = (data.projects || data.cart || []).map(
          (p: any) => ({
            ...p,
            date: p.date,
            image: p.image,
          })
        );

        setAllProjects(fetchedProjects);

        const filteredProjects = applyFilters(fetchedProjects);
        const searchedProjects = applySearch(filteredProjects);

        setProjects(searchedProjects);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [filters, searchQuery, page, source]);

  return (
    <div className="flex flex-col">
      {/* Web Filter + Search Bar Row */}
      <div className="hidden md:flex justify-end items-center gap-4 mb-4">
        {/* Filter Button (Web only) */}
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
              currentFilters={filters}
            />
          )}
        </div>

        {/* Search Bar (Web only) */}
        <div className="w-full max-w-lg md:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              name="search"
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Search projects"
              type="search"
            />
          </div>
        </div>
      </div>

      {/* Search Bar (Mobile only) */}
      <div className="flex md:hidden mb-4 px-2">
        <div className="w-full">
          <label htmlFor="search-mobile" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search-mobile"
              name="search"
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Search projects"
              type="search"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500 mb-2">No projects found</p>
          <p className="text-gray-400 text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Project Cards */}
      {!isLoading && projects.length > 0 && (
        <div className="flex flex-col gap-6 pb-28 md:pb-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && projects.length > 0 && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md bg-white text-gray-800 hover:bg-amber-100 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-sm flex items-center font-medium">
            Page {page}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-md bg-white text-gray-800 hover:bg-amber-100 shadow-sm transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
      {/* Filter Button - Mobile Fixed */}
      <div className="fixed bottom-16 left-0 right-0 px-4 md:hidden z-30 flex justify-center">
        <div className="w-full max-w-[200px]">
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
              <FilterDropdown
                onClose={() => setIsFilterOpen(false)}
                onApply={handleApplyFilters}
                currentFilters={filters}
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
