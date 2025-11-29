"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  imageUrl: string;
  index: number;
  allImages: string[];
  children: React.ReactNode;
}

export default function ImageLightbox({
  imageUrl,
  index,
  allImages,
  children,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleOpen = () => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const lightboxContent = isOpen && (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-8 pb-20"
      onClick={() => setIsOpen(false)}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        onClick={() => setIsOpen(false)}
      >
        <X size={32} />
      </button>

      {/* Previous Button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
      >
        <ChevronLeft size={32} />
      </button>

      {/* Next Button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
      >
        <ChevronRight size={32} />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
        {currentIndex + 1} / {allImages.length}
      </div>

      <div
        className="relative max-w-full max-h-[85vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={allImages[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="95vw"
        />
      </div>
    </div>
  );

  return (
    <>
      <div onClick={handleOpen}>{children}</div>

      {mounted && createPortal(lightboxContent, document.body)}
    </>
  );
}
