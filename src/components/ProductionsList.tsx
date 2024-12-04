"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GET_PAGE_IMAGE_AND_CONTENT } from "@/lib/queries";
import client from "../../apollo-client";
import Navbar from "./Navbar";

// Theatre production pages to fetch
const theatreProductionPages = [
  "wish-you-were-here",
  "habibti-driver",
  "i-am-lysistrata",
  "trust",
  "attempts-on-her-life",
  "darknet",
];

export default function ProductionsList() {
  const [pageData, setPageData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Fetch page data for each page in theatreProductionPages
    const fetchPageData = async () => {
      try {
        const data = await Promise.all(
          theatreProductionPages.map(async (pageSlug) => {
            const { data } = await client.query({
              query: GET_PAGE_IMAGE_AND_CONTENT,
              variables: { id: pageSlug },
            });
            return data.page;
          })
        );
        setPageData(data);
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    };

    // Set client-side rendering flag
    setIsClient(true);

    // Fetch the page data
    fetchPageData();
  }, []);

  // If not client-side or no data, return loading state
  if (!isClient || pageData.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading productions...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow relative pt-20">
        {pageData.map((page) => (
          <div
            key={page.title}
            className="relative w-full h-[16.6vh] overflow-hidden group"
            onMouseEnter={() => setHoveredItem(page.title)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-10">
              <Image
                src={page.showInGallery.mainImage.node.sourceUrl}
                alt={page.title}
                fill
                className={`object-cover transition-opacity duration-500 
                  ${hoveredItem === page.title ? "opacity-30" : "opacity-0"}`}
              />
            </div>

            {/* Title Layer */}
            <div
              className={`absolute inset-0 z-20 flex items-center justify-center 
                transition-all duration-500 
                ${
                  hoveredItem === page.title
                    ? "text-white"
                    : "bg-transparent text-slate-300"
                }`}
            >
              <h2 className="text-4xl font-bold tracking-wide uppercase">
                {page.title}
              </h2>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
