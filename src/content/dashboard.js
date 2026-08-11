// Relai ops board (light) — the product dashboard placed inside heroes and
// product sections via <Dashboard content={dashboard} />.
// The numbers are internally consistent ON PURPOSE — keep these three facts
// true if anything changes: 7 containers at risk, exactly 3 due today (all at
// Pier T, matching the feed auto-summary), demurrage column sums to $4,240.
// Exactly ONE red element in the whole board: the single breaching table row
// (flag: true). Every status in the feed resolves to a DIFFERENT named source
// feed — that attribution hover is what sells the coordination-layer story.

export const dashboard = {
  chrome: {
    org: "Relai",
    crumbs: ["Port of Long Beach", "Live operations", "04:17 PST"],
  },

  nav: {
    brand: { word: "RELAI", sub: "Port of Long Beach" },
    search: { placeholder: "Search shipments, lanes, terminals", kbd: "⌘K" },
    items: [
      { label: "Overview", active: true },
      { label: "Shipments", count: "1,204" },
      { label: "Exceptions", count: "3" },
      { label: "Lanes", count: "18" },
      { label: "Terminals", count: "6" },
      { label: "Carriers", count: "24" },
      { label: "Watchlist", count: "9" },
    ],
    savedViews: {
      label: "Saved views",
      items: [
        { label: "Demurrage risk", count: "7" },
        { label: "Vessels at berth", count: "4" },
        { label: "Customs holds", count: "2" },
      ],
    },
    operator: "Operations · LGB",
  },

  feed: {
    title: "Activity feed",
    tools: ["Filter", "All lanes ▾"],
    dayLabel: "Today",
    rows: [
      {
        mark: "MSC",
        id: "MSCU 774918-5",
        state: "Discharged",
        source: "TTI Pier T · EDI 322 · 04:12 PST",
        loc: "Pier T",
        metric: "dwell 0h",
        age: "4m",
      },
      {
        mark: "BK",
        id: "Booking LB-30219",
        state: "Customs cleared",
        source: "CBP ACE · 03:48 PST",
        loc: "3 containers",
        age: "22m",
      },
      {
        mark: "DR",
        id: "Drayage #8841",
        state: "Gate-out",
        source: "APM gate OCR · 05:01 PST",
        loc: "APM Terminal",
        metric: "SCAC RLAI",
        age: "1h",
      },
      {
        mark: "EVG",
        id: "EVER FORWARD",
        state: "Berthed",
        source: "Marine Exchange AIS · 02:40 PST",
        loc: "Berth 401",
        metric: "disch ETA 06:40",
        age: "2h",
      },
      {
        mark: "MAE",
        id: "MAEU 610042-3",
        state: "Loaded",
        source: "LBCT N4 · EDI 322 · 01:55 PST",
        loc: "LBCT · rail",
        age: "3h",
      },
    ],
    summary: {
      text: "3 containers on Pier T reach last free day today. Moving them before 18:00 avoids demurrage; drayage available on 2 of 3.",
      meta: "Auto-summary · 6 feeds · 04:15 PST",
    },
  },

  console: {
    title: "Console",
    tools: ["History ⌄"],
    query: "Containers at demurrage risk — Long Beach, next 48h",
    // Bold-by-segment so the component never parses markup out of strings.
    answer: [
      { text: "7 containers", strong: true },
      { text: " approaching last free day across 3 terminals. 3 hit today; combined exposure " },
      { text: "$4,240", strong: true },
      { text: "." },
    ],
    stats: [
      { label: "At risk", value: "7" },
      { label: "Due today", value: "3" },
      { label: "Exposure", value: "$4,240" },
      { label: "Avg dwell", value: "16h" },
      { label: "Terminals", value: "3" },
    ],
    table: {
      columns: ["Container", "Milestone", "Location", "Last free day", "Demurrage"],
      rows: [
        {
          id: "TCLU 209844-1",
          sub: "MSC · 40′HC · LB-30219",
          state: "At berth",
          loc: "Pier T",
          lfd: "Today",
          dem: "$1,260",
          flag: true, // THE one red element — breaching row
        },
        {
          id: "MSCU 774918-5",
          sub: "MSC · 20′ · LB-30219",
          state: "Yard",
          loc: "Pier T",
          lfd: "Today",
          dem: "$980",
          today: true, // due today — emphasized black, NOT red
        },
        {
          id: "HLXU 445120-2",
          sub: "Hapag · 40′HC · LB-30250",
          state: "Yard",
          loc: "Pier T",
          lfd: "Today",
          dem: "$760",
          today: true,
        },
        {
          id: "MAEU 610042-3",
          sub: "Maersk · 40′ · LB-30204",
          state: "Rail-out",
          loc: "LBCT",
          lfd: "+1d",
          dem: "$1,240", // 1,260 + 980 + 760 + 1,240 = the quoted $4,240 exposure
        },
      ],
    },
    ask: "Ask about any shipment, lane, or terminal",
  },

  footer: {
    live: "Live",
    items: ["1,204 events today", "38 vessels tracked", "6 terminals"],
    clock: "Updated 04:17 PST",
  },
};
