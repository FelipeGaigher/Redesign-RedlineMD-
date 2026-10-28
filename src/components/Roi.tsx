import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { Counter } from "./Counter";
import { CtaButton } from "./CtaButton";
import { Upload } from "./Icons";
import { Photo } from "./Photo";
import { Reveal, RevealItem } from "./Reveal";

const STATS = [
  { value: 199, prefix: "$", suffix: "", label: "Flat price, no hourly billing", tone: "text-ink" },
  { value: 500, prefix: "$", suffix: "+", label: "Typical attorney contract review", tone: "text-muted" },
  { value: 10000, prefix: "$", suffix: "+", label: "Average tail insurance trap we help you avoid", tone: "text-redline", note: true },
];

const STEPS = [
  { n: "01", title: "Upload your contract", body: "PDF, Word or a photo of each page. From your laptop or your phone between shifts." },
  { n: "02", title: "AI flags the risky clauses", body: "Tail coverage, non-compete radius, termination terms, call schedule, and the protections that are missing." },
  { n: "03", title: "Get your redline and a script", body: "A marked-up copy with suggested language, plus a negotiation script you can send to your recruiter." },
];

export function Roi() {
  const { openUpload } = useUpload();
  return (
    <section id="pricing" className="border-t border-line bg-surface py-16 lg:py-24" aria-labelledby="roi-title">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-[44rem]">
          <RevealItem as="p" className="mb-4 text-[13px] font-semibold tracking-[0.12em] text-muted uppercase">
            The math
          </RevealItem>
          <RevealItem as="h2">
            <span id="roi-title" className="block font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[56px]">
              One review. Thousands protected.
            </span>
          </RevealItem>
        </Reveal>

        {/* Three numbers, read left to right: what you pay, what you'd pay, what you'd lose */}
        <Reveal as="ul" className="mt-12 grid border-t border-line sm:grid-cols-3 lg:mt-16">
          {STATS.map((s) => (
            <RevealItem as="li" key={s.label} className="border-b border-line py-7 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 lg:py-10 lg:px-10">
              <p className={`font-serif text-[52px] leading-none font-medium tracking-[-0.02em] lg:text-[72px] ${s.tone}`}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[16rem] text-[15px] text-muted lg:text-[16px]">
                {s.label}
                {s.note && <span className="ml-1 text-[12px] text-muted/80">(placeholder)</span>}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <CostBars />

        {/* How it works */}
        <div id="how" className="mt-20 grid scroll-mt-24 gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Photo
              src="/images/how-resident-phone.webp"
              alt="A resident in a hospital corridor photographing his contract pages with his phone"
              slot="how-resident-phone.webp"
              className="aspect-[4/3] w-full rounded-2xl lg:aspect-[4/5]"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <RevealItem as="p" className="mb-4 text-[13px] font-semibold tracking-[0.12em] text-muted uppercase">
                How it works
              </RevealItem>
              <RevealItem as="h2">
                <span className="block font-serif text-[30px] leading-[1.1] font-medium tracking-[-0.02em] sm:text-[38px]">
                  Ten minutes of your time. Not ten days of back-and-forth.
                </span>
              </RevealItem>
            </Reveal>
            <Reveal as="ol" className="mt-8">
              {STEPS.map((s) => (
                <RevealItem as="li" key={s.n} className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-line py-6 last:border-b">
                  <span className="tabular font-serif text-[22px] text-redline">{s.n}</span>
                  <div>
                    <h3 className="text-[18px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] text-muted lg:text-[16px]">{s.body}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
            <div className="mt-8">
              <CtaButton onClick={openUpload} icon={<Upload className="size-[18px]" />} className="w-full sm:w-auto">
                Upload your contract, $199
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const BARS = [
  { label: "Redline MD", value: "$199", width: 0.4, tone: "bg-ink", text: "text-ink" },
  { label: "Attorney review", value: "$500+", width: 1, tone: "bg-muted/35", text: "text-muted" },
];

function CostBars() {
  const reduce = useReducedMotion();
  return (
    <div className="mt-12 rounded-xl border border-line bg-paper p-5 sm:p-8 lg:mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[16px] font-semibold text-ink">What a contract review costs</h3>
        <p className="text-[13px] text-muted">Same contract, same week</p>
      </div>
      <dl className="mt-6 space-y-5">
        {BARS.map((b, i) => (
          <div key={b.label} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-6">
            <dt className="text-[14px] font-medium text-muted">{b.label}</dt>
            <dd className="flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-line/60">
                <motion.div
                  className={`h-full origin-left rounded-full ${b.tone}`}
                  style={{ width: `${b.width * 100}%` }}
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.9, delay: 0.15 * i, ease: EASE }}
                />
              </div>
              <span className={`tabular w-14 text-right text-[16px] font-semibold ${b.text}`}>{b.value}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 border-t border-line pt-5 text-[14px] text-muted">
        And the clause you didn’t catch: physician-paid tail coverage typically runs{" "}
        <strong className="font-semibold text-redline">$10,000 or more</strong> when you leave your first job.
      </p>
    </div>
  );
}
