"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { GET_PAGE_IMAGE_AND_CONTENT } from "@/lib/queries";
import client from "../../apollo-client";
import Navbar from "@/components/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

const theatreProductionPages = [
  "wish-you-were-here",
  "habibti-driver",
  "i-am-lysistrata",
  "trust",
  "attempts-on-her-life",
  "darknet",
];

const TheatreProductionsLandingPage = () => {
  const [pageData, setPageData] = useState([]);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Fetch page data for each page in theatreProductionPages
    const fetchPageData = async () => {
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
    };

    // Set the current path
    setCurrentPath(window.location.pathname);
    fetchPageData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {pageData.map((page) => (
              <CarouselItem key={page.title} className="basis-full">
                <div className="pt-16 p-1 h-[90vh]">
                  <Link
                    href={`/productions/${encodeURIComponent(
                      page.title.toLowerCase().replace(/\s/g, "-")
                    )}`}
                    className="block w-full h-full group"
                  >
                    <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-95">
                      <Image
                        src={page.showInGallery.mainImage.node.sourceUrl}
                        alt={page.title}
                        className={`object-cover rounded-lg ${
                          currentPath === "/productions/i-am-lysistrata/"
                            ? "object-[50%_25%]" // This will adjust the image to use the upper portion
                            : ""
                        }`}
                        fill
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                        <h3 className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {page.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
    </div>
  );
};

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? <TheatreProductionsLandingPage /> : <p>Prerendered</p>}
    </div>
  );
}
