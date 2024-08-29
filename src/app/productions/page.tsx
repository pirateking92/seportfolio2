"use client"; // Add this directive at the very top

import Image from "next/image";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import client from "../../../apollo-client"; // Adjust the import path according to your setup
import { GET_ALL_MEDIA_ITEMS } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface MediaItem {
  sourceUrl: string;
  caption: string;
  slug: string;
}

export default function GalleryPage() {
  const [isClient, setIsClient] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    setIsClient(true);
    fetchMediaItems().then(setMediaItems);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <h1 className="font-bodyFont text-4xl text-slate-300 font-bold mb-4 text-center my-10">
          Productions
        </h1>
        {mediaItems.map((item) => (
          <Link href={`/productions/${item.slug}`} key={item.slug} className="">
            <div className="block relative h-[500px] flex-shrink-0 w-[calc(100%_-_1rem)] group my-8 cursor-pointer">
              <Image
                src={item.sourceUrl}
                alt={item.caption || "Gallery image"}
                fill
                className="transition-opacity duration-300 group-hover:opacity-60 object-cover"
              />
              {item.caption && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-bodyFont text-white text-xl text-center px-4 py-2">
                    {isClient ? parse(item.caption) : item.caption}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}

async function fetchMediaItems(): Promise<MediaItem[]> {
  let allMediaItems: MediaItem[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const { data: mediaData } = await client.query({
      query: GET_ALL_MEDIA_ITEMS,
      variables: { first: 10, after: endCursor },
    });

    if (mediaData && mediaData.mediaItems) {
      const fetchedMediaItems =
        mediaData.mediaItems.nodes?.map((node: any) => {
          return {
            sourceUrl: node.sourceUrl,
            caption: node.caption || "",
            slug: createSlug(node.caption || ""),
          };
        }) || [];

      allMediaItems = [...allMediaItems, ...fetchedMediaItems];

      hasNextPage = mediaData.mediaItems.pageInfo.hasNextPage;
      endCursor = mediaData.mediaItems.pageInfo.endCursor;
    } else {
      hasNextPage = false;
    }
  }

  return allMediaItems.filter((item) => item.caption);
}

function createSlug(caption: string): string {
  if (!caption) {
    return "";
  }
  const strippedCaption = caption.replace(/<[^>]+>/g, "");
  const slug = strippedCaption
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return slug;
}
