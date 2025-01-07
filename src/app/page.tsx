// page.tsx - Convert to a Server Component
import { Suspense } from "react";
import CarouselClient from "@/components/CarouselClient";
import { GET_PAGE_IMAGE_AND_CONTENT } from "@/lib/queries";
import client from "../../apollo-client";

// Move this to a separate types file
type PageData = {
  title: string;
  showInGallery: {
    mainImage: {
      node: {
        sourceUrl: string;
      };
    };
  };
};

async function getProductionsData() {
  const theatreProductionPages = [
    "wish-you-were-here",
    "habibti-driver",
    "i-am-lysistrata",
    "trust",
    "attempts-on-her-life",
    "darknet",
  ];

  const data = await Promise.all(
    theatreProductionPages.map(async (pageSlug) => {
      const { data } = await client.query({
        query: GET_PAGE_IMAGE_AND_CONTENT,
        variables: { id: pageSlug },
      });
      return data.page;
    })
  );
  return data;
}

export default async function TheatreProductionsLandingPage() {
  const pageData = await getProductionsData();

  return (
    <div className="flex">
      <main className="flex-grow">
        <Suspense
          fallback={<div className="h-[90vh] animate-pulse bg-gray-200" />}
        >
          <CarouselClient initialData={pageData} />
        </Suspense>
      </main>
    </div>
  );
}
