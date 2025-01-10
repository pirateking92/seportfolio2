import { GET_CV_PAGE } from "@/lib/queries";
import client from "../../../apollo-client";
import CVPage from "@/components/CVPage";
import { Metadata } from "next";

// Generate metadata for SEO - this will help with page indexing and social sharing
export async function generateMetadata(): Promise<Metadata> {
  // We fetch the data here as well since we need it for the metadata
  const { data } = await client.query({
    query: GET_CV_PAGE,
  });

  return {
    title: data.page.title || "CV",
    description: "Professional experience and qualifications",
    openGraph: {
      title: data.page.title || "CV",
      description: "Professional experience and qualifications",
      type: "website",
    },
  };
}

// This function fetches the CV data at build time or during server-side rendering
async function getCVData() {
  try {
    const { data } = await client.query({
      query: GET_CV_PAGE,
    });

    return {
      title: data.page.title || "Untitled",
      content: data.page.content || "No content found",
    };
  } catch (error) {
    console.error("Error fetching CV data:", error);
    return null;
  }
}

export default async function CV() {
  const cvData = await getCVData();
  return <CVPage initialData={cvData} />;
}
