import { useT } from "../lib/i18n";
import { useUpload } from "../lib/upload";
import { CtaButton } from "./CtaButton";
import { Logo } from "./Logo";
import { Plus, Upload } from "./Icons";
import { PixelGrid } from "./PixelGrid";


/* Dark proof section (pattern from digai.ai): security promises on the left, voices on the right. */
export function Voices() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white lg:py-24" aria-labelledby="voices-title">
      <PixelGrid tone="white" className="absolute -top-10 -left-20 h-[520px] w-[900px] max-w-none opacity-40" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <h2 id="voices-title" className="text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-balance sm:text-[40px]">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 max-w-[28rem] text-[16px] text-white/75">{t.trust.title}</p>
          <ul className="mt-8 border-t border-white/15">
            {t.trust.items.map(({ title, body }) => (
              <li key={title} className="border-b border-white/15 py-4">
                <p className="text-[15px] font-semibold">{title}</p>
                <p className="text-[14px] text-white/70">{body}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* Static on purpose: proof must never depend on a scroll trigger to appear. */}
        <div className="space-y-4 lg:col-span-6 lg:col-start-7">
          {t.testimonials.items.map((q) => (
            <figure key={q.name} className="rounded-ui bg-surface p-6 text-ink shadow-xl lg:p-8">
              <p className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">{t.testimonials.label}</p>
              <blockquote className="mt-4 text-[19px] leading-[1.45] font-medium tracking-[-0.01em] lg:text-[21px]">“{q.quote}”</blockquote>
              <figcaption className="mt-5 text-[14px] text-muted">{q.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { openUpload } = useUpload();
  const { t } = useT();
  return (
    <section id="faq" className="border-t border-line py-16 lg:py-24" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="text-[30px] leading-tight font-semibold tracking-[-0.025em] text-navy sm:text-[38px]">
            {t.faq.title}
          </h2>
          <CtaButton onClick={openUpload} size="md" icon={<Upload className="size-4" />} className="mt-6 hidden lg:inline-flex">
            {t.faq.cta}
          </CtaButton>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {t.faq.items.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="-mt-1 max-w-[42rem] pb-6 text-[16px] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useT();
  return (
    <footer id="footer" className="bg-navy py-12 text-white/75">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 text-[14px] sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          <Logo tone="white" />
          <p className="mt-3 text-[13px] font-medium tracking-wide text-white uppercase">{t.footer.tagline}</p>
          <p className="mt-3 max-w-[28rem]">{t.footer.disclaimer}</p>
        </div>
        <div className="space-y-1 md:text-right">
          <p>{t.footer.links}</p>
          <p className="text-white/50">{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
