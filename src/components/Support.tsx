import { useUpload } from "../lib/upload";
import { CtaButton } from "./CtaButton";
import { Lock, Plus, Shield, Trash, Upload } from "./Icons";
import { Photo } from "./Photo";
import { Reveal, RevealItem } from "./Reveal";

const SAFEGUARDS = [
  { icon: Lock, title: "Encrypted end to end", body: "In transit and at rest." },
  { icon: Trash, title: "Deleted after review", body: "Your contract is not kept or reused." },
  { icon: Shield, title: "Never shared", body: "Your employer never knows you asked." },
];

export function TrustStrip() {
  return (
    <section className="border-t border-line py-16 lg:py-20" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-10">
        <Reveal className="lg:col-span-5">
          <RevealItem as="h2">
            <span id="trust-title" className="block font-serif text-[28px] leading-[1.15] font-medium tracking-[-0.015em] sm:text-[34px]">
              Built with input from physicians and healthcare attorneys.
            </span>
          </RevealItem>
          <RevealItem className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["advisor-1", "advisor-2", "advisor-3"].map((a) => (
                <Photo
                  key={a}
                  src={`/images/${a}.webp`}
                  alt=""
                  slot={a}
                  compact
                  className="size-12 overflow-hidden rounded-full border-2 border-paper"
                />
              ))}
            </div>
            <p className="text-[14px] text-muted">Advisory board (placeholder until names are confirmed)</p>
          </RevealItem>
        </Reveal>
        <Reveal as="ul" className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:col-span-7">
          {SAFEGUARDS.map(({ icon: Icon, title, body }) => (
            <RevealItem as="li" key={title} className="bg-surface p-5 lg:p-6">
              <Icon className="size-5 text-accept" />
              <p className="mt-4 text-[15px] font-semibold text-ink">{title}</p>
              <p className="mt-1 text-[14px] text-muted">{body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const QUOTES = [
  {
    quote: "The tail clause was buried on page 14. I would have signed it. They covered it after one email.",
    name: "Emergency medicine, PGY-3",
    img: "testimonial-1",
  },
  {
    quote: "I didn’t know the non-compete radius was negotiable. The script told me exactly what to ask for.",
    name: "Family medicine, new attending",
    img: "testimonial-2",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-line bg-surface py-16 lg:py-24" aria-label="Testimonials">
      <Reveal className="mx-auto grid max-w-[1240px] gap-5 px-4 sm:px-6 md:grid-cols-2 lg:gap-8 lg:px-10">
        {QUOTES.map((q) => (
          <RevealItem key={q.name} className="flex flex-col rounded-xl border border-line bg-paper p-6 lg:p-8">
            <p className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">Illustrative testimonial</p>
            <blockquote className="mt-5 flex-1 font-serif text-[22px] leading-[1.35] text-ink lg:text-[26px]">“{q.quote}”</blockquote>
            <div className="mt-6 flex items-center gap-3">
              <Photo src={`/images/${q.img}.webp`} alt="" slot={q.img} compact className="size-11 overflow-hidden rounded-full" />
              <p className="text-[14px] text-muted">{q.name}</p>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

const FAQS = [
  {
    q: "Is this legal advice?",
    a: "No. Redline MD is an AI-powered review tool that explains your contract and suggests language to negotiate. It does not create an attorney-client relationship. If your situation needs a lawyer, we tell you, and we tell you which questions to bring.",
  },
  {
    q: "What contracts do you review?",
    a: "Physician employment agreements for residents, fellows and new attendings: hospital, private practice and academic offers, up to 30 pages. Partnership buy-ins are on the roadmap.",
  },
  {
    q: "How is my data handled?",
    a: "Files are encrypted in transit and at rest, used only to produce your review, and deleted afterward. We never contact or share anything with your employer.",
  },
  {
    q: "What if I need a lawyer after?",
    a: "Your review is the brief a lawyer would ask for. Bring it to a healthcare attorney and you’ll spend fewer billable hours, because the risks are already mapped.",
  },
];

export function Faq() {
  const { openUpload } = useUpload();
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line py-16 lg:py-24" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="font-serif text-[32px] leading-tight font-medium tracking-[-0.015em] sm:text-[40px]">
            Questions doctors ask
          </h2>
          <CtaButton onClick={openUpload} size="md" icon={<Upload className="size-4" />} className="mt-6 hidden lg:inline-flex">
            Upload your contract
          </CtaButton>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {FAQS.map((f) => (
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
  return (
    <footer id="footer" className="border-t border-line bg-ink py-12 text-paper/70">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 text-[14px] sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          <p className="font-serif text-[22px] text-paper">
            <span className="relative inline-block leading-none">
              Redline
              <span aria-hidden className="absolute -inset-x-0.5 top-[47%] h-[2px] bg-redline" />
            </span>{" "}
            <span className="font-sans text-[13px] font-semibold tracking-[0.08em]">MD</span>
          </p>
          <p className="mt-2 max-w-[28rem]">
            Redline MD is not a law firm and does not provide legal advice.
          </p>
        </div>
        <div className="space-y-1 md:text-right">
          <p>Privacy · Terms · contact@redlinemd.ai</p>
          <p className="text-paper/50">Design concept by Felipe Gaigher for the Foundey design challenge.</p>
        </div>
      </div>
    </footer>
  );
}
