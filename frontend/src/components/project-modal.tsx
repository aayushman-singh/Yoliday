"use client";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

type ProjectModalProps = {
  project: any;
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-2">
            {project.title}
          </Dialog.Title>
          <div className="relative h-64 w-full mb-4 rounded overflow-hidden">
            <Image
              src={
                project.image
                  ? `http://localhost:8000${project.image_url}`
                  : "/placeholder.svg"
              }
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Category:</strong> {project.category}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Domain:</strong> {project.domain}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Author:</strong> {project.author}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <strong>Posted:</strong>{" "}
            {new Date(project.date).toLocaleDateString()}
          </p>
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
