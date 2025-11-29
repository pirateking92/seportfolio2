"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageLightboxProps {
  imageUrl: string;
  index: number;
  children: React.ReactNode;
}

export default function ImageLightbox({
  imageUrl,
  index,
  children,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const previewContent = showPreview && (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left:
          mousePosition.x + 30 + 700 > window.innerWidth
            ? mousePosition.x - 530
            : mousePosition.x + 30,
        top:
          mousePosition.y - 250 < 0
            ? mousePosition.y + 30
            : mousePosition.y - 250,
      }}
    >
      <div className="relative w-[700px] h-[700px] bg-black/95 rounded-lg overflow-hidden shadow-2xl border-4 border-white/30">
        <Image
          src={imageUrl}
          alt={`Preview ${index + 1}`}
          fill
          className="object-contain p-2"
        />
      </div>
    </div>
  );

  const lightboxContent = isOpen && (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-8"
      onClick={() => setIsOpen(false)}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        onClick={() => setIsOpen(false)}
      >
        <X size={32} />
      </button>
      <div className="relative max-w-full max-h-[95vh] w-full h-full">
        <Image
          src={imageUrl}
          alt={`Full size ${index + 1}`}
          fill
          className="object-contain"
          sizes="95vw"
        />
      </div>
    </div>
  );

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>

      {mounted && createPortal(previewContent, document.body)}
      {mounted && createPortal(lightboxContent, document.body)}
    </>
  );
}
