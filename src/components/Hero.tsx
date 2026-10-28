import { motion, useReducedMotion } from "framer-motion";
import { scrollToId } from "../lib/lenis";
import { EASE, revealChild, revealParent } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { ContractPreview } from "./ContractPreview";
import { CtaButton } from "./CtaButton";
import { Clock, Lock, Refund, Upload } from "./Icons";
import { Photo } from "./Photo";

const ASSURANCES = [
  { icon: Clock, text: "Instant risk preview, full review in 24h" },
  { icon: Lock, text: "Encrypted, deleted after review" },
  { icon: Refund, text: "Money-back guarantee" },
];

export function Hero() {
  const { openUpload } = useUpload();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 lg:pt-36 lg:pb-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <motion.div
          className="lg:col-span-6 lg:pt-6"
          variants={revealParent}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p variants={revealChild} className="mb-5 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-muted uppercase sm:text-[13px] sm:tracking-[0.12em]">
            <span aria-hidden className="hidden h-px w-6 bg-redline sm:block" />
            AI contract review for new physicians
          </motion.p>

          <motion.h1
            variants={revealChild}
            className="font-serif text-[40px] leading-[1.04] font-medium tracking-[-0.025em] text-balance text-ink sm:text-[52px] lg:text-[72px]"
          >
            Don’t sign your first contract <em className="text-redline">blind.</em>
          </motion.h1>

          <motion.p variants={revealChild} className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted lg:text-[19px]">
            Redline MD flags the clauses that cost new doctors <strong className="font-semibold text-ink">$10,000+</strong> in
            tail insurance and unfair terms, for a flat <strong className="font-semibold text-ink">$199</strong>.
          </motion.p>

          <motion.div variants={revealChild} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <CtaButton id="hero-cta" onClick={openUpload} icon={<Upload className="size-[18px]" />} className="w-full sm:w-auto">
              Upload your contract
            </CtaButton>
            <a
              href="#how"
              onClick={(e) => { e.preventDefault(); scrollToId("how"); }}
              className="inline-flex h-11 items-center justify-center text-[16px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
            >
              See a sample review
            </a>
          </motion.div>

          <motion.ul variants={revealChild} className="mt-7 flex flex-col gap-2.5 text-[14px] text-muted sm:flex-row sm:flex-wrap sm:gap-x-5">
            {ASSURANCES.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-2">
                <Icon className="size-4 text-accept" />
                {text}
              </li>
            ))}
          </motion.ul>
          {/* Placeholder: guarantee and turnaround must be confirmed by the client before launch. */}
        </motion.div>

        <motion.div
          className="relative lg:col-span-6"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        >
          {/* Desktop: the person behind the contract, with the product working over it */}
          <div className="relative hidden lg:block">
            <Photo
              src="/images/hero-physician.webp"
              alt="A young physician in scrubs reading her employment contract at home"
              slot="hero-physician.webp"
              priority
              className="ml-auto aspect-[4/5] w-[78%] rounded-2xl"
            />
            <div className="absolute -bottom-[4%] left-0 w-[86%]">
              <ContractPreview />
            </div>
            <PriceCard className="absolute top-8 -right-2" onStart={openUpload} />
          </div>

          <div className="lg:hidden">
            <ContractPreview />
            <PriceCard className="mt-4" onStart={openUpload} inline />
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("pricing")}
        className="absolute bottom-8 left-10 hidden items-center gap-3 text-[13px] font-medium text-muted transition-colors hover:text-ink lg:inline-flex"
      >
        <span aria-hidden className="relative h-9 w-[22px] rounded-full border border-ink/25">
          <motion.span
            className="absolute left-1/2 top-2 h-2 w-[2px] -translate-x-1/2 rounded bg-ink/60"
            animate={reduce ? undefined : { y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll for the numbers
      </button>
    </section>
  );
}

function PriceCard({ className = "", onStart, inline = false }: { className?: string; onStart: () => void; inline?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-5 rounded-xl border border-line bg-surface/95 p-4 backdrop-blur ${
        inline ? "" : "shadow-[var(--shadow-float)]"
      } ${className}`}
    >
      <div>
        <p className="tabular font-serif text-[30px] leading-none font-medium text-ink">
          $199 <span className="font-sans text-[14px] font-medium text-muted">flat</span>
        </p>
        <p className="mt-1.5 text-[13px] text-muted">
          vs <span className="tabular line-through decoration-redline decoration-2">$500+</span> legal review
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="h-11 shrink-0 rounded-full bg-ink px-4 text-[14px] font-semibold text-paper transition-colors hover:bg-ink-soft"
      >
        Start now
      </button>
    </div>
  );
}
