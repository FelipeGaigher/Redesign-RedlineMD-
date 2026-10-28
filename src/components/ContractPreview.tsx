import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "../lib/motion";
import { Alert, Check } from "./Icons";

/*
 * 0 clause as written · 1 risky sentence struck · 2 replacement inserted · 3 risk tag.
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
    <div ref={ref} className="relative">
      <figure
        aria-label="Example: Redline MD striking a physician-paid tail coverage clause and proposing employer-paid coverage"
        className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]"
      >
        {/* Document chrome */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink">Physician Employment Agreement</p>
            <p className="text-[12px] text-muted">§ 7.3 Professional liability · p. 14 of 28</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[12px] font-medium text-muted">
            <span className={`size-1.5 rounded-full ${phase === 0 ? "bg-muted/50" : "bg-redline"}`} />
            {phase === 0 ? "Reviewing" : "Redlined"}
          </span>
        </div>

        {/* Clause */}
        <div className="paper-rules relative px-4 pt-5 pb-6 font-serif text-[16.5px] leading-[32px] text-ink sm:px-6 sm:text-[17.5px]">
          <p>
            <span className="mr-2 font-sans text-[12px] font-semibold tracking-wide text-muted">7.3</span>
            Upon termination of this Agreement for any reason,{" "}
            <span className="redline-strike" data-on={flagged}>
              Physician shall be solely responsible for obtaining and paying for extended reporting
              (“tail”) coverage
            </span>{" "}
            for claims arising from services rendered during the term.
          </p>

          <AnimatePresence>
            {phase >= 2 && (
              <motion.p
                key="ins"
                initial={reduce ? false : { opacity: 0, y: 6, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-2 border-l-2 border-accept pl-3 text-accept"
              >
                <span className="underline decoration-accept/40 decoration-1 underline-offset-[5px]">
                  Employer shall provide and pay for tail coverage at no cost to Physician.
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                key="tag"
                initial={reduce ? false : { opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-redline/20 bg-redline-soft px-3 py-2 font-sans text-[14px] text-ink shadow-[var(--shadow-float)]"
              >
                <Alert className="size-4 text-redline" />
                <span>
                  Risk: <strong className="tabular font-semibold">~$12,000</strong> exposure
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Clause checklist: shows the review covers the whole contract, not one sentence */}
        <ul className="grid grid-cols-3 border-t border-line text-[12px] sm:text-[13px]">
          {[
            { label: "Non-compete", ok: true },
            { label: "Tail coverage", ok: false },
            { label: "Termination", ok: true },
          ].map((c) => (
            <li key={c.label} className="flex items-center gap-1.5 border-r border-line px-3 py-2.5 last:border-r-0 sm:px-4">
              {c.ok ? (
                <Check className="size-3.5 shrink-0 text-accept" />
              ) : (
                <Alert className={`size-3.5 shrink-0 transition-colors ${flagged ? "text-redline" : "text-muted/50"}`} />
              )}
              <span className="truncate text-muted">{c.label}</span>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
