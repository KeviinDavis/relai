import styles from "./Dashboard.module.css";

// Relai ops board — an opaque, always-light product-UI artifact (it does not
// theme-flip with the page). Three panes on a fixed 1360px design: nav (234px)
// / activity feed (1fr) / Console (1.75fr — widest on purpose). Depth comes
// from tone steps and two hairline weights, never shadow. The section that
// places it owns sizing/scaling; the board itself is just its natural width.
//
// The signature interaction: every feed status is a focusable trigger that
// reveals its SOURCE attribution card (a different named feed per status) on
// hover and keyboard focus.
//
// idBase namespaces the tooltip ids if a page ever renders two boards.
// skin="glass" swaps the opaque surface tokens for the frosted-glass set
// (compositing contexts only — the board over footage); structure, content,
// and the opaque default are untouched.
export default function Dashboard({ content, className = "", idBase = "relai-board", skin }) {
  const { chrome, nav, feed, console: konsole, footer } = content;

  return (
    <div className={`${styles.board} ${skin === "glass" ? styles.glass : ""} ${className}`}>
      <div className={styles.chrome}>
        <span className={styles.chromeDot} aria-hidden="true" />
        <span className={styles.chromeDot} aria-hidden="true" />
        <span className={styles.chromeDot} aria-hidden="true" />
        <span className={styles.crumb}>
          <b>{chrome.org}</b>
          {chrome.crumbs.map((crumb) => (
            <span key={crumb}>&nbsp;&nbsp;·&nbsp;&nbsp;{crumb}</span>
          ))}
        </span>
      </div>

      <div className={styles.grid}>
        <nav className={`${styles.pane} ${styles.nav}`} aria-label="Board navigation">
          <div className={styles.brand}>
            <div>
              <div className={styles.word}>{nav.brand.word}</div>
              <small>{nav.brand.sub}</small>
            </div>
            <span className={styles.switcher} aria-hidden="true">
              ⌄
            </span>
          </div>

          <div className={styles.search}>
            {nav.search.placeholder}
            <span className={styles.kbd}>{nav.search.kbd}</span>
          </div>

          <div className={styles.navList}>
            {nav.items.map((item) => (
              <div
                key={item.label}
                className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}
              >
                {item.label}
                {item.count && <span className={styles.count}>{item.count}</span>}
              </div>
            ))}
          </div>

          <div className={styles.navGroup}>{nav.savedViews.label}</div>
          {nav.savedViews.items.map((item) => (
            <div key={item.label} className={styles.subItem}>
              {item.label}
              <span className={styles.count}>{item.count}</span>
            </div>
          ))}

          <div className={styles.navSpacer} />
          <div className={styles.operator}>
            <i aria-hidden="true" />
            {nav.operator}
            <span aria-hidden="true">⌄</span>
          </div>
        </nav>

        <section className={`${styles.pane} ${styles.mid}`} aria-label={feed.title}>
          <div className={styles.paneHead}>
            <h2>{feed.title}</h2>
            <div className={styles.tools}>
              {feed.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>

          <div className={styles.dayLabel}>{feed.dayLabel}</div>

          {feed.rows.map((row, i) => (
            <div key={row.id} className={styles.row}>
              <span className={styles.mark}>{row.mark}</span>
              <div>
                <div className={styles.rowId}>{row.id}</div>
                <div className={styles.rowSub}>
                  <span className={styles.stateWrap}>
                    <span
                      className={styles.state}
                      tabIndex={0}
                      aria-describedby={`${idBase}-src-${i}`}
                    >
                      {row.state}
                    </span>
                    <span role="tooltip" id={`${idBase}-src-${i}`} className={styles.sourceCard}>
                      <span className={styles.sourceLabel}>Source</span>
                      <span className={styles.sourceValue}>{row.source}</span>
                    </span>
                  </span>
                  {row.loc && (
                    <>
                      <span className={styles.dotSep} aria-hidden="true">
                        ·
                      </span>
                      <span className={styles.loc}>{row.loc}</span>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.rowMeta}>
                {row.metric && <span className={styles.metric}>{row.metric}</span>}
                <span className={styles.age}>{row.age}</span>
              </div>
            </div>
          ))}

          <div className={styles.summary}>
            <p>{feed.summary.text}</p>
            <div className={styles.summaryMeta}>{feed.summary.meta}</div>
          </div>
        </section>

        <section className={`${styles.pane} ${styles.right}`} aria-label={konsole.title}>
          <div className={styles.paneHead}>
            <h2>{konsole.title}</h2>
            <div className={styles.tools}>
              {konsole.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>

          <div className={styles.query}>{konsole.query}</div>

          <div className={styles.answer}>
            {konsole.answer.map((segment, i) =>
              segment.strong ? <b key={i}>{segment.text}</b> : <span key={i}>{segment.text}</span>
            )}
          </div>

          <div className={styles.stats}>
            {konsole.stats.map((stat) => (
              <span key={stat.label}>
                {stat.label} <b>{stat.value}</b>
              </span>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <colgroup>
                <col className={styles.colId} />
                <col className={styles.colState} />
                <col className={styles.colLoc} />
                <col className={styles.colLfd} />
                <col className={styles.colDem} />
              </colgroup>
              <thead>
                <tr>
                  {konsole.table.columns.map((column, i) => (
                    <th key={column} scope="col" className={i >= 3 ? styles.num : ""}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {konsole.table.rows.map((row) => (
                  <tr key={row.id} className={row.flag ? styles.flag : ""}>
                    <td>
                      <div className={styles.cellId}>{row.id}</div>
                      <div className={styles.cellSub}>{row.sub}</div>
                    </td>
                    <td>
                      <span className={styles.cellState}>{row.state}</span>
                    </td>
                    <td className={styles.cellLoc}>{row.loc}</td>
                    <td className={`${styles.num} ${styles.cellLfd} ${row.today ? styles.cellToday : ""}`}>
                      {row.lfd}
                    </td>
                    <td className={`${styles.num} ${styles.cellDem}`}>{row.dem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.ask}>
            {konsole.ask}
            <span className={styles.send} aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 19V5" />
                <path d="M6 11l6-6 6 6" />
              </svg>
            </span>
          </div>
        </section>

        <footer className={styles.foot}>
          <span className={styles.live} aria-hidden="true" /> {footer.live}
          {footer.items.map((item) => (
            <span key={item} className={styles.footItem}>
              <span className={styles.footSep} aria-hidden="true">
                ·
              </span>
              {item}
            </span>
          ))}
          <span className={styles.clock}>{footer.clock}</span>
        </footer>
      </div>
    </div>
  );
}
