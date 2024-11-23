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
  "i-am-lysistrata",
  "attempts-on-her-life",
  "habibti-driver",
  "darknet",
  "trust",
];

const TheatreProductionsLandingPage = async () => {
  // Fetch page data for each page in theatreProductionPages
  const pageData = await Promise.all(
    theatreProductionPages.map(async (pageSlug) => {
      const { data } = await client.query({
        query: GET_PAGE_IMAGE_AND_CONTENT,
        variables: { id: pageSlug },
      });
      return data.page;
    })
  );

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
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
                        fill
                        className="object-cover rounded-lg"
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
  const [landingPage, setLandingPage] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Load the TheatreProductionsLandingPage component dynamically
    TheatreProductionsLandingPage().then((page) => setLandingPage(page));
  }, []);

  return (
    <div>
      {isClient ? landingPage || <p>Loading...</p> : <p>Prerendered</p>}
    </div>
  );
}
