import { useT } from "../lib/i18n";
import { Counter } from "./Counter";

/* Who it is for, as a slow marquee: the reference uses client logos; we have no permission for any, so specialties carry it. */
export function SpecialtyMarquee() {
  const { t } = useT();
  const items = t.marquee.items;
  return (
    <section aria-label={t.marquee.label} className="border-y border-line py-6">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-10">
        <p className="shrink-0 text-[13px] font-medium text-muted">{t.marquee.label}</p>
        <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="marquee-track flex w-max gap-10">
            {[...items, ...items].map((s, i) => (
              <li key={i} aria-hidden={i >= items.length} className="text-[17px] font-semibold whitespace-nowrap text-ink/45">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: 199, prefix: "$", suffix: "" },
  { value: 24, prefix: "", suffix: "h" },
  { value: 30, prefix: "", suffix: "" },
  { value: 10000, prefix: "$", suffix: "+" },
];

/* The numbers as a quiet detail under the hero, not a section of their own. */
export function StatsStrip() {
  const { t, lang } = useT();
  return (
    <section aria-label="Redline MD" className="py-12 lg:py-16">
      <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-y-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-10">
        {STATS.map((s, i) => (
          <li key={i} className="text-center">
            <p className={`text-[40px] leading-none font-semibold tracking-[-0.04em] lg:text-[52px] ${i === 3 ? "text-red" : "text-navy"}`}>
              <Counter value={s.value} prefix={lang === "pt" && s.prefix ? "US$ " : s.prefix} suffix={s.suffix} locale={lang === "pt" ? "pt-BR" : "en-US"} />
            </p>
            <p className="mx-auto mt-2 max-w-[13rem] text-[14px] text-muted">{t.stats[i]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
