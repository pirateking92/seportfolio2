"use client";

import { GET_CV_PAGE } from "@/lib/queries";
import client from "../../apollo-client";
import { useEffect, useState } from "react";
import SmokeFadeIn from "@/components/SmokeFadeIn";

export default function CVPage() {
  // have to set the types of two variables now for the useState
  const [cvData, setCvData] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    async function fetchCVData() {
      const { data } = await client.query({
        query: GET_CV_PAGE,
      });
      // within this part, we can have multiple variable for the multiple queries
      setCvData({
        title: data.page.title || "Untitled",
        content: data.page.content || "No content found",
      });
    }
    fetchCVData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SmokeFadeIn visibleOnLoad={false}>
        <div className="flex-grow pt-24 m-5 mb-6 px-10">
          {" "}
          {/* Moved padding here */}
          <div className="text-3xl text-slate-300 font-bold underline text-left">
            {cvData?.title}
          </div>
          <div
            className="prose-lg mt-10 text-slate-300"
            dangerouslySetInnerHTML={{ __html: cvData?.content }}
          />
        </div>
      </SmokeFadeIn>
    </div>
  );
}
