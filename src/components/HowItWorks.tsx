import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "../lib/i18n";
import { EASE } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { ContractPreview } from "./ContractPreview";
import { CtaButton } from "./CtaButton";
import { Check, File, Lock, Mail, Upload } from "./Icons";
import { PixelGrid } from "./PixelGrid";

const STEP_MS = 6500;

/*
 * Accordion on the left, live preview on the right (pattern from digai.ai).
 * Steps advance on their own while the section is on screen; the active item's rule fills as a progress bar.
 * A click takes over and restarts the timer from that step.
 */
export function HowItWorks() {
  const { t } = useT();
  const { openUpload } = useUpload();
  const h = t.how;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % h.items.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, cycle, inView, reduce, h.items.length]);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <section id="how" className="bg-wash py-16 lg:py-24" aria-labelledby="how-title">
      <div ref={ref} className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="lg:col-span-5">
          <p className="text-[13px] font-semibold text-red">{h.eyebrow}</p>
          <h2 id="how-title" className="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-navy sm:text-[40px]">
            {h.title}
          </h2>
          <p className="mt-4 max-w-[30rem] text-[16px] text-muted lg:text-[17px]">{h.sub}</p>

          <ol className="mt-8 space-y-2">
            {h.items.map((item, i) => {
              const open = i === active;
              return (
                <li key={item.name} className={`rounded-ui border transition-colors ${open ? "border-line bg-surface shadow-lg" : "border-transparent"}`}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-expanded={open}
                    className={`flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left text-[16px] font-semibold transition-colors ${open ? "text-navy" : "text-muted hover:text-ink"}`}
                  >
                    <span className={`tabular text-[14px] ${open ? "text-red" : ""}`}>{i + 1}</span>
                    {item.name}
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="relative mx-5 mb-5 pl-4">
                          {/* Progress rule: fills while this step is on screen */}
                          <span aria-hidden className="absolute top-0 left-0 h-full w-[2px] bg-line" />
                          <motion.span
                            key={`${active}-${cycle}-${inView}`}
                            aria-hidden
                            className="absolute top-0 left-0 w-[2px] origin-top bg-navy"
                            style={{ height: "100%" }}
                            initial={{ scaleY: reduce || !inView ? 1 : 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: reduce || !inView ? 0 : STEP_MS / 1000, ease: "linear" }}
                          />
                          <p className="text-[16px] font-semibold text-ink">{item.heading}</p>
                          <p className="mt-1.5 text-[15px] text-muted">{item.body}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          <CtaButton onClick={openUpload} icon={<Upload className="size-[18px]" />} className="mt-8 w-full sm:w-auto">
            {h.cta}
          </CtaButton>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-ui border border-line bg-surface p-5 sm:p-10 lg:sticky lg:top-28 lg:min-h-[560px]">
            <PixelGrid className="absolute -top-10 -right-10 h-[320px] w-[520px] max-w-none opacity-60" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative w-full max-w-[520px]"
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {active === 0 && <UploadMock />}
                {active === 1 && <ContractPreview />}
                {active === 2 && <ScriptMock />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function UploadMock() {
  const { t } = useT();
  const m = t.how.mock;
  const reduce = useReducedMotion();
  return (
    <div className="rounded-ui border border-line bg-surface shadow-lg">
      <div className="flex flex-col items-center border-b border-dashed border-line px-6 py-8 text-center">
        <Upload className="size-7 text-navy" />
        <p className="mt-3 text-[15px] font-semibold text-ink">{t.upload.dropDesktop}</p>
        <p className="mt-1 text-[13px] text-muted">{t.upload.formats}</p>
      </div>
      <ul className="space-y-4 p-5">
        {m.files.map((f, i) => (
          <li key={f}>
            <div className="flex items-center gap-3">
              <File className="size-4 shrink-0 text-muted" />
              <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink">{f}</span>
              <motion.span
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.6 }}
              >
                <Check className="size-4 text-accept" />
              </motion.span>
            </div>
            <div className="mt-2 h-1 bg-line">
              <motion.div
                className="h-full origin-left bg-navy"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: i * 0.6, ease: "easeInOut" }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-2 border-t border-line px-5 py-3 text-[13px] text-accept">
        <Lock className="size-3.5" /> {m.ready}
      </p>
    </div>
  );
}

function ScriptMock() {
  const { t } = useT();
  const m = t.how.mock;
  const reduce = useReducedMotion();
  return (
    <div className="rounded-ui border border-line bg-surface shadow-lg">
      <div className="space-y-1 border-b border-line px-5 py-3 text-[13px] text-muted">
        <p className="flex items-center gap-2">
          <Mail className="size-3.5" /> {m.scriptTo}
        </p>
        <p className="font-semibold text-ink">{m.scriptSubject}</p>
      </div>
      <div className="space-y-3 px-5 py-5 text-[15px] leading-relaxed text-ink">
        {m.scriptBody.map((line, i) => (
          <motion.p
            key={line}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.7, duration: 0.4 }}
            className={i > 0 ? "border-l-2 border-accept bg-accept-soft/60 py-1.5 pl-3" : ""}
          >
            {line}
          </motion.p>
        ))}
      </div>
      <div className="flex justify-end border-t border-line px-5 py-3">
        <span className="rounded-ui bg-navy px-3 py-1.5 text-[13px] font-semibold text-white">{m.scriptCopy}</span>
      </div>
    </div>
  );
}
