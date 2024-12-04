import ProductionsList from "@/components/ProductionsList";
import { fetchMediaItems } from "@/lib/api";

export default async function ProductionPage() {
  return <ProductionsList />;
}
