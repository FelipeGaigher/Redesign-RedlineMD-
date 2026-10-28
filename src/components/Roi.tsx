import { motion, useReducedMotion } from "framer-motion";
import { useT } from "../lib/i18n";
import { EASE } from "../lib/motion";
import { useUpload } from "../lib/upload";
import { Counter } from "./Counter";
import { CtaButton } from "./CtaButton";
import { Upload } from "./Icons";
import { Photo } from "./Photo";
import { Reveal, RevealItem } from "./Reveal";

/* Read left to right: what you pay, what you'd pay, what you'd lose. */
const STATS = [
  { value: 199, prefix: "$", suffix: "", tone: "text-navy" },
  { value: 500, prefix: "$", suffix: "+", tone: "text-muted" },
  { value: 10000, prefix: "$", suffix: "+", tone: "text-red", note: true },
];

export function Roi() {
  const { openUpload } = useUpload();
  const { t } = useT();
  const r = t.roi;
  return (
    <section id="pricing" className="border-t border-line bg-wash py-16 lg:py-24" aria-labelledby="roi-title">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-[44rem]">
          <RevealItem as="h2">
            <span id="roi-title" className="block text-[34px] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-navy sm:text-[44px] lg:text-[56px]">
              {r.title}
            </span>
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="mt-10 grid border-t border-navy/20 sm:grid-cols-3 lg:mt-14">
          {STATS.map((s, i) => (
            <RevealItem as="li" key={s.value} className="border-b border-line py-7 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 lg:px-10 lg:py-10">
              <p className={`text-[52px] leading-none font-semibold tracking-[-0.04em] lg:text-[76px] ${s.tone}`}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[16rem] text-[15px] text-muted lg:text-[16px]">
                {r.stats[i]}
                {s.note && <span className="ml-1 text-[12px]">{r.placeholder}</span>}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <CostBars />

        <div id="how" className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Photo
              src="/images/how-resident-phone.webp"
              alt={r.photoAlt}
              slot="how-resident-phone.webp"
              className="aspect-[4/3] w-full rounded-ui lg:aspect-[4/5]"
            />
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] text-balance text-navy sm:text-[38px]">
              {r.howTitle}
            </h2>
            <Reveal as="ol" className="mt-8">
              {r.steps.map((s, i) => (
                <RevealItem as="li" key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6 last:border-b">
                  <span className="tabular text-[20px] font-semibold text-red">{i + 1}</span>
                  <div>
                    <h3 className="text-[18px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] text-muted lg:text-[16px]">{s.body}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
            <div className="mt-8">
              <CtaButton onClick={openUpload} icon={<Upload className="size-[18px]" />} className="w-full sm:w-auto">
                {r.cta}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const BARS = [
  { value: "$199", width: 0.4, tone: "bg-navy", text: "text-navy" },
  { value: "$500+", width: 1, tone: "bg-muted/40", text: "text-muted" },
];

function CostBars() {
  const reduce = useReducedMotion();
  const { t } = useT();
  const r = t.roi;
  return (
    <div className="mt-6 border-t border-line pt-8 lg:mt-4">
      <h3 className="text-[15px] font-semibold text-ink">{r.barsTitle}</h3>
      <dl className="mt-5 space-y-4">
        {BARS.map((b, i) => (
          <div key={b.value} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-6">
            <dt className="text-[14px] text-muted">{r.bars[i]}</dt>
            <dd className="flex items-center gap-3">
              <div className="h-2.5 flex-1 bg-line">
                <motion.div
                  className={`h-full origin-left ${b.tone}`}
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
      <p className="mt-6 max-w-[44rem] text-[15px] text-muted">
        {r.tail[0]}
        <strong className="font-semibold text-red">{r.tail[1]}</strong>
        {r.tail[2]}
      </p>
    </div>
  );
}
