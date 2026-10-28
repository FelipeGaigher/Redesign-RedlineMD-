import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "../lib/i18n";
import { EASE } from "../lib/motion";
import { Alert, File } from "./Icons";

/* The brand bolt, redrawn as a vector so it stays crisp at any size. */
export function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 32" className={className}>
      <path d="M15.5 0 3 18.2h7.6L6.4 32 21 12.4h-7.8L15.5 0z" fill="currentColor" />
    </svg>
  );
}

/*
 * Inputs → engine → findings (pattern from digai.ai's TIP diagram).
 * Findings land one by one while the section is on screen, then a skeleton keeps "analyzing".
 */
export function Checks() {
  const { t, lang } = useT();
  const c = t.checks;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [count, setCount] = useState(1180);
  const [shown, setShown] = useState(reduce ? c.findings.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const tick = window.setInterval(() => setCount((n) => n + 1 + Math.floor(Math.random() * 3)), 900);
    const timers = c.findings.map((_, i) => window.setTimeout(() => setShown(i + 1), 700 + i * 1100));
    return () => {
      clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce, c.findings]);

  return (
    <section id="checks" className="py-16 lg:py-24" aria-labelledby="checks-title">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-[13px] font-semibold text-red">{c.eyebrow}</p>
          <h2 id="checks-title" className="mt-3 text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-navy sm:text-[40px]">
            {c.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[38rem] text-[16px] text-muted lg:text-[17px]">{c.body}</p>
        </div>

        <div ref={ref} className="relative mt-12 lg:mt-16">
          {/* Column labels */}
          <div className="hidden grid-cols-3 gap-8 font-mono text-[11px] tracking-[0.12em] text-muted uppercase lg:grid">
            {c.cols.map((col, i) => (
              <p key={col} className={`flex items-center gap-3 ${i === 1 ? "justify-center" : i === 2 ? "justify-end" : ""}`}>
                <span aria-hidden className="h-px w-8 bg-line" />
                {col}
              </p>
            ))}
          </div>

          <div className="relative mt-8 grid items-center gap-10 lg:grid-cols-3 lg:gap-8">
            {/* Connectors, desktop only: dashes flow from inputs into the engine and out to the findings */}
            <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" preserveAspectRatio="none" viewBox="0 0 300 100">
              {[22, 50, 78].map((y) => (
                <path key={`l${y}`} d={`M 62 ${y} C 100 ${y}, 110 50, 140 50`} className="connector" />
              ))}
              {[22, 50, 78].map((y) => (
                <path key={`r${y}`} d={`M 160 50 C 190 50, 200 ${y}, 236 ${y}`} className="connector" />
              ))}
            </svg>

            <ul className="relative flex flex-col gap-4 lg:items-start">
              {c.sources.map((s, i) => (
                <motion.li
                  key={s}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: EASE }}
                  className="flex items-center gap-2.5 rounded-ui border border-line bg-surface px-4 py-3 text-[14px] font-medium text-ink shadow-lg"
                >
                  <File className="size-4 text-navy" />
                  {s}
                </motion.li>
              ))}
            </ul>

            <div className="relative flex justify-center">
              <div className="relative grid size-52 place-items-center rounded-full border border-line bg-surface shadow-xl sm:size-60">
                <span aria-hidden className="absolute inset-3 rounded-full border border-dashed border-navy/20 motion-safe:animate-[spin_24s_linear_infinite]" />
                <span aria-hidden className="absolute inset-8 rounded-full bg-wash" />
                <span className="relative grid size-20 place-items-center rounded-full bg-navy text-red shadow-lg">
                  <Bolt className="h-10 w-auto" />
                </span>
                <p className="absolute -bottom-4 flex items-center gap-1.5 rounded-ui border border-line bg-surface px-3 py-1.5 font-mono text-[12px] whitespace-nowrap text-muted shadow-lg">
                  <span className="size-1.5 rounded-full bg-accept" />
                  <span className="tabular font-medium text-navy">{count.toLocaleString(lang === "pt" ? "pt-BR" : "en-US")}</span> {c.counter}
                </p>
              </div>
            </div>

            <ul className="relative flex flex-col gap-3">
              {c.findings.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={i < shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`rounded-ui border bg-surface p-4 shadow-lg ${i === 0 && i < shown ? "border-red/40" : "border-line"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      <Alert className={`size-4 ${f.tag === c.findings[2].tag ? "text-muted" : "text-red"}`} />
                      {f.title}
                    </p>
                    <span
                      className={`rounded-ui px-2 py-0.5 font-mono text-[11px] uppercase ${
                        f.tag === c.findings[2].tag ? "bg-wash text-muted" : "bg-red-soft text-red"
                      }`}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <p className="mt-1 pl-6 text-[13px] text-muted">{f.detail}</p>
                </motion.li>
              ))}
              <li className="flex items-center gap-3 rounded-ui border border-line bg-surface p-4">
                <span className="size-8 shrink-0 rounded-full bg-wash motion-safe:animate-pulse" />
                <span className="flex-1 space-y-2">
                  <span className="block h-2 w-2/3 rounded-ui bg-wash motion-safe:animate-pulse" />
                  <span className="block h-2 w-1/3 rounded-ui bg-wash motion-safe:animate-pulse" />
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted uppercase">
                  <span className="size-1.5 rounded-full bg-accept" />
                  {c.analyzing}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
