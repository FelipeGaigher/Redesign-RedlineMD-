import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "../lib/i18n";
import { EASE } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { ContractPreview } from "./ContractPreview";
import { CtaButton } from "./CtaButton";
import { Upload } from "./Icons";
import { HowSticky } from "./HowSticky";
import { ScriptMock, UploadMock } from "./Mocks";
import { PixelGrid } from "./PixelGrid";

const STEP_MS = 6500;

/*
 * Mobile: accordion on top, live preview below, live preview on the right (pattern from digai.ai).
 * Steps advance on their own while the section is on screen; the active item's rule fills as a progress bar.
 * A click takes over and restarts the timer from that step.
 */
export function HowItWorks() {
  return (
    <section id="how" className="bg-wash" aria-labelledby="how-title">
      <div className="lg:hidden">
        <HowAccordion />
      </div>
      <div className="hidden lg:block">
        <HowSticky />
      </div>
    </section>
  );
}

function HowAccordion() {
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
    <div className="py-16">
      <div ref={ref} className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="lg:col-span-5">
          <p className="text-[13px] font-semibold text-red">{h.eyebrow}</p>
          <h2 className="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-navy sm:text-[40px]">
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
    </div>
  );
}
