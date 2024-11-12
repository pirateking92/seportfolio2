"use client";

import React, { useId, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import SmokeFadeIn from "./SmokeFadeIn";
import Navbar from "./Navbar";
import { MediaItem } from "@/app/productions/page";
import { useOutsideClick } from "./hooks/use-outside-hooks";
import { AnimatePresence, motion } from "framer-motion";
interface ProductionListProps {
  initialMediaItems: MediaItem[];
}
export default function ProductionsList({
  initialMediaItems,
}: ProductionListProps) {
  const [mediaItems] = useState(initialMediaItems);
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));
  return (
    <SmokeFadeIn>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main>
          <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center my-10 p-7">
            Productions
          </h1>
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems.map((item) => (
                <Link href={`/productions/${item.slug}`} key={item.slug}>
                  <div className="relative h-[500px] group cursor-pointer">
                    <Image
                      src={item.sourceUrl}
                      alt={item.caption || "Gallery image"}
                      fill
                      className="transition-opacity duration-300 group-hover:opacity-60 object-contain"
                    />
                    {item.caption && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-bodyFont text-white text-4xl text-center px-4 py-2">
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
          </AnimatePresence>
        </main>
      </div>
    </SmokeFadeIn>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
// function setError(message: any): any {
//   throw new Error("Function not implemented.");
// }

// function setLoading(arg0: boolean): void {
//   throw new Error("Function not implemented.");
// }
