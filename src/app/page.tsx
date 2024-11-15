import { gql, useQuery } from "@apollo/client";
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
// import { useState, useEffect } from "react";

// export default function App() {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1>;
// }

// Hard-coded list of theatre production pages
const theatreProductionPages = ["/wish-you-were-here"];

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
    <div className="h-screen w-screen ">
      <Navbar />
      <Carousel opts={{ loop: true }} className="relative h-full w-full">
        <CarouselContent className="flex justify-center items-center h-full">
          {pageData.map((page) => (
            <CarouselItem
              key={page.title}
              className="relative h-4/5 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] mx-4"
            >
              <Link
                href={`/productions/${encodeURIComponent(
                  page.title.toLowerCase().replace(/\s/g, "-")
                )}`}
                className="flex pt-10 justify-center items-center h-full hover:scale-95 transition-transform duration-300"
              >
                <div className="relative h-full w-full overflow-hidden">
                  {/* <Image
                    src={page.showInGallery.mainImage.node.sourceUrl}
                    alt={page.title}
                    fill
                    className="object-cover rounded-lg"
                  /> */}
                </div>
                <div className="text-white prose-lg p-4">
                  <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default TheatreProductionsLandingPage;
