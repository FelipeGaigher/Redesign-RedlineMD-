import { useT } from "../lib/i18n";
import { useUpload } from "../lib/upload";
import { CtaButton } from "./CtaButton";
import { Logo } from "./Logo";
import { Plus, Upload } from "./Icons";
import { Photo } from "./Photo";
import { Reveal, RevealItem } from "./Reveal";


/* The three things a doctor actually worries about, stated plainly instead of a row of unlinked badges. */
export function TrustStrip() {
  const { t } = useT();
  return (
    <section className="border-t border-line py-16 lg:py-20" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <h2 id="trust-title" className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-navy sm:text-[32px]">
            {t.trust.title}
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["advisor-1", "advisor-2", "advisor-3"].map((a) => (
                <Photo key={a} src={`/images/${a}.webp`} alt="" slot={a} compact className="size-11 rounded-full border-2 border-white" />
              ))}
            </div>
            <p className="text-[14px] text-muted">{t.trust.board}</p>
          </div>
        </div>
        <Reveal as="ul" className="lg:col-span-6 lg:col-start-7">
          {t.trust.items.map(({ title, body }) => (
            <RevealItem as="li" key={title} className="grid gap-1 border-t border-line py-5 last:border-b sm:grid-cols-[14rem_1fr] sm:gap-6">
              <p className="text-[16px] font-semibold text-ink">{title}</p>
              <p className="text-[15px] text-muted">{body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}


const AVATARS = ["testimonial-1", "testimonial-2"];

export function Testimonials() {
  const { t } = useT();
  return (
    <section className="border-t border-line bg-wash py-16 lg:py-24" aria-label={t.testimonials.aria}>
      <Reveal className="mx-auto grid max-w-[1240px] px-4 sm:px-6 md:grid-cols-2 lg:px-10">
        {t.testimonials.items.map((q, i) => (
          <RevealItem
            key={q.name}
            className="flex flex-col border-line py-8 first:pt-0 last:border-t last:pb-0 md:py-0 md:first:pr-10 md:last:border-t-0 md:last:border-l md:last:pl-10 lg:first:pr-16 lg:last:pl-16"
          >
            <p className="text-[12px] font-medium text-muted">{t.testimonials.label}</p>
            <blockquote className="mt-4 flex-1 text-[22px] leading-[1.35] font-medium tracking-[-0.015em] text-ink lg:text-[26px]">
              “{q.quote}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <Photo src={`/images/${AVATARS[i]}.webp`} alt="" slot={AVATARS[i]} compact className="size-10 rounded-full" />
              <p className="text-[14px] text-muted">{q.name}</p>
            </div>
          </RevealItem>
        ))}
      </Reveal>
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
