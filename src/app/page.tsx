"use client";

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

const theatreProductionPages = ["wish-you-were-here"];

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
        <Carousel opts={{ loop: true }} className="pt-10 h-full w-full">
          <CarouselContent className="ml-1 flex items-center justify-center w-full h-full">
            <span>
              {pageData.map((page) => (
                <CarouselItem key={page.title} className="w-full h-full">
                  <Link
                    href={`/productions/${encodeURIComponent(
                      page.title.toLowerCase().replace(/\s/g, "-")
                    )}`}
                    className="flex pt-10 justify-evenly items-stretch h-full hover:scale-95 transition-transform duration-300"
                  >
                    {/* <div className="p-1 h-full w-full">
                      <Image
                        src={page.showInGallery.mainImage.node.sourceUrl}
                        alt={page.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div> */}
                    <div className="text-white prose-lg p-4">
                      <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${page.showInGallery.mainImage.node.sourceUrl})`,
                        }}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                      />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </span>
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10" />
          <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10" />
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
