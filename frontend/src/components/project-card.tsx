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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



export const ProjectCard = ({ project, onAddToCart }: any) => {
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
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden mb-4">
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
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {project.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2">{project.description}</p>
          <p className="text-xs text-gray-400 uppercase">{project.category}</p>
          <p className="text-xs text-gray-400">By {project.author}</p>
        </div>
        <div className="mt-2 flex justify-end">
          <button
             onClick={handleAddToCartClick}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
               isAdded
                 ? "bg-green-100 text-green-800 hover:bg-green-200"
                 : "bg-gradient-to-br from-orange-400 from-0% via-orange-400 via-80% to-white to-100% text-white hover:brightness-110"
             }`}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};