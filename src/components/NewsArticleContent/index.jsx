import Link from "next/link";
import Section from "@/components/Section";
import Container from "@/components/Container";
import styles from "./NewsArticleContent.module.css";

// Rebuild of the source's NewsArticleContent slice: a 12-column band on the
// light surface with a sticky info column (article summary + Share) on the left
// and the rich-text body (a larger lead paragraph, then body paragraphs, with
// optional inline links) on the right. Data-only rich text — see content/news.js
// for the `body` model. Server component; the Share buttons are decorative.

// Decorative share targets — labels mirror the source (X / LI / RD). No click
// behavior yet; wire to share intents when the article URLs are canonical.
const SHARE_TARGETS = [
  { key: "x", label: "X", aria: "Share on X" },
  { key: "li", label: "LI", aria: "Share on LinkedIn" },
  { key: "rd", label: "RD", aria: "Share on Reddit" },
];

// A paragraph is either a plain string or an array of segments, where a string
// is text and { text, href } is an inline link (rendered via next/link).
function Paragraph({ block }) {
  if (typeof block === "string") {
    return <p className={styles.paragraph}>{block}</p>;
  }
  return (
    <p className={styles.paragraph}>
      {block.map((segment, i) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <Link key={i} href={segment.href} className={styles.inlineLink}>
            {segment.text}
          </Link>
        )
      )}
    </p>
  );
}

export default function NewsArticleContent({ content = {} }) {
  const { title, summary, body = {} } = content;
  const { lead, paragraphs = [] } = body;
  const leadIn = summary || title;

  return (
    <Section variant="default" className={styles.root}>
      <Container>
        <div className={styles.grid}>
          <aside className={styles.left}>
            <div className={styles.information}>
              {leadIn && <p className={styles.summary}>{leadIn}</p>}
              <div className={styles.share}>
                <p className={styles.shareTitle}>Share</p>
                <div className={styles.shareButtons}>
                  {SHARE_TARGETS.map((target) => (
                    <button
                      key={target.key}
                      type="button"
                      className={styles.shareButton}
                      aria-label={target.aria}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.right}>
            <div className={styles.content}>
              {lead && <p className={styles.lead}>{lead}</p>}
              {paragraphs.map((block, i) => (
                <Paragraph key={i} block={block} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
