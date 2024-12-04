import ProductionsList from "@/components/ProductionsList";
import { fetchMediaItems } from "@/lib/api";

export default async function ProductionPage() {
  const mediaItems = await fetchMediaItems();
  return <ProductionsList initialMediaItems={mediaItems} />;
}
