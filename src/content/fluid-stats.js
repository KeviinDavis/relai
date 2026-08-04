// FluidStats content — a media tile + the three mission stats, rendered as a
// fluid 4-column row. Consumed by app/sandbox/fluid-stats/page.js via
// <FluidStats media={media} cards={cards} />.
//
// The three stat cards reuse the SAME data as FluidCards — re-exported from
// content/impact.js so the copy stays in one place.

export { cards } from "@/content/impact";

export const meta = {
  title: "Fluid Stats — Sandbox",
  description:
    "The mission in numbers — a media tile and three fluid stat cards in one row.",
};

// Media tile (column 1). type: "image" | "video".
//   image: { type: "image", src, alt }
//   video: { type: "video", src, poster? } (decorative — muted autoplay loop)
// Gray placeholder for now — swap `src` for real art or a clip later.
export const media = {
  type: "video",
  src: "/exampleimages/Relai.mp4",
  alt: "Mission impact overview",
};
