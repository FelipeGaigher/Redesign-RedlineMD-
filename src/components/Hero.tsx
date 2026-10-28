import { motion, useReducedMotion } from "framer-motion";
import { useT } from "../lib/i18n";
import { scrollToId } from "../lib/lenis";
import { EASE, revealChild, revealParent } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { ContractPreview } from "./ContractPreview";
import { CtaButton } from "./CtaButton";
import { Upload } from "./Icons";
import { LoopVideo } from "./LoopVideo";
import { PixelGrid } from "./PixelGrid";

export function Hero() {
  const { openUpload } = useUpload();
  const reduce = useReducedMotion();
  const { t } = useT();
  const h = t.hero;

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-14 lg:pt-36 lg:pb-20">
      <PixelGrid className="absolute top-10 -left-24 h-[520px] w-[900px] max-w-none opacity-35 lg:top-16 lg:left-0 lg:opacity-80" />

      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <motion.div className="lg:col-span-6 lg:pt-4" variants={revealParent} initial={reduce ? false : "hidden"} animate="show">
          <motion.p variants={revealChild} className="mb-5 text-[15px] font-medium text-muted">
            {h.eyebrow}
          </motion.p>

          {/* Two-tone headline: the line in charcoal, the stakes in brand navy. Each line rises out of its own mask. */}
          <h1 className="text-[40px] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[56px] lg:text-[68px]">
            {h.title.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "text-navy" : ""}`}
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            aria-hidden
            className="mt-7 h-px w-24 origin-left bg-red"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          />

          <motion.p variants={revealChild} className="mt-6 max-w-[33rem] text-[17px] leading-relaxed text-muted lg:text-[19px]">
            {h.sub[0]}
            <strong className="font-semibold text-ink">{h.sub[1]}</strong>
            {h.sub[2]}
            <strong className="font-semibold text-ink">{h.sub[3]}</strong>
            {h.sub[4]}
          </motion.p>

          <motion.div variants={revealChild} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <CtaButton id="hero-cta" onClick={openUpload} icon={<Upload className="size-[18px]" />} className="w-full sm:w-auto">
              {h.cta}
            </CtaButton>
            <a
              href="#how"
              onClick={(e) => { e.preventDefault(); scrollToId("how"); }}
              className="inline-flex h-11 items-center justify-center text-[16px] font-semibold text-navy underline decoration-navy/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-navy"
            >
              {h.secondary}
            </a>
          </motion.div>

          <motion.ul variants={revealChild} className="mt-8 flex flex-col gap-1.5 text-[14px] text-muted sm:flex-row sm:flex-wrap sm:gap-x-5">
            {/* Placeholder: turnaround and guarantee must be confirmed by the client before launch. */}
            {h.assurances.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Tick />
                {text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative lg:col-span-6"
          initial={reduce ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          {/* Desktop: the person behind the contract, with the product working over it */}
          <div className="relative hidden lg:block">
            <LoopVideo name="hero-clipboard" label={h.photoAlt} className="ml-auto block aspect-[4/5] w-[78%] rounded-ui bg-wash" />
            <div className="absolute -bottom-[4%] left-0 w-[88%]">
              <ContractPreview />
            </div>
            <PriceCard className="absolute top-8 -right-2 shadow-lg" onStart={openUpload} t={t.price} />
          </div>

          <div className="lg:hidden">
            <ContractPreview />
            <PriceCard className="mt-4" onStart={openUpload} t={t.price} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-accept" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PriceCard({ className = "", onStart, t }: { className?: string; onStart: () => void; t: { flat: string; vs: string; legal: string; start: string } }) {
  return (
    <div className={`flex items-center justify-between gap-5 rounded-ui border border-line bg-surface p-4 ${className}`}>
      <div>
        <p className="tabular text-[28px] leading-none font-semibold tracking-[-0.02em] text-navy">
          $199 <span className="text-[14px] font-medium tracking-normal text-muted">{t.flat}</span>
        </p>
        <p className="mt-1.5 text-[13px] text-muted">
          {t.vs} <span className="tabular line-through decoration-red decoration-2">$500+</span> {t.legal}
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="h-11 shrink-0 cursor-pointer rounded-ui border border-navy px-4 text-[14px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
      >
        {t.start}
      </button>
    </div>
  );
}
