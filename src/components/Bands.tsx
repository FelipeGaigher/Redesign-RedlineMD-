import { useT } from "../lib/i18n";
import { useUpload } from "../lib/upload";
import { CtaButton } from "./CtaButton";
import { Upload } from "./Icons";
import { LoopVideo } from "./LoopVideo";
import { Reveal, RevealItem } from "./Reveal";

/* Full-bleed video with the statement over it. The scrim exists for text contrast, not decoration. */
function Band({ video, children, align = "end" }: { video: string; children: React.ReactNode; align?: "end" | "center" }) {
  return (
    <section className="relative isolate flex min-h-[560px] overflow-hidden bg-navy lg:min-h-[640px]">
      <LoopVideo name={video} className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(14_46_84/0.92),rgb(14_46_84/0.55)_55%,rgb(14_46_84/0.25))]" />
      <div className={`mx-auto flex w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24 ${align === "end" ? "items-end" : "items-center"}`}>
        {children}
      </div>
    </section>
  );
}

export function ResidentsBand() {
  const { t } = useT();
  const b = t.bands.residents;
  return (
    <Band video="band-residents">
      <Reveal className="max-w-[40rem] text-white">
        <RevealItem as="h2">
          <span className="block text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[44px] lg:text-[52px]">{b.title}</span>
        </RevealItem>
        <RevealItem as="p" className="mt-5 max-w-[34rem] text-[17px] text-white/85 lg:text-[19px]">
          {b.body}
        </RevealItem>
      </Reveal>
    </Band>
  );
}

export function SignBand() {
  const { t } = useT();
  const { openUpload } = useUpload();
  const b = t.bands.sign;
  return (
    <Band video="cta-signing" align="center">
      <Reveal className="max-w-[36rem] text-white">
        <RevealItem as="h2">
          <span className="block text-[36px] leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-[52px] lg:text-[64px]">{b.title}</span>
        </RevealItem>
        <RevealItem as="p" className="mt-5 text-[17px] text-white/85 lg:text-[19px]">
          {b.body}
        </RevealItem>
        <RevealItem className="mt-8">
          <CtaButton onClick={openUpload} icon={<Upload className="size-[18px]" />} className="w-full sm:w-auto">
            {b.cta}
          </CtaButton>
        </RevealItem>
      </Reveal>
    </Band>
  );
}
