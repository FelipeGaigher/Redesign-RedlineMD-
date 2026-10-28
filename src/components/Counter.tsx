import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Counts 0 → value once, 1.2s, the first time it enters the viewport. */
export function Counter({ value, prefix = "", suffix = "", locale = "en-US" }: { value: number; prefix?: string; suffix?: string; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular">
      <span className="sr-only">{`${prefix}${value.toLocaleString(locale)}${suffix}`}</span>
      <span aria-hidden>
        {prefix}
        {n.toLocaleString(locale)}
        {suffix}
      </span>
    </span>
  );
}
