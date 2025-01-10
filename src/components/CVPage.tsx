// components/CVPage.tsx
"use client";
import { type ReactNode } from "react";
import SmokeFadeIn from "@/components/SmokeFadeIn";

// Define the shape of our data using TypeScript
interface CVData {
  title: string;
  content: string;
}

interface CVPageProps {
  initialData: CVData | null;
}

export default function CVPage({ initialData }: CVPageProps) {
  // No more useState or useEffect needed since we receive data as props

  // If we somehow don't have data, we can show a simple message
  if (!initialData) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow pt-24 m-5 mb-6 px-10">
          <div className="text-slate-300">Unable to load CV data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SmokeFadeIn visibleOnLoad={false}>
        <div className="flex-grow pt-24 m-5 mb-6 px-10">
          <div className="text-3xl text-slate-300 font-bold underline text-left">
            {initialData.title}
          </div>
          <div
            className="prose-lg mt-10 text-slate-300"
            dangerouslySetInnerHTML={{ __html: initialData.content }}
          />
        </div>
      </SmokeFadeIn>
    </div>
  );
}
