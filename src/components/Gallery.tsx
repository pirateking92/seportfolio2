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
                return null;
              }
              return (
                <CarouselItem
                  key={index}
                  // Added group class to enable hover effects on the entire carousel item
                  className="basis-1/2 relative w-full h-[500px] group"
                >
                  <Image
                    src={item.sourceUrl}
                    alt={item.caption || "Gallery image"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {/* Added new overlay div that appears on hover */}
                  {item.caption && (
                    <div
                      className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-center justify-center p-6"
                    >
                      {/* Caption text container */}
                      <div className="font-bodyFont text-xl text-white text-center">
                        {parse(item.caption)}
                      </div>
                    </div>
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* Removed the permanent caption display that was here */}
    </SmokeFadeIn>
  );
};

export default Gallery;
