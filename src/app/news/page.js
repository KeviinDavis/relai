import News from "@/components/News";
import { news } from "@/content/news";

export const metadata = { title: "News" };

// News index — only the News band (featured article + list of every article
// link) over the shared Footer (rendered by the layout). `standalone` adds the
// top-of-page nav clearance the home instance doesn't need.
export default function NewsPage() {
  return <News content={news} standalone />;
}
