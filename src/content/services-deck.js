// Relai services deck content (§07 Capabilities) — consumed by
// app/sandbox/services-deck/page.js via <ServicesDeck services={services} />.
// caption = the left-half lead line; images are neutral gray placeholders.
// The panel number ([ 01 / 04 ]) is derived from position in the component.

export const meta = {
  title: "Services Deck — Sandbox",
  description:
    "From sea to road, Relai coordinates every leg — then measures what it saves.",
};

// Images intentionally empty for now — the left column renders without art.
// Restore art by giving each panel { src, srcMobile, alt } (e.g. the /svgs/relai-*.svg).
const image = (alt) => ({ alt });

// dark: alternating left-column tone — the light/dark contrast is what makes the
// stack read with depth as panels slide over each other (§07 rhythm: 1 & 3 dark).

export const services = [
  {
    title: "Vessel Intelligence",
    caption: "Sees the vessel before the port does.",
    description:
      "AIS position, weather and berth windows fused into one arrival picture — updated continuously, shared by everyone planning against it.",
    dark: true,
    image: image("Vessel Intelligence"),
    capabilities: [
      "AIS position & weather",
      "Predictive ETA",
      "Berth windows & pro forma",
      "Stowage & discharge plans",
    ],
  },
  {
    title: "Terminal Orchestration",
    caption: "Sequences the terminal around reality.",
    description:
      "Berth, crane, yard and gate planned against real arrivals instead of the published schedule — and replanned the moment conditions change.",
    image: image("Terminal Orchestration"),
    capabilities: [
      "Crane & equipment telemetry",
      "Yard inventory & restow",
      "Gate appointments",
      "Exception queue",
    ],
  },
  {
    title: "Drayage & Handoff",
    caption: "Matches every box to a ready driver.",
    description:
      "Every container carries a known location, an appointment and a driver matched to it. No phone tag, no trips to a box that is not ready.",
    dark: true,
    image: image("Drayage & Handoff"),
    capabilities: [
      "Container availability & holds",
      "Appointment matching",
      "Driver messaging",
      "Chassis & equipment pools",
    ],
  },
  {
    title: "Emissions & Idle",
    caption: "Turns saved hours into reported numbers.",
    description:
      "Idle hours, fuel burn and emissions per move, measured where the coordination happens — so every gain becomes a number you can report.",
    image: image("Emissions & Idle"),
    capabilities: [
      "Idle hours per call",
      "Fuel burn per move",
      "CO2e per container",
      "Reporting exports",
    ],
  },
];
