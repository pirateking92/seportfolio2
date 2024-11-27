"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import SmokeFadeIn from "./SmokeFadeIn";
import Navbar from "./Navbar";
import { MediaItem } from "../app/productions/page";
interface ProductionListProps {
  initialMediaItems: MediaItem[];
}
export default function ProductionsList({
  initialMediaItems,
}: ProductionListProps) {
  const uniqueMediaItems = initialMediaItems.filter(
    (item, index, self) => index === self.findIndex((t) => t.slug === item.slug)
  );
  const [mediaItems] = useState(uniqueMediaItems);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <SmokeFadeIn visibleOnLoad={false}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto px-4">
          <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center my-10 p-7">
            Productions
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Caption List */}
            <div className="w-full md:w-1/3">
              <ul className="space-y-4">
                {mediaItems.map((item) => (
                  <li
                    key={item.slug}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.slug)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className="
                        p-4 
                        bg-black/50 
                        text-white 
                        font-bodyFont 
                        text-2xl 
                        cursor-pointer 
                        hover:bg-black/70 
                        transition-all 
                        duration-300
                      "
                    >
                      {typeof window !== "undefined"
                        ? parse(item.caption || "")
                        : item.caption}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hover Image Display */}
            <div className="w-full md:w-2/3 relative min-h-[600px]">
              {hoveredItem ? (
                <div className="absolute inset-0 w-full h-full">
                  {mediaItems
                    .filter((item) => item.slug === hoveredItem)
                    .map((item) => (
                      <Image
                        key={item.slug}
                        src={item.sourceUrl}
                        alt={item.caption || "Gallery image"}
                        fill
                        className="object-cover transition-opacity duration-300"
                      />
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300 text-2xl">
                  {/* Hover over a caption to see the image */}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SmokeFadeIn>
  );
}
