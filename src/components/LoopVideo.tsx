import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = { name: string; className?: string; label?: string };

/*
 * Muted ambient loop from /public/video/<name>.mp4 with <name>.jpg as poster.
 * Nothing downloads until it nears the viewport, it pauses off-screen,
 * and with reduced motion only the poster shows.
 */
export function LoopVideo({ name, className = "", label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") {
            v.preload = "auto";
            v.src = `/video/${name}.mp4`;
          }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [name, reduce]);

  return (
    <video
      ref={ref}
      poster={`/video/${name}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={`object-cover ${className}`}
    />
  );
}
