"use client";

import { useState } from "react";
import styles from "./MobileSheet.module.css";

// VARIANT 11 mobile surface: a frosted bottom sheet with an iOS-style segmented
// control (Feed | Console | Exceptions). It renders the SAME board data as the
// desktop Dashboard, reflowed to a single phone column — never new content.
// Feed is the default pane; every feed status is tappable and reveals its real
// SOURCE attribution inline (the coordination-layer story). The one accent on
// screen is the red Exceptions badge; the one red beat inside the Console /
// Exceptions panes is the single breaching row.
export default function MobileSheet({ board, className = "" }) {
  const { feed, console: konsole } = board;
  const [tab, setTab] = useState("feed");
  // Row 0's source shows inline by default (matches the reference); tapping any
  // status toggles that row open/closed.
  const [openRow, setOpenRow] = useState(0);

  // The breaching / due-today containers — all at Pier T. TCLU is the one red
  // breach (flag); the other two are due today but black, never red.
  const exceptions = konsole.table.rows.filter((row) => row.today || row.flag);

  const tabs = [
    { key: "feed", label: "Feed" },
    { key: "console", label: "Console" },
    { key: "exceptions", label: "Exceptions", badge: exceptions.length },
  ];

  return (
    <div className={`${styles.sheet} ${className}`}>
      <div className={styles.handle} aria-hidden="true" />

      <div className={styles.seg} role="tablist" aria-label="Ops board views">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={`${styles.segItem} ${tab === t.key ? styles.on : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.badge != null && <span className={styles.badge}>{t.badge}</span>}
          </button>
        ))}
      </div>

      {tab === "feed" && (
        <div className={styles.pane} role="tabpanel">
          <div className={styles.dayLabel}>{feed.dayLabel}</div>

          {feed.rows.map((row, i) => {
            const open = openRow === i;
            return (
              <div key={row.id} className={styles.frow}>
                <span className={styles.mark}>{row.mark}</span>
                <div className={styles.fbody}>
                  <div className={styles.fid}>{row.id}</div>
                  <div className={styles.fsub}>
                    <button
                      type="button"
                      className={styles.state}
                      aria-expanded={open}
                      onClick={() => setOpenRow(open ? -1 : i)}
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
                  {open && (
                    <div className={styles.source}>
                      <div className={styles.sourceLabel}>Source</div>
                      <div className={styles.sourceValue}>{row.source}</div>
                    </div>
                  )}
                </div>
                <span className={styles.age}>{row.age}</span>
              </div>
            );
          })}

          <div className={styles.summary}>
            <p>{feed.summary.text}</p>
            <div className={styles.summaryMeta}>
              <span className={styles.live} aria-hidden="true" />
              {feed.summary.meta}
            </div>
          </div>
        </div>
      )}

      {tab === "console" && (
        <div className={styles.pane} role="tabpanel">
          <div className={styles.query}>{konsole.query}</div>

          <div className={styles.answer}>
            {konsole.answer.map((segment, i) =>
              segment.strong ? (
                <b key={i}>{segment.text}</b>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )}
          </div>

          <div className={styles.stats}>
            {konsole.stats.map((stat) => (
              <span key={stat.label}>
                {stat.label} <b>{stat.value}</b>
              </span>
            ))}
          </div>

          <div className={styles.riskList}>
            {konsole.table.rows.map((row) => (
              <div
                key={row.id}
                className={`${styles.risk} ${row.flag ? styles.flag : ""}`}
              >
                <div className={styles.riskMain}>
                  <div className={styles.riskId}>{row.id}</div>
                  <div className={styles.riskSub}>{row.sub}</div>
                </div>
                <div className={styles.riskMeta}>
                  <span className={styles.riskState}>{row.state}</span>
                  <span className={styles.sep} aria-hidden="true">
                    ·
                  </span>
                  <span className={styles.loc}>{row.loc}</span>
                </div>
                <div className={styles.riskNums}>
                  <span
                    className={`${styles.lfd} ${row.flag ? styles.lfdBreach : ""} ${
                      row.today && !row.flag ? styles.lfdToday : ""
                    }`}
                  >
                    {row.lfd}
                  </span>
                  <span className={styles.dem}>{row.dem}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "exceptions" && (
        <div className={styles.pane} role="tabpanel">
          <div className={styles.dayLabel}>Breaching · last free day today</div>
          {exceptions.map((row) => (
            <div
              key={row.id}
              className={`${styles.risk} ${row.flag ? styles.flag : ""}`}
            >
              <div className={styles.riskMain}>
                <div className={styles.riskId}>{row.id}</div>
                <div className={styles.riskSub}>{row.sub}</div>
              </div>
              <div className={styles.riskMeta}>
                <span className={styles.riskState}>{row.state}</span>
                <span className={styles.sep} aria-hidden="true">
                  ·
                </span>
                <span className={styles.loc}>{row.loc}</span>
              </div>
              <div className={styles.riskNums}>
                <span
                  className={`${styles.lfd} ${row.flag ? styles.lfdBreach : styles.lfdToday}`}
                >
                  {row.lfd}
                </span>
                <span className={styles.dem}>{row.dem}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
