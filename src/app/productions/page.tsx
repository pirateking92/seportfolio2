import ProductionsList from "@/components/ProductionsList";
import { fetchMediaItems } from "@/lib/api";
export interface MediaItem {
  sourceUrl: string;
  caption: string;
  slug: string;
}

function createSlug(caption: string, id: string): string {
  if (!caption) {
    return id; // Fallback to ID if caption is missing
  }
  const strippedCaption = caption.replace(/<[^>]+>/g, "");
  const slug = strippedCaption
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return slug; // Append ID to ensure uniqueness
}

export default async function ProductionPage() {
  const mediaItems = await fetchMediaItems();
  return <ProductionsList initialMediaItems={mediaItems} />;
}
