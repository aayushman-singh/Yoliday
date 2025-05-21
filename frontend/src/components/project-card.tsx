"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-content";
import { useSaved } from "@/context/cart-content";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
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
  };

  return (
    <div
      className="flex bg-white rounded-xl shadow-md overflow-hidden mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      {/* Image on the left */}
      <div className="w-1/3 relative h-36">
        <Image
          src={project.image?.trim() ? project.image : "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content on the right */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {project.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{project.description}</p>
            <p className="text-xs text-gray-400 uppercase">
              {project.category}
            </p>
            <p className="text-xs text-gray-400">By {project.author}</p>
          </div>

          {/* Save/Bookmark button */}
          <button
            onClick={handleSaveClick}
            className="h-8 w-8 flex items-center justify-center rounded-full focus:outline-none"
            aria-label={isSaved ? "Unsave project" : "Save project"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-amber-600 fill-amber-600" />
            ) : (
              <Bookmark className="h-5 w-5 text-gray-400 hover:text-amber-600" />
            )}
          </button>
        </div>

        <div className="mt-3 flex justify-end items-center gap-3">
          {/* Status tags could go here if needed */}

          {/* Add to Cart button */}
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
};
