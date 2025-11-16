import ProductionsList from "@/components/ProductionsList";
import { GET_PAGE_IMAGE_AND_CONTENT } from "@/lib/queries";
import client from "../../../apollo-client";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Theatre Productions",
    description:
      "Explore Sepys work including Wish You Were Here, Habibti Driver, and more",
    openGraph: {
      title: "Theatre Productions",
      description:
        "Explore Sepys work including Wish You Were Here, Habibti Driver, and more",
      type: "website",
    },
  };
}

async function getProductionsData() {
  const theatreProductionPages = [
    "wish-you-were-here",
    "daytime-deewane",
    "habibti-driver",
    "i-am-lysistrata",
    "trust",
    "attempts-on-her-life",
    "darknet",
  ];

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
    return data;
  } catch (error) {
    console.error("Error fetching production data:", error);
    return [];
  }
}

export default async function ProductionPage() {
  const productionsData = await getProductionsData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductionsList initialData={productionsData} />
    </Suspense>
  );
}
