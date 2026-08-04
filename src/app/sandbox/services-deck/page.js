import ServicesDeck from "@/components/ServicesDeck";
import { meta, services } from "@/content/services-deck";

export const metadata = meta;

export default function ServicesDeckSandboxPage() {
  return <ServicesDeck services={services} />;
}
