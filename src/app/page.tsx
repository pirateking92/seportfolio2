import React, { useState } from "react";
import client from "../../apollo-client";
import {
  GET_SITE_SETTINGS,
  GET_ABOUT_PAGE,
  GET_PAGE_IMAGE,
} from "../lib/queries";
import Navbar from "../components/Navbar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MediaItem {
  sourceUrl: string;
  caption: string;
}

export async function generateMetadata() {
  const { data: siteData } = await client.query({ query: GET_SITE_SETTINGS });
  return {
    title: siteData.generalSettings.title,
    description: siteData.generalSettings.description,
  };
}

async function getPageData() {
  const { data: siteData } = await client.query({ query: GET_SITE_SETTINGS });
  const { data: aboutData } = await client.query({ query: GET_ABOUT_PAGE });
  const { data: mediaData } = await client.query({
    query: GET_PAGE_IMAGE,
  });
  // Fetch all media items
  let allMediaItems: MediaItem[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const { data: mediaData } = await client.query({
      query: GET_PAGE_IMAGE,
      variables: { captionSearch: "Othello" },
    });

    if (mediaData && mediaData.mediaItems) {
      const fetchedMediaItems =
        mediaData.mediaItems.nodes?.map((node: any) => ({
          sourceUrl: node.sourceUrl,
          caption: node.caption,
        })) || [];
      allMediaItems = [...allMediaItems, ...fetchedMediaItems];
      hasNextPage = mediaData.mediaItems.pageInfo.hasNextPage;
      endCursor = mediaData.mediaItems.pageInfo.endCursor;
    } else {
      console.error("No media data found");
      hasNextPage = false;
    }
  }

  // // Create a mapping of captions to media items
  // const mediaItemsByCaption = allMediaItems.reduce((acc, item) => {
  //   if (item.caption) {
  //     acc[item.caption] = item;
  //   }
  //   return acc;
  // }, {} as { [key: string]: MediaItem });

  // return {
  //   mediaItemsByCaption,
  // };
}

export default async function HomePage() {
  // const { mediaItemsByCaption } = await getPageData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 sm:py-12 md:py-16 text-center justify-center text-4xl text-white">
            <HoverCard>
              <HoverCardTrigger>Wish You Were Here</HoverCardTrigger>
              <HoverCardContent>IMAGE PLACEHOLDER</HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </div>
  );
}
