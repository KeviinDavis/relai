import Hero from "@/components/Hero";
import FormSection from "@/components/FormSection";
import { meta, hero, form } from "@/content/book-a-demo";

export const metadata = meta;

export default function BookADemoPage() {
  return (
    <>
      <Hero content={hero} />
      <FormSection content={form} />
    </>
  );
}
