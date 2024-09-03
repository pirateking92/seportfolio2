import { NextResponse } from "next/server";
import client from "../../../../apollo-client";
import { GET_ALL_MEDIA_ITEMS } from "@/lib/queries";

export async function GET() {
  try {
    const { data } = await client.query({
      query: GET_ALL_MEDIA_ITEMS,
      variables: { first: 100 }, // Adjust as needed
    });

    const mediaItems = data.mediaItems.nodes.map((node: any) => ({
      sourceUrl: node.sourceUrl,
      caption: node.caption || "",
      slug: createSlug(node.caption || "", node.id),
    }));

    return NextResponse.json(mediaItems);
  } catch (error) {
    console.error("Error fetching media items:", error);
    return NextResponse.json(
      { error: "Failed to fetch media items" },
      { status: 500 }
    );
  }
}

function createSlug(caption: string, id: string): string {
  if (!caption) {
    return id;
  }
  const strippedCaption = caption.replace(/<[^>]+>/g, "");
  const slug = strippedCaption
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return slug;
}
