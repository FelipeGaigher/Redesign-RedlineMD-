import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "../lib/i18n";
import { EASE } from "../lib/motion";
import { Alert, Check } from "./Icons";

/*
 * Reads like Word's track changes, because that is what a physician will open:
 * 0 clause as written · 1 risky sentence struck · 2 replacement inserted · 3 margin comment.
 * One cycle every 6s, only while the card is on screen.
 */
type Phase = 0 | 1 | 2 | 3;
const CYCLE_MS = 6000;
const STEPS: Array<[number, Phase]> = [
  [500, 1],
  [1900, 2],
  [2700, 3],
  [5500, 0],
];

export function ContractPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const { t } = useT();
  const c = t.contract;
  const [phase, setPhase] = useState<Phase>(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) {
      setPhase(3);
      return;
    }
    if (!inView) return;
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = STEPS.map(([at, p]) => window.setTimeout(() => setPhase(p), at));
    };
    run();
    const loop = window.setInterval(run, CYCLE_MS);
    return () => {
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  const flagged = phase >= 1;

  return (
    <div ref={ref}>
      <figure
        aria-label={c.aria}
        className="overflow-hidden rounded-ui border border-line bg-surface shadow-lg"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line bg-wash px-4 py-2.5">
          <p className="truncate font-mono text-[12px] text-muted">{c.file}</p>
          <p className="shrink-0 font-mono text-[12px] text-muted">{c.page}</p>
        </div>

        <div className="px-5 pt-6 pb-6 sm:px-7">
          <p className="font-mono text-[12px] text-muted">{c.section}</p>
          <p className="mt-3 text-[17px] leading-[1.7] text-ink sm:text-[18px]">
            {c.before}
            <span className="redline-strike" data-on={flagged}>
              {c.struck}
            </span>{" "}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.span
                  key="ins"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="text-accept underline decoration-accept decoration-1 underline-offset-[4px]"
                >
                  {c.inserted}
                </motion.span>
              )}
            </AnimatePresence>
            {c.after}
          </p>

          <div className="mt-5 min-h-[76px]">
            <AnimatePresence>
              {phase >= 3 && (
                <motion.aside
                  key="comment"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="border-l-2 border-red bg-red-soft px-4 py-3"
                >
                  <p className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                    <Alert className="size-[1.05em] text-red" />
                    {c.risk} <span className="tabular">~$12,000</span> {c.exposure}
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted">{c.advice}</p>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* The review covers the whole contract, not one sentence */}
        <ul className="grid grid-cols-3 border-t border-line text-[12px] sm:text-[13px]">
          {c.checks.map((label, i) => ({ label, ok: i !== 1 })).map((item) => (
            <li key={item.label} className="flex items-center gap-1.5 border-r border-line px-3 py-2.5 last:border-r-0 sm:px-4">
              {item.ok ? (
                <Check className="size-3.5 shrink-0 text-accept" />
              ) : (
                <Alert className={`size-3.5 shrink-0 transition-colors ${flagged ? "text-red" : "text-muted/50"}`} />
              )}
              <span className="truncate text-muted">{item.label}</span>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
