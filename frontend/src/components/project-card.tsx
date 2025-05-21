"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-content";
import { useSaved } from "@/context/cart-content";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  domain: string;
  date: string;
  author: string;
  image: string;
};

type ProjectCardProps = {
  project: Project;
  onClick?: () => void;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const { saved, addToSaved, removeFromSaved } = useSaved();
  const isAdded = cart.includes(project.id);
  const isSaved = saved.includes(project.id);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    isAdded ? removeFromCart(project.id) : addToCart(project.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    isSaved ? removeFromSaved(project.id) : addToSaved(project.id);
    // Removed setIsSaved as it's redundant (state is managed by context)
  };

  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow cursor-pointer w-[80%]"
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={project.image ? `${project.image}` : "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
        <p className="text-sm text-gray-500">
          {project.category} – {project.domain}
        </p>
        <p className="text-xs text-gray-500">By {project.author}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(project.date).toLocaleDateString()}
        </p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleSaveClick}
            className={`p-2 rounded-md transition-colors ${
              isSaved
                ? "text-yellow-500 bg-yellow-50"
                : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
            }`}
            aria-label={isSaved ? "Unsave project" : "Save project"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={handleAddToCartClick}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isAdded
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-gradient-to-br from-orange-400 from-0% via-orange-400 via-80% to-white to-100% text-white hover:brightness-110"
            }`}
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
