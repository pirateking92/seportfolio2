// components/CVPage.tsx
"use client";
import SmokeFadeIn from "@/components/SmokeFadeIn";
import type { CVSection } from "@/lib/parseCV";

interface CVData {
  title: string;
  sections: CVSection[];
}

interface CVPageProps {
  initialData: CVData | null;
}

// One CV line laid out in columns: title | writer/adapter/role | venue.
// Rows with 2 cells let the second cell span the middle + right columns, so it
// still lines up with the middle column of 3-cell rows. Single-cell rows span all.
function CVRow({ cells }: { cells: string[] }) {
  const [first, ...rest] = cells;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-0.5 py-2 border-b border-slate-700/50 last:border-b-0">
      <div
        className={`text-slate-200 ${cells.length === 1 ? "md:col-span-3" : "italic"}`}
        dangerouslySetInnerHTML={{ __html: first }}
      />
      {rest.map((cell, i) => (
        <div
          key={i}
          className={`text-slate-400 ${rest.length === 1 ? "md:col-span-2" : ""}`}
          dangerouslySetInnerHTML={{ __html: cell }}
        />
      ))}
    </div>
  );
}

export default function CVPage({ initialData }: CVPageProps) {
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
        <div className="flex-grow pt-24 m-5 mb-6 px-4 md:px-10">
          <div className="text-3xl text-slate-300 font-bold underline text-left">
            {initialData.title}
          </div>

          <div className="mt-10 space-y-12 text-base md:text-lg">
            {initialData.sections.map((section, s) => (
              <section key={s}>
                {section.heading && (
                  <h2 className="font-bodyFont text-sm md:text-base font-bold tracking-[0.2em] text-slate-200 border-b border-slate-500 pb-2 mb-2">
                    {section.heading}
                  </h2>
                )}
                {section.items.map((item, i) =>
                  item.type === "year" ? (
                    <h3
                      key={i}
                      className="font-bodyFont text-sm font-semibold tracking-widest text-slate-500 pt-6 pb-1"
                    >
                      {item.text}
                    </h3>
                  ) : (
                    <CVRow key={i} cells={item.cells} />
                  )
                )}
              </section>
            ))}
          </div>
        </div>
      </SmokeFadeIn>
    </div>
  );
}
