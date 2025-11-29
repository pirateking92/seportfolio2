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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div onClick={() => setIsOpen(true)}>{children}</div>

      {mounted && createPortal(lightboxContent, document.body)}
    </>
  );
}
