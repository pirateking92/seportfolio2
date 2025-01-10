// ProductionsList.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductionsListProps {
  initialData: any[]; // Replace 'any' with your proper type definition
}

export default function ProductionsList({ initialData }: ProductionsListProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Move these constants outside the component or into a config file
  const imagePositions = {
    "I Am Lysistrata": "object-[50%_25%]",
    Trust: "object-[50%_30%]",
    "Attempts On Her Life": "object-[50%_35%]",
    Darknet: "object-[50%_18%]",
    "Habibti Driver": "object-[50%_45%]",
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-grow relative text-center pt-20">
        {initialData.map((page) => (
          <div
            key={page.title}
            className="relative w-full h-[16.6vh] overflow-hidden group"
            onMouseEnter={() => setHoveredItem(page.title)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="absolute inset-0 z-10">
              <Image
                src={page.showInGallery.mainImage.node.sourceUrl}
                alt={page.title}
                fill
                priority={true} // Add priority for images above the fold
                sizes="100vw" // Add sizes prop for better resource hints
                className={`object-cover transition-opacity duration-500 
                  ${hoveredItem === page.title ? "opacity-70" : "opacity-0"}
                  ${imagePositions[page.title] || ""}`}
              />
            </div>
            <div
              className={`absolute inset-0 z-20 flex items-center justify-center 
                transition-all duration-500 
                ${
                  hoveredItem === page.title
                    ? "text-white"
                    : "bg-transparent text-slate-300"
                }`}
            >
              <div className="text-4xl tracking-wide">
                <Link
                  href={`/productions/${encodeURIComponent(
                    page.title.toLowerCase().replace(/\s/g, "-")
                  )}`}
                  prefetch={true}
                >
                  {page.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
