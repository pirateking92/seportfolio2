// components/CVContent.tsx
"use client";
import SmokeFadeIn from "@/components/SmokeFadeIn";

interface CVContentProps {
  initialData: {
    title: string;
    content: string;
  };
}

export default function CVContent({ initialData }: CVContentProps) {
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
