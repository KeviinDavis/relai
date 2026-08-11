"use client";

import { useEffect, useRef } from "react";

// Fit-to-width wrapper for the fixed 1360px board. Measures the available
// column and publishes --board-scale (available / design width) plus the
// board's scaled height, so the mobile stylesheet can transform-scale the
// REAL component — never a rebuilt or rasterized mobile board — while the
// wrapper reserves the right layout height (transforms don't affect flow).
// Desktop styles ignore both variables, so the board stays 1360 and bleeds.
export default function BoardScaler({ children, className = "", stageClassName = "", designWidth = 1360 }) {
  const outerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    const update = () => {
      const scale = outer.clientWidth / designWidth;
      outer.style.setProperty("--board-scale", String(scale));
      outer.style.setProperty("--board-height", `${stage.offsetHeight * scale}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [designWidth]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={stageRef} className={stageClassName}>
        {children}
      </div>
    </div>
  );
}
