"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import parse from "html-react-parser";
import { useState } from "react";
import SmokeFadeIn from "./SmokeFadeIn";

interface MediaItem {
  sourceUrl: string;
  content: string;
  title: string;
}

interface GalleryProps {
  mediaItems: MediaItem[];
}

const Gallery = ({ mediaItems }: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SmokeFadeIn>
      <Carousel className="w-full justify-center">
        <CarouselContent>
          {mediaItems.map((item) => (
            <CarouselItem
              key={item.title || item.sourceUrl}
              className="relative h-[calc(100vh-8rem)] w-full basis-1/2 group"
            >
              {/* Optimized Image usage */}
              <Image
                src={item.sourceUrl}
                alt={item.title || "Gallery image"}
                fill
                style={{ objectFit: "cover" }}
                placeholder="blur"
                blurDataURL={item.sourceUrl} // Optional for image loading
              />
              {/* Hover overlay for captions */}
              {item.title && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/70 
                  p-6 text-center text-xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  {parse(item.title)}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
        />
        <CarouselNext
          onClick={() =>
            setActiveIndex((prev) => Math.min(prev + 1, mediaItems.length - 1))
          }
        />
      </Carousel>
    </SmokeFadeIn>
  );
};

export default Gallery;
