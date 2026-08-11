"use client";

import { useEffect, useRef, useState } from "react";

// Scene footage for the composite hero. A bare <video> instead of the Media
// primitive because the brief needs two things Media doesn't do: a poster
// fallback and a real prefers-reduced-motion stop (CSS can only hide a video —
// it would keep downloading and playing underneath).
// The poster is frame 0 of the clip, so the reduced-motion rewind lands on a
// pixel-identical still. SSR always emits autoPlay (state starts false); the
// hydration effect pauses within a frame — invisible for the same reason.
export default function HeroVideo({ src, poster, className = "" }) {
  const ref = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(query.matches);
      const video = ref.current;
      if (!video) return;
      if (query.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.play().catch(() => {});
      }
    };

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
