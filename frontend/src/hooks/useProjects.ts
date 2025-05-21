import { useQuery } from "@tanstack/react-query";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ["projects", page],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/projects?page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });
};
