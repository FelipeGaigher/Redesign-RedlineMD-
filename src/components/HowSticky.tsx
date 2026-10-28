import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useT } from "../lib/i18n";
import { scrollToId } from "../lib/lenis";
import { EASE } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { ContractPreview } from "./ContractPreview";
import { CtaButton } from "./CtaButton";
import { Alert, Upload } from "./Icons";
import { ScriptMock, UploadMock } from "./Mocks";
import { PixelGrid } from "./PixelGrid";

/*
 * Desktop "How it works", same mechanics as the reference (digai.ai):
 * the left column stays pinned for the whole section and swaps to the step whose panel crosses the middle of the screen;
 * the right column scrolls one tall panel per step, and each panel assembles its mockup when it arrives.
 */
export function HowSticky() {
  const { t } = useT();
  const { openUpload } = useUpload();
  const h = t.how;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-[1240px] px-10 pt-24">
      <div className="max-w-[44rem]">
        <p className="text-[13px] font-semibold text-red">{h.eyebrow}</p>
        <h2 id="how-title" className="mt-3 text-[40px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-navy">
          {h.title}
        </h2>
        <p className="mt-4 max-w-[34rem] text-[17px] text-muted">{h.sub}</p>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-14">
        <div className="relative">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="text-[13px] font-semibold tracking-[0.06em] text-navy uppercase">
                    <span className="tabular">[ 0{active + 1} ]</span> {h.items[active].name}
                  </p>
                  <h3 className="mt-4 text-[26px] leading-[1.2] font-semibold tracking-[-0.02em] text-ink">{h.items[active].heading}</h3>
                  <p className="mt-4 text-[18px] leading-relaxed text-muted">{h.items[active].body}</p>
                </motion.div>
              </AnimatePresence>

              <CtaButton onClick={openUpload} size="md" icon={<Upload className="size-4" />} className="mt-8">
                {h.cta}
              </CtaButton>

              <div className="mt-10 flex items-center gap-2" role="tablist" aria-label={h.eyebrow}>
                {h.items.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={item.name}
                    onClick={() => scrollToId(`how-step-${i}`)}
                    className="flex h-6 cursor-pointer items-center"
                  >
                    <span className={`block h-[3px] rounded-full transition-all duration-500 ${i === active ? "w-10 bg-navy" : "w-3 bg-line hover:bg-muted/40"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Panel index={0} onActive={setActive}>
            {(on) => <UploadStage on={on} />}
          </Panel>
          <Panel index={1} onActive={setActive}>
            {(on) => <FlagStage on={on} />}
          </Panel>
          <Panel index={2} onActive={setActive}>
            {(on) => <ScriptStage on={on} />}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({ index, onActive, children }: { index: number; onActive: (i: number) => void; children: (on: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // A panel owns the left column while it crosses the middle band of the viewport.
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });
  // Its mockup assembles once most of it is visible, and re-plays on every return.
  const on = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, index, onActive]);

  return (
    <div id={`how-step-${index}`} className="flex min-h-[88vh] items-center py-8">
      <div ref={ref} className="relative h-[min(640px,78vh)] min-h-[560px] w-full overflow-hidden rounded-ui border border-line bg-surface">
        <PixelGrid className="absolute -top-6 -right-16 h-[340px] w-[620px] max-w-none opacity-50" />
        {children(on)}
      </div>
    </div>
  );
}

/* Back card enters first, front card lands over it, offset like a stack of paper. */
const back: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const front: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: 0.35, ease: EASE } },
};
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.35, delayChildren: 0.5 } } };
const row: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

function Stage({ on, children }: { on: boolean; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className="absolute inset-0" initial={reduce ? false : "hidden"} animate={on || reduce ? "show" : "hidden"}>
      {children}
    </motion.div>
  );
}

function UploadStage({ on }: { on: boolean }) {
  const { t } = useT();
  const m = t.how.mock;
  return (
    <Stage on={on}>
      {/* Phone: the mobile path the redesign is built around */}
      <motion.div variants={back} className="absolute top-10 left-10 w-[230px] rounded-[28px] border-[6px] border-navy bg-surface shadow-xl">
        <div className="px-4 pt-5 pb-6">
          <p className="text-[13px] font-semibold text-ink">{m.phoneTitle}</p>
          <p className="mt-1 text-[12px] text-muted">{m.phoneCamera}</p>
          <motion.ul variants={list} className="mt-4 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <motion.li key={i} variants={row} className="aspect-[3/4] rounded-[4px] border border-line bg-wash p-1.5">
                <span className="block h-1 w-3/4 bg-line" />
                <span className="mt-1 block h-1 w-1/2 bg-line" />
                <span className="mt-1 block h-1 w-2/3 bg-line" />
              </motion.li>
            ))}
          </motion.ul>
          <span className="mt-5 flex h-10 items-center justify-center rounded-ui bg-yellow text-[13px] font-semibold text-ink">{t.mobileBar.cta}</span>
        </div>
      </motion.div>
      <motion.div variants={front} className="absolute right-10 bottom-10 w-[400px]">
        {on && <UploadMock />}
      </motion.div>
    </Stage>
  );
}

function FlagStage({ on }: { on: boolean }) {
  const { t } = useT();
  const m = t.how.mock;
  return (
    <Stage on={on}>
      <motion.div variants={back} className="absolute top-10 right-10 w-[340px] rounded-ui border border-line bg-surface p-5 shadow-lg">
        <p className="flex items-center gap-2 text-[14px] font-semibold text-red">
          <Alert className="size-4" /> {m.riskTitle}
        </p>
        <motion.ul variants={list} className="mt-3 space-y-2">
          {m.riskRows.map((r) => (
            <motion.li key={r} variants={row} className="border-l-2 border-red bg-red-soft px-3 py-2 text-[13px] text-ink">
              {r}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
      <motion.div variants={front} className="absolute bottom-8 left-10 w-[460px]">
        {on && <ContractPreview />}
      </motion.div>
    </Stage>
  );
}

function ScriptStage({ on }: { on: boolean }) {
  const { t } = useT();
  const m = t.how.mock;
  return (
    <Stage on={on}>
      <motion.div variants={back} className="absolute top-10 right-10 w-[340px] rounded-ui border border-line bg-surface p-5 shadow-lg">
        <p className="text-[14px] font-semibold text-navy">{m.finTitle}</p>
        <motion.dl variants={list} className="mt-3 divide-y divide-line text-[13px]">
          {m.finRows.map(([k, v]) => (
            <motion.div key={k} variants={row} className="flex justify-between gap-4 py-2">
              <dt className="text-muted">{k}</dt>
              <dd className="tabular font-semibold text-ink">{v}</dd>
            </motion.div>
          ))}
          <motion.div variants={row} className="flex justify-between gap-4 pt-3">
            <dt className="font-semibold text-ink">{m.finTotal[0]}</dt>
            <dd className="tabular font-semibold text-red">{m.finTotal[1]}</dd>
          </motion.div>
        </motion.dl>
      </motion.div>
      <motion.div variants={front} className="absolute bottom-8 left-10 w-[460px]">
        {on && <ScriptMock />}
      </motion.div>
    </Stage>
  );
}
