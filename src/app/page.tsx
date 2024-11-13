import React, { useState } from "react";
import client from "../../apollo-client";
import {
  GET_SITE_SETTINGS,
  GET_ABOUT_PAGE,
  GET_ALL_MEDIA_ITEMS,
} from "../lib/queries";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";

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
    query: GET_ALL_MEDIA_ITEMS,
  });
  // Fetch all media items
  let allMediaItems: MediaItem[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const { data: mediaData } = await client.query({
      query: GET_ALL_MEDIA_ITEMS,
      variables: { first: 5, after: endCursor },
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

  const profilePicture = aboutData.page.profilePicture?.profilePicture
    ?.node || {
    sourceUrl: "",
    altText: "",
    id: "",
  };

  return {
    siteTitle: siteData.generalSettings.title,
    siteDescription: siteData.generalSettings.description,
    title: aboutData.page.title,
    content: aboutData.page.content,
    profilePicture,
    mediaItems: allMediaItems.filter((item) => item.caption),
  };
}

export default async function HomePage() {
  const {
    siteTitle,
    siteDescription,
    title,
    content,
    profilePicture,
    mediaItems,
  } = await getPageData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <main>
          <div className="py-10 my-12 sm:my-16">
            <Gallery mediaItems={mediaItems} />
          </div>
        </main>
      </div>
    </div>
  );
}
