import ProductHero from "@/components/ProductHero";
import { meta, productHero } from "@/content/product-hero";
import { dashboard } from "@/content/dashboard";

export const metadata = meta;

export default function ProductHeroSandboxPage() {
  return <ProductHero content={productHero} board={dashboard} />;
}
