"use-client";

import React, { useState } from "react";
import client from "../../../apollo-client";
import {
  GET_SITE_SETTINGS,
  GET_ABOUT_PAGE,
  GET_ALL_MEDIA_ITEMS,
} from "../../lib/queries";
import About from "../../components/AboutSection";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
import SmokeFadeIn from "@/components/SmokeFadeIn";
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
      variables: { first: 10, after: endCursor },
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

export default async function AboutPage() {
  const {
    siteTitle,
    siteDescription,
    title,
    content,
    profilePicture,
    mediaItems,
  } = await getPageData();

  return (
    <SmokeFadeIn>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-20 sm:py-12 md:py-16">
              {/* <Name
              profilePicture={profilePicture.sourceUrl}
              siteTitle={siteTitle}
              siteDescription={siteDescription}
            /> */}
            </div>
            <main>
              <div className="mb-12 sm:mb-16">
                <About
                  profilePicture={profilePicture.sourceUrl}
                  title={title}
                  content={content}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </SmokeFadeIn>
  );
}
