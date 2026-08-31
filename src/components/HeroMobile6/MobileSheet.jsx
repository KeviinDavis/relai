"use client";

import { useState } from "react";
import styles from "./MobileSheet.module.css";

// SANDBOX — Mobile variant 6 bottom sheet. The SAME ops-board data, reflowed:
// the live board rises from the viewport bottom as one frosted sheet with a
// grab handle. Reads board.feed / board.chrome / board.console verbatim — no
// new content. Every row's micro-cap state is a real <button> that reveals that
// row's SOURCE attribution (the signature Dashboard interaction, tap-driven on
// mobile); row 0 opens by default as the demonstration. The single accent on
// the whole screen is the red "N due today" — the gray live dot is NOT red.
export default function MobileSheet({ board, className = "" }) {
  const { chrome, feed, console: konsole } = board;

  // Row 0 (MSC) reveals its source inline as the tap-reveal demonstration.
  const [open, setOpen] = useState(() => new Set([0]));
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const idBase = "hero-m6-sheet";

  // "Live operations · Port of Long Beach" from the board's own crumbs.
  const [place, liveLabel] = chrome.crumbs; // ["Port of Long Beach", "Live operations", …]
  const headLabel = `${liveLabel} · ${place}`;

  // The red beat: the "Due today" count from the console stats (invariant: 3).
  const dueValue =
    konsole.stats.find((s) => s.label === "Due today")?.value ?? "3";

  return (
    <aside className={className} aria-label="Live operations feed">
      <div className={styles.sheet}>
        <span className={styles.handle} aria-hidden="true" />

        <div className={styles.head}>
          <span className={`${styles.live} ${styles.pulse}`} aria-hidden="true" />
          <span className={styles.headLabel}>{headLabel}</span>
          <span className={styles.due}>{dueValue} due today</span>
        </div>

        <div className={styles.list}>
          <div className={styles.dayLabel}>{feed.dayLabel}</div>

          {feed.rows.map((row, i) => {
            const isOpen = open.has(i);
            const srcId = `${idBase}-src-${i}`;
            return (
              <div key={row.id} className={styles.row}>
                <span className={styles.mark}>{row.mark}</span>

                <div className={styles.body}>
                  <div className={styles.rowId}>{row.id}</div>
                  <div className={styles.sub}>
                    <button
                      type="button"
                      className={styles.state}
                      aria-expanded={isOpen}
                      aria-controls={srcId}
                      onClick={() => toggle(i)}
                    >
                      {row.state}
                    </button>
                    {row.loc && (
                      <>
                        <span className={styles.sep} aria-hidden="true">
                          ·
                        </span>
                        <span className={styles.loc}>{row.loc}</span>
                      </>
                    )}
                  </div>

                  <div id={srcId} className={styles.source} hidden={!isOpen}>
                    <div className={styles.sourceLabel}>Source</div>
                    <div className={styles.sourceValue}>{row.source}</div>
                  </div>
                </div>

                <span className={styles.age}>{row.age}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.peekFade} aria-hidden="true" />
      </div>
    </aside>
  );
}
