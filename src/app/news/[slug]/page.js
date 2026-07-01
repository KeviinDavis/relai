import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import NewsArticleContent from "@/components/NewsArticleContent";
import { getArticle, articleSlugs } from "@/content/news";

// One page template for every News link (content/news.js is the source of
// truth). Composes the shared light Hero — big title over the article's
// placeholder image — above the NewsArticleContent body band. The route renders
// white head-to-foot via RouteTheme (/news/* is a light route).

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description || article.body?.lead || article.title,
  };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const heroContent = {
    tone: "light",
    eyebrow: "News",
    title: article.title,
    meta: [article.date],
    media: {
      type: "image",
      src: article.image.src,
      alt: article.image.alt,
    },
  };

  return (
    <>
      <Hero content={heroContent} />
      <NewsArticleContent content={article} />
    </>
  );
}
