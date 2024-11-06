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
  caption: string;
}

interface GalleryProps {
  mediaItems: MediaItem[];
}

const Gallery: React.FC<GalleryProps> = ({ mediaItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <SmokeFadeIn>
      <div className="container mx-auto">
        <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center">
          Productions
        </h1>
        <Carousel>
          <CarouselContent>
            {mediaItems.map((item, index) => {
              if (!item.sourceUrl) {
                return null; // Skip this item if sourceUrl is null or undefined
              }
              return (
                <CarouselItem
                  key={index}
                  className="basis-1/2 relative w-full h-[500px]"
                >
                  <Image
                    src={item.sourceUrl}
                    alt={item.caption || "Gallery image"}
                    fill
                    style={{ objectFit: "contain" }}
                    // className="rounded-xl mx-auto"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        {mediaItems[activeIndex]?.caption && (
          <div className="font-bodyFont text-xl mt-4 bg-opacity-50 px-6 py-4 text-white text-center">
            {parse(mediaItems[activeIndex].caption)}
          </div>
        )}
      </div>
    </SmokeFadeIn>
  );
};

export default Gallery;
