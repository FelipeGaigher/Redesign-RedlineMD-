import { useReducedMotion } from "framer-motion";

/*
 * Field of small navy squares that breathe at different speeds, fading out toward the edges.
 * Same device as the reference (digai.ai). Deterministic so it renders identically on every load.
 */
const COLS = 22;
const ROWS = 12;

function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function PixelGrid({ className = "", tone = "navy" }: { className?: string; tone?: "navy" | "white" }) {
  const reduce = useReducedMotion();
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      const rnd = seeded(i);
      if (rnd < 0.45) continue;
      // Falloff from the center so the grid dissolves into the page.
      const dx = (c - COLS / 2) / (COLS / 2);
      const dy = (r - ROWS / 2) / (ROWS / 2);
      const falloff = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));
      const base = 0.05 + falloff * 0.22 * rnd;
      cells.push(
        <rect
          key={i}
          x={c * 26}
          y={r * 26}
          width={20}
          height={20}
          style={{
            opacity: base,
            animation: reduce ? undefined : `pixel-pulse ${3 + rnd * 3.4}s ease-in-out ${-rnd * 6}s infinite`,
          }}
        />,
      );
    }
  }
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${COLS * 26} ${ROWS * 26}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${tone === "navy" ? "fill-navy" : "fill-white"} ${className}`}
    >
      {cells}
    </svg>
  );
}
