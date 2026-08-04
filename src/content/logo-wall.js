export const meta = {
  title: "Logo Wall — Sandbox",
  description: "Continuously scrolling logo strip with soft edge fades.",
};

// width/height are each file's intrinsic pixels (500×200 or 300×100
// letterboxed canvases) so next/image reserves the right box; CSS caps
// rendered height and lets width follow. `repeat` stacks the list per loop
// half — one half must outrun the widest masked area (~1900px); 13 logos
// clear that in a single pass (~2.4k px at the current cap height).
export const logoWall = {
  duration: 40, // seconds per full loop
  pauseOnHover: false,
  repeat: 1,
  logos: [
    { src: "/LogoBGRemoved/apmt-2-removebg-preview.webp", alt: "APM Terminals", width: 500, height: 200 },
    { src: "/LogoBGRemoved/Maersk-removebg-preview.webp", alt: "Maersk", width: 300, height: 100 },
    { src: "/LogoBGRemoved/dp_world_santos-removebg-preview.webp", alt: "DP World Santos", width: 500, height: 200 },
    { src: "/LogoBGRemoved/dpworld-evyap-removebg-preview.webp", alt: "DP World Evyap", width: 500, height: 200 },
    { src: "/LogoBGRemoved/One-removebg-preview.webp", alt: "Ocean Network Express", width: 300, height: 100 },
    { src: "/LogoBGRemoved/eurogate-removebg-preview.webp", alt: "Eurogate", width: 500, height: 200 },
    { src: "/LogoBGRemoved/hapag-lloyd-min-removebg-preview.webp", alt: "Hapag-Lloyd", width: 500, height: 200 },
    { src: "/LogoBGRemoved/Port-Rotterdam-removebg-preview.webp", alt: "Port of Rotterdam", width: 300, height: 100 },
    { src: "/LogoBGRemoved/port-houston-min-removebg-preview.webp", alt: "Port Houston", width: 500, height: 200 },
    { src: "/LogoBGRemoved/south-carolina-ports-min-removebg-preview.webp", alt: "South Carolina Ports", width: 500, height: 200 },
    { src: "/LogoBGRemoved/Shell-removebg-preview.webp", alt: "Shell", width: 300, height: 100 },
    { src: "/LogoBGRemoved/unifeeder__1_-1-removebg-preview.webp", alt: "Unifeeder", width: 500, height: 200 },
    { src: "/LogoBGRemoved/westport-removebg-preview.webp", alt: "Westport", width: 500, height: 200 },
  ],
};
