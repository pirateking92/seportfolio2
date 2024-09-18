"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import SmokeFadeIn from "./SmokeFadeIn";
import Navbar from "./Navbar";
import { MediaItem } from "@/app/productions/page";
interface ProductionListProps {
  initialMediaItems: MediaItem[];
}
export default function ProductionsList({
  initialMediaItems,
}: ProductionListProps) {
  const [mediaItems] = useState(initialMediaItems);
  return (
    <SmokeFadeIn>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main>
          <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center my-10 p-7">
            Productions
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item) => (
              <Link href={`/productions/${item.slug}`} key={item.slug}>
                <div className="relative h-[500px] group cursor-pointer">
                  <Image
                    src={item.sourceUrl}
                    alt={item.caption || "Gallery image"}
                    fill
                    className="transition-opacity duration-300 group-hover:opacity-60 object-cover"
                  />
                  {item.caption && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-bodyFont text-white text-xl text-center px-4 py-2">
                        {typeof window !== "undefined"
                          ? parse(item.caption)
                          : item.caption}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </SmokeFadeIn>
  );
}
function setError(message: any): any {
  throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean): void {
  throw new Error("Function not implemented.");
}
